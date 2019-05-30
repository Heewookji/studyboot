package com.studyboot.sms.web.json;

import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.studyboot.sms.domain.Member;
import com.studyboot.sms.domain.Schedule;
import com.studyboot.sms.service.MyStudyScheduleService;
import com.studyboot.sms.service.StudyMemberService;

@RestController("json/MyStudyScheduleController")
@RequestMapping("/json/mystudyschedule")
public class MyStudyScheduleController {

  @Autowired MyStudyScheduleService myStudyScheduleService;
  @Autowired StudyMemberService studyMemberService;

  @PostMapping("add")
  public Object add(Schedule schedule, HttpSession session) {
    HashMap<String,Object> content = new HashMap<>();

    Member loginUser = (Member) session.getAttribute("loginUser"); // 로그인한 유저의 정보를 담는다.

    // loginUser.getNo() 로그인한 유저의 유저넘버를 schedule 객체에 담는다.
    schedule.setMemberNo(loginUser.getNo());

    // 리더 판만을 위한 코드 (34줄 ~ 48줄)
    HashMap<String,Object> studyAndUserNo = new HashMap<>();
    studyAndUserNo.put("loginUser", loginUser.getNo());
    studyAndUserNo.put("studyNo", schedule.getStudyNo());
    boolean leaderYesOrNo = studyMemberService.findStudyMemberLeader(studyAndUserNo);

    // 리더 유무 판단. 
    if (leaderYesOrNo == false) {

      content.put("status", "스터디 장만 일정을 등록 할 수 있습니다.");
      return content;
    }

    try {
      myStudyScheduleService.add(schedule);
      content.put("status", "등록이 완료 되었습니다.");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }

    return content;
  }

  @GetMapping("list")
  public Object list(HttpSession session, @RequestParam int no) {
    
    Member loginUser = (Member) session.getAttribute("loginUser"); // 로그인한 유저의 정보를 담는다.

    HashMap<String,Object> studyAndUserNo = new HashMap<>();
    studyAndUserNo.put("loginUser", loginUser.getNo());
    studyAndUserNo.put("studyNo", no);
    
    // 데이터 베이스에서 공간에 대한 정보 리스트를 받아온다.
    List<Object> schedule = myStudyScheduleService.list(no);
   
    // 배열 마지막방에 리더 유무 판단을 위해 boolean값을 넣는다.
    schedule.add(studyMemberService.findStudyMemberLeader(studyAndUserNo));

    System.out.println("컨트롤러 list: " + schedule);
    System.out.println("리더입니까?: " + schedule.get(schedule.size()-1));
    
    return schedule;
  }

  @GetMapping("detail")
  public Object detail(int no) {

    Schedule schedule = myStudyScheduleService.get(no);

    return schedule;
  }

  @GetMapping("delete")
  public Object delete(int no) {

    HashMap<String,Object> content = new HashMap<>();
    try {
      if (myStudyScheduleService.delete(no) == 0) 
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @PostMapping("update")
  public Object update(Schedule schedule, HttpSession session) {
    HashMap<String,Object> content = new HashMap<>();
    
    Member loginUser = (Member) session.getAttribute("loginUser"); // 로그인한 유저의 정보를 담는다.

    // loginUser.getNo() 로그인한 유저의 유저넘버를 schedule 객체에 담는다.
    schedule.setMemberNo(loginUser.getNo());

    // 리더 판만을 위한 코드
    HashMap<String,Object> studyAndUserNo = new HashMap<>();
    studyAndUserNo.put("loginUser", loginUser.getNo());
    studyAndUserNo.put("studyNo", schedule.getStudyNo());
    boolean leaderYesOrNo = studyMemberService.findStudyMemberLeader(studyAndUserNo);
    
    // 리더 유무 판단. 
    if (leaderYesOrNo == false) {

      content.put("status", "스터디 장만 일정을 수정 할 수 있습니다.");
      return content;
    }
    
    try {
      if (myStudyScheduleService.update(schedule) == 0) 
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "수정이 완료 되었습니다.");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
    
}


