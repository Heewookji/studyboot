package com.studyboot.sms.web.json;

import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.studyboot.sms.domain.Member;
import com.studyboot.sms.service.MemberService;
import com.studyboot.sms.service.StudyRetireService;

@RestController("json/RetireEvaluationController")
@RequestMapping("/json/retireEvaluation")
public class StudyRetireController {
  
  @Autowired MemberService memberService;
  @Autowired StudyRetireService studyRetireService;
  
  @GetMapping("retireEvaluation")
  public Object retireEvaluation(String[] nickNames, int studyNo, HttpSession session) {

    HashMap<String,Object> content = new HashMap<>();

    Member loginUser = (Member) session.getAttribute("loginUser");
    loginUser.getNo();
    
    
    // 닉네임을 멤버넘버로 바꾸는 코드
    List memberNo =  memberService.findMemberNoByNickNameList(nickNames);
    
    HashMap<String,Object> evaluationMap = new HashMap<>();
    try {
      for(int i = 0; i < memberNo.size(); i++) {
        evaluationMap.put("studyNo", loginUser.getNo());
        evaluationMap.put("studyNo", studyNo);
        evaluationMap.put("memberNo", memberNo.get(i));
        studyRetireService.evaluationAdd(evaluationMap);
      }
      content.put("status", "평가 완료");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    
    return content;
  }
}
