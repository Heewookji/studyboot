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

      //생성한 뒤에, 스터디 평점을 넣어준다.
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
    //studyService.updateRate(no);
    Study study = studyService.get(no);
    return study;
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

  // 테스트용
  @GetMapping("rate")
  public Object rate(int nom, int no) {

    HashMap<String,Object> params = new HashMap<>();
    params.put("no", nom);
    params.put("studyNo", no);

    rateService.updateRate(params);
    return params;
  }

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
      @RequestParam int no) {

    HashMap<String,Object> content = new HashMap<>();


    //모집 선언을 취소하는 것이라면, 모집 선언을 false로 하고 리턴한다.


    //먼저 스터디의 제한 인원이 꽉 차지 않았는지 확인한다.(스터디 멤버 리스트 사이즈와 스터디 테이블의 인원 수 비교)



    //인원이 다 차지 않았다면, 모집 선언을 true 로 한다.
    content.put("status", "success");


    //다 차있다면,fail을 반환한다.
    content.put("status", "fail");

    return content;
  }


  //계속 모집상태를 자동으로 업데이트 한다.
  @Scheduled(cron = "0 0 0 1 * *")
  public void rateLogSchedule() {

    //먼저 스터디의 인원이 다 찼는지 검사한다.

    studyService.checkCapacityByStudyNo(1);

    //--다 차있다면, 모집 상태와 모집 선언을 false로 변경하고 리턴.



    //--다 차지 않았다면, 모집 선언을 확인한다.


    //----모집 선언이 true라면 모집 상태를 true로 바꿔주고 리턴.




    //----모집 선언이 false이거나 null이라면, 스터디 활동시작일을 확인한다.



    //------스터디 활동 시작일이 지났다면, 모집 상태를 false 로 하고 리턴.

    //------스터디 활동 시작일이 지나지않았다면, 모집 상태를 true 로 하고 리턴.


  }



}










