package com.studyboot.sms.web.json;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.studyboot.sms.domain.Amazon;
import com.studyboot.sms.domain.AppliedStudy;
import com.studyboot.sms.domain.History;
import com.studyboot.sms.domain.Member;
import com.studyboot.sms.domain.RateLog;
import com.studyboot.sms.domain.Study;
import com.studyboot.sms.domain.StudyBoard;
import com.studyboot.sms.domain.StudyMember;
import com.studyboot.sms.service.AmazonS3_Service;
import com.studyboot.sms.service.ApprovalService;
import com.studyboot.sms.service.MemberService;
import com.studyboot.sms.service.MyStudyService;
import com.studyboot.sms.service.RateService;
import com.studyboot.sms.service.StudyMemberService;
import com.studyboot.sms.service.StudyService;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.name.Rename;
import software.amazon.awssdk.services.s3.model.S3Object;


// AJAX 기반 JSON 데이터를 다루는 컨트롤러
@RestController("json/MyStudyController")
@RequestMapping("/json/MyStudy")
public class MyStudyController {

  @Autowired MyStudyService myStudyService;
  @Autowired MemberService memberService;
  @Autowired StudyService studyService;
  @Autowired StudyMemberService studyMemberService;
  @Autowired ServletContext servletContext;
  @Autowired AmazonS3_Service amazonS3_Service;
  @Autowired ApprovalService approvalService;
  @Autowired RateService rateService;


  @GetMapping("list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="3") int pageSize,
      @RequestParam String pageCls,
      @RequestParam String keyword,
      @RequestParam int no) {

    HashMap<String,Object> content = new HashMap<>();

    int clsNo = 0;
    switch(pageCls){
      case "제목": clsNo = 1; break;
      case "닉네임": clsNo = 2; break;
      case "undefined": clsNo = 0;
    }

    List<StudyBoard> studyBoard;
    List<Integer> memberNos = null;

    if(!keyword.equals("undefined")) {
      memberNos = memberService.findMemberNoMsg(keyword);
    } 

    if(keyword.equals("undefined")) {
      keyword = null;
    } 

    if (pageSize < 3 || pageSize > 30) 
      pageSize = 20;


    int rowCount = myStudyService.size(clsNo, memberNos, keyword, no);

    if (rowCount == 0) {
      content.put("pageNo", 0);
      return content;
    }

    int totalPage = rowCount / pageSize;

    if (rowCount % pageSize > 0)
      totalPage++;

    if (pageNo < 1) 
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;


    studyBoard = myStudyService.list(pageNo, pageSize, clsNo, memberNos, keyword, no);

    content.put("list", studyBoard);
    content.put("pageNo", pageNo);
    content.put("pageSize", pageSize);
    content.put("totalPage", totalPage);

    return content;
  }


  @GetMapping("studyphoto")
  public Object getStudy(int no) {
    System.out.println(no);

    HashMap<String,Object> content = new HashMap<>();

    Study study = studyService.getStudyPhoto(no);
    List<StudyMember> list = studyMemberService.findStudyMember(no);

    content.put("list", list);
    content.put("study", study);

    return content;
  }

  @GetMapping("membersExceptLoginUser") // 로그인 한 유저를 제외한 스터디 멤버
  public Object membersExceptLoginUser(int no, HttpSession session) {

    Member loginUser = (Member) session.getAttribute("loginUser");

    HashMap<String,Object> content = new HashMap<>();

    List<StudyMember> studyMemberList = studyMemberService.findStudyMember(no);

    for (int i = 0; i < studyMemberList.size(); i++) {

      if (loginUser.getNo() == (int) studyMemberList.get(i).getMemberNo()) {
        studyMemberList.remove(i);
      }
    }

    content.put("list", studyMemberList);

    return content;
  }

  @GetMapping("studyNtc")
  public Object getNtc(int no) {

    HashMap<String,Object> content = new HashMap<>();
    List<StudyBoard> ntcList = myStudyService.ntcList(no);
    content.put("ntcList", ntcList);
    return content;
  }


