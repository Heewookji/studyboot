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

    List<RateRequire> retireeList = (List<RateRequire>) studyRetireService.retireTrueOrFalse(map); //RateRequireMapper (retireTrueOrFalse)

    // 로그인한 유저가 해당 스터디의 멤버(탈퇴자들)를 평가한 정보 목록 뽑아옴(회원 평점 정보 테이블)
    List<Rate> retireeRateList = (List<Rate>) studyRetireService.retireEvaluation(map);//RateMapper (findAll)

    // 탈퇴자가 있다면 리턴
    if (retireeList.size() != retireeRateList.size()) {

      content.put("status", "이 전에 탈퇴한 회원을 먼저 평가해 주세요!");

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
      rateRequireMap.put("memberCount", nickNames.length); // 나를 평가해야 하는 멤버 수
      
      
      studyRetireService.rateRequire(rateRequireMap);

    } catch (Exception e) {
      content.put("status", "스터디 탈퇴 중 에러가 발생 하였습니다.");
      content.put("message", e.getMessage());
    }


    try {
      List studyMemberNoList =  memberService.findMemberNoByNickNameList(nickNames);

      // 평가점수 입력
      for(int i = 0; i < nickNames.length; i++) {
        evaluationMap.put("studyNo", studyNo); // 스터디 넘버
        evaluationMap.put("memberNo", loginUser.getNo()); // 평가자
        evaluationMap.put("confirmMemberId", studyMemberNoList.get(i)); // 평가받는 자
        evaluationMap.put("rate", evaluations[i]); // 평점 정보
        evaluationMap.put("rateDate", format.format(new Date())); // 오늘 일자
        studyRetireService.evaluationAdd(evaluationMap);
      }
      content.put("status", "탈퇴가 완료 되었습니다.");
    } catch (Exception e) {
      content.put("status", "평가점수 입력 중 에러가 발생 하였습니다.");
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

          System.out.println(rateRequireRetirees);


          content.put("retire", rateRequireRetirees);

        } else { // inner if // 탈퇴자는 있지만 아무도 평가를 안했을 경우

          content.put("retire", retireeList);
          return content; // 아랫줄에 도달하지 못하게 바로 리턴.
        } 

      } else { // 탈퇴자 리스트가 아예 없을 경우

        content.put("retire", "x");
      }


      //모든 멤버가 평가했다면 update해야




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
      content.put("status", "스터디 멤버가 아닙니다.");
      return content;

    } else if (studyMember.getEndNo() == 1 || 
        studyMember.getEndNo() == 2 || studyMember.getEndNo() == 3) { // 추방, 탈퇴 유저가 널이 아니면

      content.put("status", "스터디 멤버가 아닙니다.");
      return content;
    }
    
    try {

      for (int i = 0; i < retireeNo.size(); i++) {
        evaluationMap.put("studyNo", studyNo);
        evaluationMap.put("memberNo", loginUser.getNo());
        evaluationMap.put("confirmMember", retireeNo.get(i));
        evaluationMap.put("rate", retireeEvaluationRateArr[i]);
        evaluationMap.put("rateDate", format.format(new Date()));

        studyRetireService.retireeRateAdd(evaluationMap);
        System.out.println("********************************");
        System.out.println(retireeNo.get(i)); // 탈퇴자들 번호
      }
      
      
      
      
      // 새로운 try문 만들던지 여기다 하던지 선택
      // sms_member_retire 카운트를 뽑음
      // sms_member_rate_info 스터디번호, 회원번호, 평가한 회원번호 입력 갖고 select 카운팅 
      // 두 숫자가 같은 경우 sms_member_retire 의 rate_requir false로 update
      
      // 기존의 문제점은 내가 탈퇴하고 누군가 또 탈퇴할 경우 스터디 멤버의 개수(나를 평가해야하는 사람 수)를 찾을 수 없
      // ex) 내가 탈퇴할때 나를 제외한 멤버의 수는 6명이다
      //     고로 나를 평가해줘야하는 사람은 6명이다
      //     이 6명의 숫자를 어디선가 뽑아내야 평가필요여부를 false로 바꾸는데 
      //     만약 내가 탈퇴 후 누군가 나를 평가하고 탈퇴를 했다. 그럼 남은 스터 원은 5명이기에 스터디 회원으로 뽑을 수는 없다.
      
      
      content.put("status", "탈퇴자 평가가 완료 되었습니다.");
    } catch (Exception e) {
      content.put("status", "평가중 오류가 발생 하였습니다.");
      content.put("message", e.getMessage());
      System.out.println(e.getMessage());
    }
    
    try {
      
    } catch (Exception e) {
      
    }

    return content;

  }


}
