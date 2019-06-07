package com.studyboot.sms.web.json;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.studyboot.sms.domain.Member;
import com.studyboot.sms.service.MemberService;
import com.studyboot.sms.service.StudyMemberService;
import com.studyboot.sms.service.StudyRetireService;

@RestController("json/RetireEvaluationController")
@RequestMapping("/json/retireEvaluation")
public class StudyRetireController {
  
  @Autowired MemberService memberService;
  @Autowired StudyRetireService studyRetireService;
  @Autowired StudyMemberService studyMemberService;
  
  @GetMapping("retireEvaluation")
  public Object retireEvaluation(String[] nickNames, String[] evaluations, int studyNo, HttpSession session) {

    HashMap<String,Object> content = new HashMap<>();
    Member loginUser = (Member) session.getAttribute("loginUser");
    SimpleDateFormat format = new SimpleDateFormat ("yyyy-MM-dd");
    
    // 리더 판단을 위한 코드
    HashMap<String,Object> studyAndUserNo = new HashMap<>();
    studyAndUserNo.put("loginUser", loginUser.getNo());
    studyAndUserNo.put("studyNo", studyNo);
    boolean leaderYesOrNo = studyMemberService.findStudyMemberLeader(studyAndUserNo);
    if (leaderYesOrNo == false) {

      content.put("status", "스터디 장은 스터디에 탈퇴 할 수 없습니다.");
      return content;
    }
    
    
    // 닉네임을 멤버넘버로 바꾸는 코드
    List memberNo =  memberService.findMemberNoByNickNameList(nickNames);

    HashMap<String,Object> evaluationMap = new HashMap<>(); // 평가 맵
    HashMap<String,Object> attendMap = new HashMap<>(); // 탈퇴 탭
    
    attendMap.put("endNo", 2);
    attendMap.put("endDate", format.format(new Date()));
    attendMap.put("studyNo", studyNo);
    attendMap.put("memberNo", loginUser.getNo());
    
    try {
      
      studyMemberService.attendUpdate(attendMap);
      
      for(int i = 0; i < nickNames.length; i++) {
        evaluationMap.put("studyNo", studyNo); // 스터디 넘버
        evaluationMap.put("memberNo", loginUser.getNo()); // 평가자
        evaluationMap.put("confirmMemberId", memberNo.get(i)); // 평가받는 자
        evaluationMap.put("rate", evaluations[i]); // 평점 정보
        evaluationMap.put("rateDate", format.format(new Date())); // 오늘 일자
        studyRetireService.evaluationAdd(evaluationMap);
      }
      content.put("status", "탈퇴가 완료 되었습니다.");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    
    return content;
  }
}