  @PostMapping("add")
  public Object add(StudyBoard studyBoard, HttpSession session) {

    HashMap<String,Object> content = new HashMap<>();

    Member loginUser = (Member) session.getAttribute("loginUser"); // 로그인한 유저의 정보를 담는다.

    // loginUser.getNo() 로그인한 유저의 유저넘버를 schedule 객체에 담는다.
    studyBoard.setMemberNo(loginUser.getNo());

    // 리더 판단을 위한 코드 (34줄 ~ 48줄)
    HashMap<String,Object> studyAndUserNo = new HashMap<>();
    studyAndUserNo.put("loginUser", loginUser.getNo());
    studyAndUserNo.put("studyNo", studyBoard.getStudyNo());
    boolean leaderYesOrNo = studyMemberService.findStudyMemberLeader(studyAndUserNo);

    if (studyBoard.isNtc() == true && leaderYesOrNo == true) {

      try {
        myStudyService.add(studyBoard);
        content.put("status", "success");
      } catch (Exception e) {
        content.put("status", "fail");
        content.put("message", e.getMessage());
      }

    } else if (studyBoard.isNtc() == true && leaderYesOrNo == false) {
      content.put("status", "스터디장만 공지사항을 등록 할 수 있습니다.");
      return content;

    } else if (studyBoard.isNtc() == false) {

      try {
        myStudyService.add(studyBoard);
        content.put("status", "success");
      } catch (Exception e) {
        content.put("status", "fail");
        content.put("message", e.getMessage());
      }
    }
    return content;
  }

  @GetMapping("leader")
  public Object leader(HttpSession session, int no) {

    Member loginUser = (Member) session.getAttribute("loginUser"); // 로그인한 유저의 정보를 담는다.

    HashMap<String,Object> studyAndUserNo = new HashMap<>();
    studyAndUserNo.put("loginUser", loginUser.getNo());
    studyAndUserNo.put("studyNo", no);

    HashMap<String,Object> content = new HashMap<>();

    content.put("leader", studyMemberService.findStudyMemberLeader(studyAndUserNo));

    return content;
  }

  @GetMapping("detail")
  public Object detail(@RequestParam int no) {

    StudyBoard studyBoard = myStudyService.get(no);

    return studyBoard;
  }

  @GetMapping("delete")
  public Object delete(@RequestParam int no, 
      @RequestParam int memberNo,
      HttpSession session) {

    HashMap<String,Object> content = new HashMap<>();

    Member loginUser = (Member) session.getAttribute("loginUser"); // 로그인한 유저의 정보를 담는다.

    if (loginUser.getNo() == memberNo) {
      try {
        myStudyService.delete(no);
        content.put("status", "삭제가 완료 되었습니다.");
      } catch (Exception e) {
        content.put("status", "fail");
        content.put("message", e.getMessage());
      }

    } else {
      content.put("status", "작성자만 게시글을 삭제할 수 있습니다.");
      return content;
    }

    return content;
  }

  @GetMapping("user")
  public Object user(HttpSession session) {

    Member loginUser = (Member) session.getAttribute("loginUser"); // 로그인한 유저의 정보를 담는다.

    HashMap<String,Object> content = new HashMap<>();
    content.put("user", loginUser.getNo());

    return content;
  }

  @PostMapping("update")
  public Object update(StudyBoard studyBoard, HttpSession session) {

    System.out.println(studyBoard);

    HashMap<String,Object> content = new HashMap<>();

    Member loginUser = (Member) session.getAttribute("loginUser"); // 로그인한 유저의 정보를 담는다.

    // loginUser.getNo() 로그인한 유저의 유저넘버를 schedule 객체에 담는다.
    studyBoard.setMemberNo(loginUser.getNo());

    // 리더 판단을 위한 코드 (34줄 ~ 48줄)
    HashMap<String,Object> studyAndUserNo = new HashMap<>();
    studyAndUserNo.put("loginUser", loginUser.getNo());
    studyAndUserNo.put("studyNo", studyBoard.getStudyNo());
    boolean leaderYesOrNo = studyMemberService.findStudyMemberLeader(studyAndUserNo);

    if (studyBoard.isNtc() == true && leaderYesOrNo == true) {

      try {
        myStudyService.update(studyBoard);
        content.put("status", "등록이 완료 되었습니다.");
      } catch (Exception e) {
        content.put("status", "fail tt");
        content.put("message", e.getMessage());
      }

    } else if (studyBoard.isNtc() == true && leaderYesOrNo == false) {
      content.put("status", "스터디장만 공지사항을 등록 할 수 있습니다.");
      return content;

    } else if (studyBoard.isNtc() == false) {

      try {
        myStudyService.update(studyBoard);
        content.put("status", "등록이 완료 되었습니다.");
      } catch (Exception e) {
        content.put("status", "fail ff");
        content.put("message", e.getMessage());
      }
    }

    return content;
  }

