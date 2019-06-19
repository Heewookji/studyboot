package com.studyboot.sms.web.json;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.studyboot.sms.domain.Member;
import com.studyboot.sms.domain.Rate;
import com.studyboot.sms.domain.RateRequire;
import com.studyboot.sms.domain.Study;
import com.studyboot.sms.domain.StudyMember;
import com.studyboot.sms.service.MemberService;
import com.studyboot.sms.service.MyStudyScheduleService;
import com.studyboot.sms.service.StudyMemberService;
import com.studyboot.sms.service.StudyRetireService;
import com.studyboot.sms.service.StudyService;

@RestController("json/RetireEvaluationController")
@RequestMapping("/json/retireEvaluation")
public class StudyRetireController {

  @Autowired MemberService memberService;
  @Autowired StudyService studyService;
  @Autowired StudyRetireService studyRetireService;
  @Autowired StudyMemberService studyMemberService;
  @Autowired MyStudyScheduleService myStudyScheduleService;

  @GetMapping("retireEvaluation")
  public Object retireEvaluation(String[] nickNames, String[] evaluations, int studyNo, HttpSession session) {

    HashMap<String,Object> content = new HashMap<>();
    Member loginUser = (Member) session.getAttribute("loginUser");
    SimpleDateFormat format = new SimpleDateFormat ("yyyy-MM-dd");

    // 리더 판단을 위한 코드
    Map<String,Object> studyAndUserNo = new HashMap<>();
    studyAndUserNo.put("loginUser", loginUser.getNo());
    studyAndUserNo.put("studyNo", studyNo);
    boolean leaderYesOrNo = studyMemberService.findStudyMemberLeader(studyAndUserNo);
    System.out.println("리더 ?? " + leaderYesOrNo);
    if (leaderYesOrNo == true) {

      content.put("status", "스터디 장은 스터디에 탈퇴 할 수 없습니다.");
      return content;
    }

    // 탈퇴자가 있는지 판단하기 위한 코드
    Map<String,Object> map = new HashMap<>();
    map.put("studyNo", studyNo);
    map.put("rateRequire", true);
    map.put("no", loginUser.getNo());

    // 모든 스터디원에게 평가받지 못한 탈퇴자들의 리스트를 뽑아온다.(평가가 끝나지 않은 탈퇴자들)
    List<RateRequire> retireeList = (List<RateRequire>) studyRetireService.retireTrueOrFalse(map); //RateRequireMapper (retireTrueOrFalse)

    // 로그인한 유저가 해당 스터디의 멤버(탈퇴자들)를 평가한 정보 목록 뽑아옴(회원 평점 정보 테이블)
    List<Rate> retireeRateList = (List<Rate>) studyRetireService.retireEvaluation(map);//RateMapper (findAll)


    //select * from sms_member_rate_info where std_id=100 and member_id=5 and confirm_member_id = #{memberNo};
    // 탈퇴자가 있다면 리턴
    System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!");
    System.out.println("retireeList: "+retireeList);
    System.out.println("retireeRateList: "+retireeRateList);
    System.out.println("retireeList.size: "+retireeList.size());
    System.out.println("retireeRateList.size(): "+retireeRateList.size());
    System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!");

    // 평가 완료되지 않은 탈퇴자들의 수와 로그인한 유저가 평가한 유저의 수가 일치하지 않으면 실행
    if (retireeList.size() != retireeRateList.size()) { 
      if (retireeList.size() == 0) { } // 탈퇴자들이 모두 평가되었다면 그냥 지나가야 된다.
        else { 
          content.put("status", "이 전에 탈퇴한 회원을 먼저 평가해 주세요!");
          return content;
        }
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

    HashMap<String,Object> evaluationMap = new HashMap<>(); // 평가 맵
    HashMap<String,Object> rateRequireMap = new HashMap<>(); // 탈퇴자 평가 여부 맵

    HashMap<String,Object> retireMap = new HashMap<>(); // 탈퇴 탭
    retireMap.put("endNo", 2);
    retireMap.put("endDate", format.format(new Date()));
    retireMap.put("studyNo", studyNo);
    retireMap.put("memberNo", loginUser.getNo());

    try {
      // 스터디 탈퇴
      studyMemberService.attendUpdate(retireMap);

      // 남은 스터디 원 조회
      //List<StudyMember> studyMemberList = studyMemberService.findStudyMember(studyNo);

      // 스터디 원 들이 탈퇴자를 평가 할 수 있게 sms_member_retire 테이블 true로 입력
      rateRequireMap.put("studyNo", studyNo);
      rateRequireMap.put("memberNo", loginUser.getNo());
      rateRequireMap.put("rateRequire", true);
      rateRequireMap.put("studyRateRequireCount", nickNames.length); // 나를 평가해야 하는 멤버 수

      studyRetireService.rateRequire(rateRequireMap);

    } catch (Exception e) {
      content.put("status", "스터디 탈퇴 중 오류가 발생 하였습니다.");
      content.put("message", e.getMessage());
    }

    try {

      int allEventNumber = myStudyScheduleService.allEventCount(studyNo); // 모든 일정의 수

      // 필요한 정보가 put 되어 있어서 retireMap을 재사용 하였다.
      int studyAttendNumber = myStudyScheduleService.studyAttendCount(retireMap); // 로그인 한 사용자가 출석한 수

      double attendPercent = (double) studyAttendNumber / allEventNumber * 100;

      double attendPercentCut = (Math.round((attendPercent)*10)/10.0);

      Map<String, Object> attendPercentUpdateMap = new HashMap<>();

      System.out.println("모든일정 수: " + allEventNumber);
      System.out.println("출석한횟 수: " + studyAttendNumber);
      System.out.println("확률: " + attendPercent);
      System.out.println("확률자른거: " + attendPercentCut);

      attendPercentUpdateMap.put("percent", attendPercentCut);
      attendPercentUpdateMap.put("studyNo", studyNo);
      attendPercentUpdateMap.put("memberNo", loginUser.getNo());

      studyMemberService.attendPercentUpdate(attendPercentUpdateMap); // 출석률을 업데이트 한다.

    } catch (Exception e) {
      content.put("status", "출석률 업데이트 중 오류가 발생 하였습니다.");
      content.put("message", e.getMessage());
      System.out.println("출석률 업데이트 오류 내용: " + e.getMessage());
    }

    try {
      List studyMemberNoList =  memberService.findMemberNoByNickNameList(nickNames); // 닉네임을 멤버넘버로 바꾸는 코드

      // 평가점수 입력
      for(int i = 0; i < nickNames.length; i++) {
        evaluationMap.put("studyNo", studyNo); // 스터디 넘버
        evaluationMap.put("memberNo", loginUser.getNo()); // 평가자
        evaluationMap.put("confirmMemberNo", studyMemberNoList.get(i)); // 평가받는 자
        evaluationMap.put("rateClass", 0); // 평점 정보
        evaluationMap.put("rate", evaluations[i]); // 평점 정보
        evaluationMap.put("rateDate", format.format(new Date())); // 오늘 일자
        studyRetireService.evaluationAdd(evaluationMap);
      }
      content.put("status", "탈퇴가 완료 되었습니다.");
    } catch (Exception e) {
      content.put("status", "평가점수 입력 중 오류가 발생 하였습니다.");
      content.put("message", e.getMessage());
    }

    //탈퇴를 완료한다면, 스터디 테이블에 현재 인원칼럼 값을 1개 줄인다. 현재 인원을 칼럼에 저장하는게 관리하기 편하기 때문(희욱)
    Study study = studyService.get(studyNo);
    study.setNowPersonnel(study.getNowPersonnel() - 1);
    studyService.update(study);

    return content;
  }

  @GetMapping("retireTrueOrFalse")
  public Object retireTrueOrFalse(int studyNo, HttpSession session) {

    HashMap<String,Object> content = new HashMap<>();
    HashMap<String,Object> map = new HashMap<>();

    Member loginUser = (Member) session.getAttribute("loginUser");

    try {

      map.put("studyNo", studyNo);
      map.put("rateRequire", true);
      map.put("no", loginUser.getNo());

      // 모든 스터디원에게 평가받지 못한 탈퇴자들의 리스트를 뽑아온다.(평가가 끝나지 않은 탈퇴자들)
      List<RateRequire> retireeList = (List<RateRequire>) studyRetireService.retireTrueOrFalse(map); //RateRequireMapper (retireTrueOrFalse)

      // 로그인한 유저가 해당 스터디의 멤버(탈퇴자들)를 평가한 정보 목록 뽑아옴(회원 평점 정보 테이블)
      List<Rate> retireeRateList = (List<Rate>) studyRetireService.retireEvaluation(map);//RateMapper (findAll)

      // 로그인한 유저에게 평가 받지 못한 탈퇴자들 모음
      List<RateRequire> rateRequireRetirees = new ArrayList<>(); 

      System.out.println(retireeList);
      System.out.println(retireeRateList);

      Map<Integer, Integer> retireMap = new HashMap<>();


      int retireNo = 0;
      int count = 0;

      // 스터디에 탈퇴자or 탈퇴자들이 있다면 if문 실행
      if (retireeList.size() > 0) {

        // 탈퇴자 중 평가자가 있을경우
        if(retireeRateList.size() != 0) { // 탈퇴자 중 한명이라도 평가 했을경우 반복문 실행

          for (int i = 0; i < retireeRateList.size(); i++) { // 탈퇴자 평가리스트(3명탈퇴 중 2명 탈퇴하면 2바퀴 돌음)

            for (int j = 0; j < retireeList.size(); j++) {

              if (retireeRateList.get(i).getConfirmNo() != retireeList.get(j).getMemberNo()) {
                // 평가 당한 사람 번호                            탈퇴자 번호 

                retireNo = retireeList.get(j).getMemberNo();

                if(retireMap.get(retireNo) == null) {
                  retireMap.put(retireNo, 1);

                }else {
                  count = retireMap.get(retireNo);
                  retireMap.put(retireNo, ++count);
                }
              }

            } //in for
          } //out for

          retireMap.forEach((Integer no, Integer countValue) ->{

            if(countValue == retireeRateList.size()) {
              for(RateRequire i : retireeList) {
                if(no == i.getMemberNo())
                  rateRequireRetirees.add(i);
              }
            }
          });

          content.put("retire", rateRequireRetirees);

        } else { // inner if // 탈퇴자는 있지만 아무도 평가를 안했을 경우

          content.put("retire", retireeList);
          return content; // 아랫줄에 도달하지 못하게 바로 리턴.
        } 

      } else { // 탈퇴자 리스트가 아예 없을 경우

        content.put("retire", "x");
      }

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
      System.out.println("오류 메시지: " + e.getMessage());
    }

    return content;
  }

  @GetMapping("retireeEvaluationRate")
  public Object retireeEvaluationRate(String[] retireeNickNames, String[] retireeEvaluationRateArr, int studyNo, HttpSession session) {

    HashMap<String,Object> content = new HashMap<>();
    Member loginUser = (Member) session.getAttribute("loginUser");
    SimpleDateFormat format = new SimpleDateFormat ("yyyy-MM-dd");


    List retireeNo =  memberService.findMemberNoByNickNameList(retireeNickNames); // 닉네임을 회원번호로

    Map<String,Object> evaluationMap = new HashMap<>();

    // 탈퇴자 평가 하려는 멤버가 스터디 멤버인지 확인 후 멤버가 아니면 리턴
    HashMap<String,Object> studyUserMap = new HashMap<>();
    studyUserMap.put("studyNo", studyNo);
    studyUserMap.put("memberNo", loginUser.getNo());
    StudyMember studyMember = studyMemberService.findMyStudyByNo(studyUserMap);

    if (studyMember == null) { // 중복 탈퇴 못하게 막음
      content.put("status", "스터디 멤버가 아닙니다."); // 스터디 멤버가 아님
      return content;

    } else if (studyMember.getEndNo() == 1 || 
        studyMember.getEndNo() == 2 || studyMember.getEndNo() == 3) { // 추방, 탈퇴 유저가 널이 아니면

      content.put("status", "스터디 멤버가 아닙니다."); // 해당 스터디에 탈퇴한 회원
      return content;
    }

    try {

      for (int i = 0; i < retireeNo.size(); i++) {
        evaluationMap.put("studyNo", studyNo);
        evaluationMap.put("memberNo", loginUser.getNo());
        evaluationMap.put("confirmMemberNo", retireeNo.get(i));
        evaluationMap.put("rateClass", 1);
        evaluationMap.put("rate", retireeEvaluationRateArr[i]);
        evaluationMap.put("rateDate", format.format(new Date()));

        studyRetireService.evaluationAdd(evaluationMap);

        System.out.println("********************************");
        System.out.println(retireeNo.get(i)); // 탈퇴자들 번호
      }
      content.put("status", "탈퇴자 평가가 완료 되었습니다.");

    } catch (Exception e) {
      content.put("status", "평가중 오류가 발생 하였습니다.");
      content.put("message", e.getMessage());
      System.out.println("오류1: " + e.getMessage());
    }

    HashMap<String,Object> map = new HashMap<>();
    map.put("studyNo", studyNo);
    int evaluationMemberCount = 0; // 스터디 탈퇴 당시 남은 멤버의 수
    int retireeEvaluationCount = 0; // 스터디 탈퇴자를 몇명이 평가 했는지 카운트

    try { // 스터디에 남은 멤버가 탈퇴자를 모두 평가했다면 평가 필요여부를 false로 바꿈
      for (int i = 0; i < retireeNo.size(); i++) {

        map.put("reitreeMemberNo", (int) retireeNo.get(i));

        evaluationMemberCount = studyRetireService.evaluationMemberCount((int) retireeNo.get(i));
        retireeEvaluationCount = studyRetireService.retireeEvaluationCount(map);

        System.out.println("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
        System.out.println("memberNo: " + (int) retireeNo.get(i));
        System.out.println("evaluationMemberCount: " + evaluationMemberCount);
        System.out.println("retireeEvaluationCount: " + retireeEvaluationCount);
        System.out.println("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

        if (evaluationMemberCount == retireeEvaluationCount) {
          studyRetireService.rateRequireUpdate(map);
        }

      }
    } catch (Exception e) {
      content.put("status", "평가중 오류가 발생 하였습니다.");
      content.put("message", e.getMessage());
      System.out.println("오류2: " + e.getMessage());
    }

    return content;
  }

}
