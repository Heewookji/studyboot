package com.studyboot.sms.web.json;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.studyboot.sms.domain.Address;
import com.studyboot.sms.domain.Cls;
import com.studyboot.sms.domain.Member;
import com.studyboot.sms.domain.Study;
import com.studyboot.sms.domain.StudyMember;
import com.studyboot.sms.service.AddressService;
import com.studyboot.sms.service.AmazonS3_Service;
import com.studyboot.sms.service.ClsService;
import com.studyboot.sms.service.RateService;
import com.studyboot.sms.service.StudyMemberService;
import com.studyboot.sms.service.StudyService;



@RestController("json/StudyController")
@RequestMapping("/json/study")
public class StudyController {

  @Autowired StudyService studyService;
  @Autowired StudyMemberService studyMemberService;
  @Autowired ClsService clsService;
  @Autowired RateService rateService;
  @Autowired AddressService addressService;
  @Autowired AmazonS3_Service amazonService;

  @PostMapping("add")
  public Object add(Study study, HttpSession session) throws IOException{
    HashMap<String,Object> content = new HashMap<>();
    try {


      if(study.getPhoto().equals("undefined")) {
        //기본 사진 넣어준다.
        switch(study.getCls().substring(0, 2)) {
          case "11": study.setPhoto("itdefault");break;
          case "12": study.setPhoto("servicedefault");break;
          case "13": study.setPhoto("financialdefault");break;
          case "14": study.setPhoto("artdefault");break;
          case "15": study.setPhoto("liberaldefault");break;
          case "16": study.setPhoto("engineeringdefault");break;
          case "17": study.setPhoto("foreigndefault");break;
        }
      }
      studyService.add(study);

      int stdNo = study.getNo();
      Member loginUser = (Member)session.getAttribute("loginUser");

      //갓 만든 스터디라서 스터디 멤버가 아무도 없다면, 지금 요청한 멤버가 스터디를 생성한 스터디장이다.
      boolean leader = false;
      if(studyMemberService.findStudyMember(stdNo).size() == 0) {
        leader = true;
      }

      //스터디 멤버 테이블과, 스터디 자료실 생성한다.
      studyMemberService.addStudyMember(stdNo, loginUser.getNo(), leader);

      //스터디평점 갱신한다.
      studyService.updateRate(stdNo);

      amazonService.add(stdNo);

      content.put("status", "success");
      content.put("studyNo", stdNo);

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @GetMapping("pickedStudy")
  public Object addPickedStudy(int studyNo, boolean insertRemove, HttpSession session) throws IOException{
    HashMap<String,Object> content = new HashMap<>();
    Member member = (Member)session.getAttribute("loginUser");

    try {
      if(insertRemove == true) {
        studyService.insertPickedStudy(member.getNo(), studyNo);
        content.put("status", "success");
      } else {
        studyService.deletePickedStudy(member.getNo(), studyNo);
        content.put("status", "success");
      }

    }catch(Exception e) {
      content.put("status", "fail");
    }

    return content;
  }

  @GetMapping("appliedStudy")
  public Object appliedStudy(int studyNo, String determination, HttpSession session) throws IOException{
    HashMap<String,Object> content = new HashMap<>();
    Member member = (Member)session.getAttribute("loginUser");

    try {
      studyService.insertAppliedStudy(member.getNo(), studyNo, determination);
      content.put("status", "success");
    }catch(Exception e) {
      content.put("status", "fail");
    }
    return content;
  }



  /*
  @GetMapping("delete")
  public Object delete(int no) {

    HashMap<String,Object> content = new HashMap<>();
    try {
      if (studyService.delete(no) == 0) 
        throw new RuntimeException("해당 번호의 공간이 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
   */

  @GetMapping("detail")
  public Object detail(int no) {
    Study study = studyService.get(no);
    study.setStudyMembers(studyMemberService.findStudyMember(no));
    study.setClsList(clsService.getClsName(study.getCls()));
    study.setAddressName(addressService.addressFullName(study.getAddress()));
    return study;
  }


  @GetMapping("chart")
  public Object chart(int no) {

    HashMap<String,Object> content = new HashMap<>();

    try {
      Study study = studyService.get(no);

      HashMap<String, Integer> studyChartCount = studyService.chartCount(study.getRate());

      study.setStudyMembers(studyMemberService.findStudyMember(no));

      //스터디원들의 출석데이터 총합과 평균완료율구하기

    double finishPercentage = 0;
    double dropPercentage = 0;
    double exilePercentage = 0;
    
      ArrayList<Integer> attendanceValue = new ArrayList<>();
      ArrayList<String> attendanceLabel = new ArrayList<>();

      for(StudyMember sm : study.getStudyMembers()) {
        
        double finish = 0;
        double drop = 0;
        double exile = 0;

        List<StudyMember> rateInfos = studyMemberService.rateInfo(sm.getMemberNo());

        double memberAttendance = 0;
        int rateInfoSize = 0;

        for(StudyMember rateInfo : rateInfos ) {
          switch(rateInfo.getEndNo()) {
            case 1: finish++; break;
            case 2: drop++; break;
            case 3: exile++; break;
          }

          if(rateInfo.getEndNo() != 0 ) {
            memberAttendance += rateInfo.getAttendance();
            rateInfoSize++;
          }
        }
        
        
        
        
        memberAttendance = memberAttendance/rateInfoSize;

        //종료 스터디가 있을경우에만.
        if(rateInfoSize != 0 ) {
          
          //한명의 종료퍼센트 정보
          double oneSum = finish + drop + exile;
          double oneFinishPercentage = (finish/oneSum)*100;
          double oneDropPercentage = (drop/oneSum)*100;
          double oneExilePercentage = (exile/oneSum)*100;
          
          finishPercentage += oneFinishPercentage;
          dropPercentage += oneDropPercentage;
          exilePercentage += oneExilePercentage;
          
          
          System.out.println( sm.getMember().getNickName());
          System.out.println( oneFinishPercentage  );
          System.out.println( oneDropPercentage  );
          System.out.println( oneExilePercentage  );
          System.out.println("-----------------------");
          
          attendanceValue.add((int)memberAttendance);
          attendanceLabel.add(sm.getMember().getNickName());
        }
      }

      //종료 정보가 있는 스터디회원의 수 (attendanceLabel.size()) 로 나눈다.
      finishPercentage = finishPercentage/attendanceLabel.size();
      dropPercentage = dropPercentage/attendanceLabel.size();
      exilePercentage = exilePercentage/attendanceLabel.size();

      System.out.println(finishPercentage);
      System.out.println(dropPercentage);
      System.out.println(exilePercentage);
      
      
      System.out.println(attendanceValue);
      System.out.println(attendanceLabel);

      content.put("study", study);
      content.put("percentCount",studyService.percentCount(study.getRate()));
      content.put("studyChartCount", studyChartCount);
      content.put("finishPercentage", finishPercentage);
      content.put("dropPercentage", dropPercentage);
      content.put("exilePercentage", exilePercentage);
      content.put("attendanceValue", attendanceValue);
      content.put("attendanceLabel", attendanceLabel);
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
    }

    return content;
  }


  @GetMapping("search")
  public Object search(
      @RequestParam(defaultValue = "1") int pageNo,
      @RequestParam int pageSize,
      @RequestParam List<String> clsNo,
      @RequestParam String addressNo,
      @RequestParam double rateValue,
      @RequestParam String keyword,
      @RequestParam String dayNo) {

    // 페이지 사이즈
    if (pageSize < 4) {
      pageSize = 4;
    }

    if (addressNo.equals("undefined")) {
      addressNo = "";
    }
    if (clsNo.size() == 0) {
      clsNo = null;
    }

    //비트연산을 통해 월요일을 체크할 경우, 월화수, 월수, 월화수목금 등의 월요일 포함 정수 리스트 생성
    List<Integer> dayNoList = new ArrayList<>();
    if (!dayNo.equals("undefined")) {
      int dayNumber = Integer.valueOf(dayNo);

      for(int i = 0; i < 128; i++) {
        if( dayNumber == (dayNumber&i)){
          dayNoList.add(i);
        }
      }
    }

    HashMap<String,Object> content = new HashMap<>();

    // clsNo와 일치하는 스터디 개수를 불러온다.
    int rowCount = studyService.size(clsNo, addressNo, rateValue, keyword, dayNoList);


    if (rowCount == 0) {
      content.put("pageNo", 0);
      content.put("rowCount", rowCount);
      return content;
    }

    int totalPage = rowCount / pageSize;

    if (rowCount % pageSize > 0) {
      totalPage++;
    }

    if (pageNo < 1) {
      pageNo = 1;
    } else if (pageNo > totalPage) {
      pageNo = totalPage;
    }


    List<Study> studys = studyService.list(
        pageNo, pageSize, clsNo, addressNo, rateValue, keyword, dayNoList);

    //리스트에 출력할 주소는 따로 꽂아준다. 
    for(Study study : studys) {
      String addressName = addressService.addressFullName(study.getAddress());
      study.setAddressName(addressName);
    }


    content.put("list", studys);
    content.put("rowCount", rowCount);
    content.put("pageNo", pageNo);
    content.put("pageSize", pageSize);
    content.put("totalPage", totalPage);

    return content;

  }

  @GetMapping("list")
  public Object list(
      @RequestParam(defaultValue = "1") int pageNo,
      @RequestParam int pageSize,
      @RequestParam String clsNo,
      @RequestParam String addressNo,
      @RequestParam double rateValue,
      @RequestParam String keyword,
      @RequestParam String dayNo) {

    // 페이지 사이즈
    if (pageSize < 4) {
      pageSize = 4;
    }

    if (addressNo.equals("undefined")) {
      addressNo = "";
    }
    if (clsNo.equals("undefined")) {
      clsNo = "";
    }
    //매퍼에서 키워드를 조건문 keyword != null 로 비교하기 위하여. 안그러면 keywordSize != 0로 해야한다.
    if (keyword.equals("undefined")) {
      keyword = null;
    }

    //비트연산을 통해 월요일을 체크할 경우, 월화수, 월수, 월화수목금 등의 월요일 포함 정수 리스트 생성
    List<Integer> dayNoList = new ArrayList<>();
    if (!dayNo.equals("undefined")) {
      int dayNumber = Integer.valueOf(dayNo);

      for(int i = 0; i < 128; i++) {
        if( dayNumber == (dayNumber&i)){
          dayNoList.add(i);
        }
      }
    }


    HashMap<String,Object> content = new HashMap<>();

    // clsNo와 일치하는 스터디 개수를 불러온다.
    int rowCount = studyService.size(clsNo, addressNo, rateValue, keyword, dayNoList);
    if (rowCount == 0) {
      content.put("pageNo", 0);
      content.put("rowCount", rowCount);
      return content;
    }

    int totalPage = rowCount / pageSize;

    if (rowCount % pageSize > 0) {
      totalPage++;
    }

    if (pageNo < 1) {
      pageNo = 1;
    } else if (pageNo > totalPage) {
      pageNo = totalPage;
    }


    List<Study> studys = studyService.list(
        pageNo, pageSize, clsNo, addressNo, rateValue, keyword, dayNoList);

    //리스트에 출력할 주소는 따로 꽂아준다. 
    for(Study study : studys) {
      String addressName = addressService.addressFullName(study.getAddress());
      study.setAddressName(addressName);
    }


    content.put("list", studys);
    content.put("rowCount", rowCount);
    content.put("pageNo", pageNo);
    content.put("pageSize", pageSize);
    content.put("totalPage", totalPage);

    return content;
  }

  /*테스트용

  @GetMapping("rate")
  public Object rate(int nom, int no) {

    HashMap<String,Object> params = new HashMap<>();
    params.put("no", nom);
    params.put("studyNo", no);

    rateService.updateRate(params);
    return params;
  }
   */
  /*
  @PostMapping("update")
  public Object update(Study study) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (studyService.update(study) == 0) 
        throw new RuntimeException("해당 번호의 공간이 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }*/

  // 스터디 리스트 페이지에서 카테고리 목록 정보를 다룬다.
  @GetMapping("category")
  public Object category(
      @RequestParam String clsNo) {
    HashMap<String,Object> content = new HashMap<>();

    if (clsNo.equals("undefined")) {
      clsNo = "";
    }

    List<Cls> list = clsService.clsList(clsNo);
    content.put("list", list);
    return content;
  }

  //주소 목록 정보를 다룬다.
  @GetMapping("addresscategory")
  public Object addressCategory(
      @RequestParam String addressNo) {
    HashMap<String,Object> content = new HashMap<>();

    if (addressNo.equals("undefined")) {
      addressNo = "";
    }

    List<Address> list = addressService.addressList(addressNo);
    content.put("list", list);
    return content;
  }


  // 스터디 모집 선언요청처리
  @GetMapping("recruitapply")
  public Object recruitApply(
      @RequestParam int studyNo, boolean apply) {

    HashMap<String,Object> content = new HashMap<>();

    Study study = studyService.get(studyNo);

    if(!apply) {
      //모집 선언을 취소하는 것이라면, 모집 선언을 false로 하고 리턴한다.

      study.setRecruitApply(apply);
      studyService.update(study);

      content.put("status", "success");
      return content;

    } else {

      //스터디 제한인원이 다 차지 않았다면, 모집 선언을 true 로 한다.
      if(!studyService.checkFullCapacityByStudyNo(studyNo)) {

        study.setRecruitApply(apply);
        studyService.update(study);
        content.put("status", "success");

      } else {
        //스터디 제한인원이 다 차있다면,fail을 반환한다.
        content.put("status", "fail");

      }
      return content;
    }
  }


  //계속 모집상태를 매일 자동으로 업데이트 한다.
  @Scheduled(cron = "0 30 * * * *")
  public void rateLogSchedule() {

    //모집 상태 업데이트
    studyService.updateAllStudyRecruitState();

  }



}