  @PostMapping("fileAdd")
  public Object fileAdd(
      HttpSession session,
      Part files,
      @RequestParam int studyNo) throws Exception {

    System.out.println(studyNo);

    Map<String, Object> content = new HashMap<>();

    if (files.getSize() <= 0) {
      content.put("status", "fail");
      return content;
    }
    amazonS3_Service.fileAdd(files, studyNo);
    content.put("status", "success");

    return content;
  }

  @GetMapping("fileList")
  public Object fileList(
      @RequestParam int stdNo) {

    HashMap<String,Object> content = new HashMap<>();
    List<S3Object> cont;
    List<Amazon> amazon = new ArrayList<>();

    cont = amazonS3_Service.list(stdNo);
    
    if(cont == null) {
      System.out.println("버킷에 파일이 없습니다.");
    } else {
    for (int i = 0; i < cont.size(); i++) {
      Amazon mazon = new Amazon();
      mazon.setFileName(cont.get(i).key());
      mazon.setFileSize(cont.get(i).size());

      String extenstion = cont.get(i).key().substring(cont.get(i).key().lastIndexOf(".")+1);
      mazon.setExtenstion(extenstion);
      System.out.println(extenstion);
      amazon.add(mazon);
    }
    // 아마존 리스트를 실행하고 리턴값을 받아서 리턴된 맵 객체를 다시 리턴해준다.
    content.put("list", amazon);
    }
    return content;
  }

  @GetMapping("fileDelete")
  public Object fileDelete(
      @RequestParam String fileName,
      @RequestParam int studyNo,
      HttpSession session) {

    HashMap<String,Object> content = new HashMap<>();

    try {
      amazonS3_Service.fileDelete(studyNo, fileName);
      content.put("status", "삭제가 완료 되었습니다.");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }

    return content;
  }

//  @GetMapping("fileDownload")
//  public Object fileDownload(
//      @RequestParam String fileName,
//      @RequestParam int studyNo,
//      HttpSession session,
//      OutputStream out) {
//
//    HashMap<String,Object> content = new HashMap<>();
//
//    try {
//      amazonS3_Service.fileDownload(studyNo, fileName);
//      content.put("status", "다운로드가 완료 되었습니다.");
//    } catch (Exception e) {
//      content.put("status", e.getMessage());
//      content.put("message", e.getMessage());
//    }
//
//    return content;
//  }

  @GetMapping("mmntUpdate")
  public Object mmntUpdate(@RequestParam int no) {

    Study study = studyService.get(no);
    System.out.println(study);
    return study;
  }

  @GetMapping("mmntApl")
  public Object mmntApl(@RequestParam int no) {

    HashMap<String,Object> content = new HashMap<>();
    List<AppliedStudy> approval = approvalService.list(no);
    for (AppliedStudy a : approval) {
      System.out.println("가입신청 넣은 회원 번호 => " + a.getMemberNo());
    }
    content.put("list", approval);
    return content;
  }

  // 가입거절
  @GetMapping("registerDelete")
  public Object registerDelete(@RequestParam int stdNo,
      @RequestParam int memberNo,
      HttpSession session) {

    System.out.println("스터디 번호=" + stdNo + "맴버번호=" + memberNo);
    HashMap<String,Object> content = new HashMap<>();
    try {
      approvalService.delete(stdNo, memberNo);
      content.put("status", "삭제가 완료 되었습니다.");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }

    return content;
  }

  //가입승인
  @GetMapping("register")
  public Object register(@RequestParam int stdNo,
      @RequestParam int memberNo,
      HttpSession session) {
    System.out.println("register 접근" + "" +  stdNo + "" + memberNo);

    HashMap<String,Object> content = new HashMap<>();

    try {
      if (!studyService.checkFullCapacityByStudyNo(stdNo)) {

        // 현재 인원이 총원보다 작다면 스터디에 해댱 맴버를 추가시켜주고
        studyMemberService.addStudyMember(stdNo, memberNo, false);
        System.out.println(memberNo + "번 회원 가입승인 완료 add 시켜주기");
        // 현재인원을 하나 올려서 카운트 해준다.
        studyService.prsnCount(stdNo);
        //스터디 평점을 업데이트 해준다.
        studyService.updateRate(stdNo);
        // 가입 신청에 있는 회원 정보를 없애준다.
        approvalService.delete(stdNo, memberNo);

      } else {
        System.out.println("가입 실패");
        content.put("status", "인원이 꽉 찼습니다.");
      }

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }

    return content;
  }

