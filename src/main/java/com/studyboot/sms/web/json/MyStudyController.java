package com.studyboot.sms.web.json;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.studyboot.sms.domain.AppliedStudy;
import com.studyboot.sms.domain.Member;
import com.studyboot.sms.domain.Study;
import com.studyboot.sms.domain.StudyBoard;
import com.studyboot.sms.domain.StudyMember;
import com.studyboot.sms.service.AmazonS3_Service;
import com.studyboot.sms.service.ApprovalService;
import com.studyboot.sms.service.MemberService;
import com.studyboot.sms.service.MyStudyService;
import com.studyboot.sms.service.StudyMemberService;
import com.studyboot.sms.service.StudyService;
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

    if (pageSize < 3 || pageSize > 8) 
      pageSize = 3;


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
        content.put("status", "등록이 완료 되었습니다.");
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
        content.put("status", "등록이 완료 되었습니다.");
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
      @RequestParam int studyNo) {

    HashMap<String,Object> content = new HashMap<>();
    List<S3Object> cont;

    cont = amazonS3_Service.list(studyNo);
    // 아마존 리스트를 실행하고 리턴값을 받아서 리턴된 맵 객체를 다시 리턴해준다.
    content.put("list", cont);

    return content;
  }

  @GetMapping("filDelete")
  public Object filDelete(
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
  
  @GetMapping("fileDownload")
  public Object fileDownload(
      @RequestParam String fileName,
      @RequestParam int studyNo,
      HttpSession session) {

    HashMap<String,Object> content = new HashMap<>();

    try {
      amazonS3_Service.fileDownload(studyNo, fileName);
      content.put("status", "다운로드가 완료 되었습니다.");
    } catch (Exception e) {
      content.put("status", e.getMessage());
      content.put("message", e.getMessage());
    }

    return content;
  }

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
    content.put("list", approval);
    return content;
  }
  
  // 가입거절
  @GetMapping("registerDelete")
  public Object registerDelete(@RequestParam int no, 
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
}










