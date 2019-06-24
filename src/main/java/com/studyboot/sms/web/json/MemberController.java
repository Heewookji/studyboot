package com.studyboot.sms.web.json;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.studyboot.sms.domain.Cls;
import com.studyboot.sms.domain.History;
import com.studyboot.sms.domain.Member;
import com.studyboot.sms.domain.RateLog;
import com.studyboot.sms.domain.Study;
import com.studyboot.sms.domain.StudyMember;
import com.studyboot.sms.service.AddressService;
import com.studyboot.sms.service.ClsService;
import com.studyboot.sms.service.MemberService;
import com.studyboot.sms.service.RateService;
import com.studyboot.sms.service.StudyMemberService;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.name.Rename;


@RestController("json/MemberController")
@RequestMapping("/json/member")
public class MemberController {

  final static Logger logger = LogManager.getLogger(AuthController.class);
  
  @Autowired MemberService memberService;
  @Autowired StudyMemberService studyMemberService;
  @Autowired RateService rateService;
  @Autowired ServletContext servletContext;
  @Autowired ClsService clsService;
  @Autowired AddressService addressService;
  
  
  @GetMapping("withdrawal")
  public Object delete(HttpSession session) {

    Member loginUser = (Member)session.getAttribute("loginUser");
    HashMap<String,Object> content = new HashMap<>();
    
    try {
      if (memberService.withdrawal(loginUser.getNo()) == 0)
        throw new RuntimeException("정상적으로 탈퇴되지 않았습니다.");
      
      logger.debug("세션 무효화시킴!");
      logger.debug("loginUser: " + loginUser);
      session.invalidate();

      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  // 회원의 스터디 목록
  @GetMapping("mystudy")
  public Object mystudy(HttpSession session) {
    
    Member loginUser = (Member)session.getAttribute("loginUser");

    HashMap<String,Object> content = new HashMap<>();

    if (loginUser != null) {

      List<Study> doingStudyList = studyMemberService.findMyStudyList(loginUser.getNo());
      List<Study> appliedStudyList = memberService.appliedStudyList(loginUser.getNo());
      List<Study> pickedStudyList = memberService.pickedStudyList(loginUser.getNo());
      
      if(doingStudyList != null) {
        
        for (Study study : doingStudyList) {
          String addressName = addressService.addressFullName(study.getAddress());
          study.setAddressName(addressName);
        }
        content.put("doingStudyList", doingStudyList);
      }
      if(appliedStudyList != null) {
        
        for (Study study : appliedStudyList) {
          String addressName = addressService.addressFullName(study.getAddress());
          study.setAddressName(addressName);
        }
        content.put("appliedStudyList", appliedStudyList);
      }
      if(pickedStudyList != null) {
        
        for (Study study : pickedStudyList) {
          String addressName = addressService.addressFullName(study.getAddress());
          study.setAddressName(addressName);
        }
        content.put("pickedStudyList", pickedStudyList);
      }
      
      content.put("status", "success");
      content.put("loginUser", loginUser);
    } else {
      content.put("status", "fail");
    }
    return content;
  }
  
  @GetMapping("detail")
  public Object detail(HttpSession session) {
    
    Member loginUser = (Member) session.getAttribute("loginUser");
    Map<String,Object> content = new HashMap<>();
    
    if (loginUser == null) {
      content.put("status", "fail");
      return content;
    }
    
    Member member = memberService.get(loginUser.getNo());
    member.setClsList(new ArrayList<>());
    
    for (String cls : member.getCls()) {
      try {
        List<Cls> clsList = clsService.getClsName(cls);
        
        for (Cls c : clsList) {
          if (c.getClsSmallNo() != null) {
            c.setClsNo(cls);
            member.getClsList().add(c);
          }
        }
        
      } catch (Exception e) {
        // 유효한 관심분야 번호가 아니면 걸러낸다.
      }
    }
    
    if (member.getAddress() != null) {
      member.setAddressName(addressService.addressFullName(member.getAddress()));
    }
    
    if (member.getPhoto() == null) {
      member.setPhoto("defaultphoto");
    }
    content.put("status", "success");
    content.put("member", member);
    
    return content;
  }
  

  @PostMapping("update")
  public Object update(HttpSession session, Member member) {
    
    Member loginUser = (Member) session.getAttribute("loginUser");
    member.setNo(loginUser.getNo());
    member.setPhoto(loginUser.getPhoto());
    
    Map<String,Object> content = new HashMap<>();
    
    try {
      
      if (member.getAddress() == null || member.getAddress().equals("undefined")) {
        member.setAddress(null);
      }
      
      if (memberService.update(member) == 0) 
        throw new RuntimeException("해당 번호의 회원이 없습니다.");
      
      loginUser = memberService.get(loginUser.getNo());
      
      session.setAttribute("loginUser", loginUser);
      content.put("status", "success");

    } catch (Exception e) {
      e.printStackTrace();
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @PostMapping("nickcheck")
  public Object nickcheck(@RequestBody String nickName) {
    
    int count = 0;
    Map<String, Object> map = new HashMap<>();

    count = memberService.nickNameCheck(nickName);
    map.put("cnt", count);

    return map;
  }
  
  @GetMapping("emailcheck")
  public Object emailCheck(@RequestParam String email) {
    System.out.println(email);
    Map<String, Object> content = new HashMap<>();
    Member member = memberService.get(email);
    if(member != null) {
      content.put("status", "success");
    } else {
      content.put("status", "fail");
    }
    return content;
  }

  @PostMapping("passwordcheck")
  public Object passwordcheck(
      HttpSession session,
      @RequestBody String password) {
    
    boolean result = false;
    Map<Object, Object> map = new HashMap<Object, Object>();
    
    Member loginUser = (Member) session.getAttribute("loginUser");

    result = memberService.passwordCheck(loginUser.getEmail(), password);
    map.put("result", result);

    return map;
  }
  
  @PostMapping(
      value = "photo",
      consumes = "multipart/form-data")
  public Object photo(
      HttpSession session,      MultipartFile avatar) throws Exception {
   
    Member loginUser = (Member) session.getAttribute("loginUser");
    Map<String, Object> content = new HashMap<>();
    
    if (avatar.isEmpty()) {
      content.put("status", "fail");
      return content;
    }
    
    // 이미지 저장
    String filename = UUID.randomUUID().toString();
    String path = servletContext.getRealPath("/upload/images/member/" + filename);
    avatar.transferTo(new File(path));
    
    // 썸네일 이미지 저장
    Thumbnails.of(path)
    .size(1000, 1000)
    .outputFormat("jpg")
    .toFiles(Rename.PREFIX_DOT_THUMBNAIL);
    
    loginUser.setPhoto(filename);
    
    if(memberService.updatePhoto(loginUser) != 0) {
      content.put("loginUser", loginUser);
      content.put("status", "success");
      
    } else {
      content.put("status", "fail");
    }
    return content;
  }
  
  // 회원의 평가 정보
  @GetMapping("rateinfo")
  public Object rateinfo(HttpSession session) {

    Member loginUser = (Member)session.getAttribute("loginUser");
    
    HashMap<String,Object> content = new HashMap<>();

    if (loginUser != null) {
      
      List<StudyMember> rateInfo = studyMemberService.rateInfo(loginUser.getNo());
      List<RateLog> rateLog = rateService.list(loginUser.getNo());
      
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
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="3") int pageSize) {

    Member loginUser = (Member)session.getAttribute("loginUser");
    
    HashMap<String,Object> content = new HashMap<>();

    if (loginUser != null) {
      
      if (pageSize < 3 || pageSize > 8) 
        pageSize = 3;

      int rowCount = studyMemberService.sizeEndStudy(loginUser.getNo()); 

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
      
      List<History> history = studyMemberService.userHistory(loginUser.getNo(), pageNo, pageSize);
      
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
  
  // 매달 1일 마다 평가 기록을 자동으로 업데이트 한다.
  @Scheduled(cron = "0 0 0 20 * *")
  public void rateLogSchedule() {
    System.out.println("schedule start!!!");
    int count = rateService.addRateLog();
    
    if (count > 0) {
      System.out.println(count);
      System.out.println("평가 기록 업데이트 완료!");
    } else {
      System.out.println("평가 기록 업데이트 실패!");
    }
  }

}