  // 회원의 평가 정보
  @GetMapping("rateinfo")
  public Object rateinfo(int userNo, HttpSession session) {

    Member loginUser = (Member)session.getAttribute("loginUser");

    HashMap<String,Object> content = new HashMap<>();

    if (loginUser != null) {

      List<StudyMember> rateInfo = studyMemberService.rateInfo(userNo);
      List<RateLog> rateLog = rateService.list(userNo);

      if(rateInfo != null) {
        content.put("rateInfo", rateInfo);
      }

      if(rateLog != null) {
        content.put("rateLog", rateLog);
      }

      content.put("status", "success");

    } else {
      content.put("status", "fail");
    }
    return content;
  }

  @GetMapping("history")
  public Object history(
      HttpSession session,
      @RequestParam int userNo,
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="3") int pageSize) {

    Member loginUser = (Member)session.getAttribute("loginUser");

    HashMap<String,Object> content = new HashMap<>();

    if (loginUser != null) {

      if (pageSize < 3 || pageSize > 8) 
        pageSize = 3;

      int rowCount = studyMemberService.sizeEndStudy(userNo); 

      if (rowCount == 0) {
        content.put("pageNo", 0);
        content.put("status", "success");
        return content;
      }

      int totalPage = rowCount / pageSize;

      if (rowCount % pageSize > 0)
        totalPage++;

      if (pageNo < 1) 
        pageNo = 1;
      else if (pageNo > totalPage)
        pageNo = totalPage;

      List<History> history = studyMemberService.userHistory(userNo, pageNo, pageSize);

      content.put("history", history);
      content.put("pageNo", pageNo);
      content.put("pageSize", pageSize);
      content.put("totalPage", totalPage);
      content.put("status", "success");

    } else {
      content.put("status", "fail");
    }
    return content;
  }

  @PostMapping(value = "photo", consumes = "multipart/form-data")
  public Object photo(HttpSession session, MultipartFile avatar, int studyNo) throws Exception {
    //formData
    Map<String, Object> content = new HashMap<>();
    // 리더 판단을 위한 코드
    Map<String,Object> studyAndUserNo = new HashMap<>();

    Member loginUser = (Member) session.getAttribute("loginUser");
    studyAndUserNo.put("loginUser", loginUser.getNo());
    studyAndUserNo.put("studyNo", studyNo);
    if (studyMemberService.findStudyMemberLeader(studyAndUserNo) == false) {

      content.put("notStudyLeader", "fail");
      return content;
    }


    if (avatar.isEmpty()) {
      content.put("status", "fail");
      return content;
    }

    // 이미지 저장
    String fileName = UUID.randomUUID().toString();
    String path = servletContext.getRealPath("/upload/images/mystudy/" + fileName);
    avatar.transferTo(new File(path)); // 파일로 만들어서 path에 저장

    // 썸네일 이미지 저장
    Thumbnails.of(path)
    .size(1000, 1000)
    .outputFormat("jpg")
    .toFiles(Rename.PREFIX_DOT_THUMBNAIL); // thumbnail.을 붙여줌

    Map<String, Object> photoUpdateMap = new HashMap<>();
    photoUpdateMap.put("studyNo", studyNo);
    photoUpdateMap.put("fileName", fileName);

    System.out.println("controller: "+photoUpdateMap);

    if(myStudyService.photoUpdate(photoUpdateMap) != 0) {
      content.put("fileName", fileName);
      content.put("status", "success");

    } else {
      content.put("status", "fail");
    }
    return content;
  }

  @PostMapping("stdUpdate")
  public Object stdUpdate(Study study, HttpSession session) {

    System.out.println(study);

    HashMap<String,Object> content = new HashMap<>();
    Study studyOrgin = studyService.get(study.getNo());
    
    try {
      studyOrgin.setNo(study.getNo());
      studyOrgin.setPersonnel(study.getPersonnel());
      studyOrgin.setGoal(study.getGoal());
      studyOrgin.setDay(study.getDay());
      studyOrgin.setEndDate(study.getEndDate());
      studyOrgin.setContents(study.getContents());
      studyService.update(studyOrgin);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }

    return content;
  }

}










