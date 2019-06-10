package com.studyboot.sms.web.json;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.studyboot.sms.domain.Member;
import com.studyboot.sms.domain.Rate;
import com.studyboot.sms.domain.RateRequire;
import com.studyboot.sms.domain.StudyMember;
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
    System.out.println("리더 ?? " + leaderYesOrNo);
    if (leaderYesOrNo == true) {

      content.put("status", "스터디 장은 스터디에 탈퇴 할 수 없습니다.");
      return content;
    }

    // 탈퇴하려는 유저가 스터디 맴버인지 판단.
    HashMap<String,Object> studyUserMap = new HashMap<>();
    studyUserMap.put("studyNo", studyNo);
    studyUserMap.put("memberNo", loginUser.getNo());
    StudyMember studyMember = studyMemberService.findMyStudyByNo(studyUserMap);

    if (studyMember == null) { // 중복 탈퇴 못하게 막음
      content.put("status", "스터디 멤버가 아닙니다.");
      return content;

    } else if (studyMember.getEndNo() == 1 || 
        studyMember.getEndNo() == 2 || studyMember.getEndNo() == 3) { // 추방, 탈퇴 유저가 널이 아니면

      content.put("status", "스터디 멤버가 아닙니다.");
      return content;
    }


    // 닉네임을 멤버넘버로 바꾸는 코드
    List memberNo =  memberService.findMemberNoByNickNameList(nickNames);

    HashMap<String,Object> evaluationMap = new HashMap<>(); // 평가 맵
    HashMap<String,Object> rateRequireMap = new HashMap<>(); // 탈퇴자 평가 여부 맵

    HashMap<String,Object> attendMap = new HashMap<>(); // 탈퇴 탭
    attendMap.put("endNo", 2);
    attendMap.put("endDate", format.format(new Date()));
    attendMap.put("studyNo", studyNo);
    attendMap.put("memberNo", loginUser.getNo());


    try {
      // 스터디 탈퇴
      studyMemberService.attendUpdate(attendMap);

      // 남은 스터디 원 조회
      //List<StudyMember> studyMemberList = studyMemberService.findStudyMember(studyNo);

      // 스터디 원 들이 탈퇴자를 평가 할 수 있게 sms_member_retire 테이블 true로 입력
      rateRequireMap.put("studyNo", studyNo);
      rateRequireMap.put("memberNo", loginUser.getNo());
      rateRequireMap.put("rateRequire", true);
      studyRetireService.rateRequire(rateRequireMap);

    } catch (Exception e) {
      content.put("status", "스터디 탈퇴 중 에러가 발생 하였습니다.");
      content.put("message", e.getMessage());
    }


    try {
      // 평가점수 입력
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
      content.put("status", "평가점수 입력 중 에러가 발생 하였습니다.");
      content.put("message", e.getMessage());
    }

    return content;
  }


  @GetMapping("retireTrueOrFalse")
  public Object retireTrueOrFalse(int studyNo, HttpSession session) {

    HashMap<String,Object> content = new HashMap<>();
    HashMap<String,Object> map = new HashMap<>();

    int confirmNo = 0;
    RateRequire rateRequire = null;
    
    Member loginUser = (Member) session.getAttribute("loginUser");

    try {

      map.put("studyNo", studyNo);
      map.put("rateRequire", true);
      map.put("no", loginUser.getNo()); // 얘랑 128줄 얘네 갖고 평가한 회원 번호 찾기

      // 모든 스터디원에게 평가받지 못한 탈퇴자들의 리스트를 뽑아온다.
      List<RateRequire> rateRequireList = (List<RateRequire>) studyRetireService.retireTrueOrFalse(map); //RateRequireMapper

      List<RateRequire> rateRequirePerson = new ArrayList<>(); // 평가 받지 못한 탈퇴자들 모음

      // 로그인한 유저가 해당 스터디의 멤버(탈퇴자들)를 평가한 정보 목록 뽑아옴(회원 평점 정보 테이블)
      List<Rate> rate = (List<Rate>) studyRetireService.retireEvaluation(map);//RateMapper

      System.out.println(rateRequireList);
      System.out.println(rate);
     
      // 탈퇴자 리스트가 있다면 if문 실행
      if (rateRequireList.size() > 0) {
System.out.println("탈퇴자 리스트가 있다면 if문 실행");

        if(rate.size() != 0) { // 탈퇴자 중 한명이라도 평가 했을경우 반복문 실행
System.out.println("탈퇴자 중 한명이라도 평가 했을경우 반복문 실행");

          for(int i = 0; i < rate.size(); i++) {
            
            confirmNo = rate.get(i).getConfirmNo();
            map.put("confirmNo", confirmNo);
            System.out.println("confirmNo: " + confirmNo);
            System.out.println("rate.get(i).getConfirmNo(): " + confirmNo);
            System.out.println("rateRequire.get(i).getMemberNo(): " + rateRequireList.get(i).getMemberNo());
    
            rateRequire = studyRetireService.retireEvaluationWait(map);
            
            System.out.println("rateRequire: " + rateRequire.getMemberNo());
            //studyRetireServiceImpl
            System.out.println("for문: " + i);

            // 유저가 평가한 회원 번호 == 탈퇴한 회원 번호  ===> 탈퇴한 회원번호를 평가 했을경우 다음 반복문.
            if (rate.get(i).getConfirmNo() == rateRequire.getMemberNo() && studyNo == rate.get(i).getStudyNo()) {
              System.out.println("평가한 유저");
              continue; 

            }
              System.out.println("평가 못받은  유저 add");
              rateRequirePerson.add(rateRequireList.get(i));

          } //for

        } else { // inner if // 탈퇴자는 있지만 아무도 평가를 안했을 경우

          for(int i = 0; i < rateRequireList.size(); i++) {
            
            rateRequirePerson.add(rateRequireList.get(i));
            System.out.println("탈퇴자는 잇지만 아무도 평가를 안했어요");
            System.out.println("평가받지 못한 탈퇴자들 모음집 :" + rateRequirePerson);
          }
          
          
          
          
        }

        content.put("retire", rateRequirePerson);
        
      } else { // 탈퇴자 리스트가 아예 없을 경우
        System.out.println("------------------------------");
        content.put("retire", "0");
      }
      //content.put("state", );
      System.out.println("==============================");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
      System.out.println("오류 메시지: " + e.getMessage());
    }

    return content;
  }

}
