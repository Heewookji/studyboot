package com.studyboot.sms.web.json;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.studyboot.sms.domain.Address;
import com.studyboot.sms.domain.Cls;
import com.studyboot.sms.domain.Study;
import com.studyboot.sms.service.AddressService;
import com.studyboot.sms.service.ClsService;
import com.studyboot.sms.service.RateService;
import com.studyboot.sms.service.StudyService;


@RestController("json/StudyController")
@RequestMapping("/json/study")
public class StudyController {

  @Autowired StudyService studyService;
  @Autowired ClsService clsService;
  @Autowired RateService rateService;
  @Autowired AddressService addressService;

  @PostMapping("add")
  public Object add(Study study) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      studyService.add(study);
      content.put("status", "success");
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
      @RequestParam String keyword) {
    
    // 페이지 사이즈
    if (pageSize < 3 || pageSize > 8) {
      pageSize = 3;
    }

    if (addressNo.equals("undefined")) {
      addressNo = "";
    }
    if (clsNo.size() == 0) {
      clsNo = null;
    }

    HashMap<String,Object> content = new HashMap<>();

    // clsNo와 일치하는 스터디 개수를 불러온다.
    int rowCount = studyService.size(clsNo, addressNo, rateValue, keyword);
    
    System.out.println(rowCount);
    
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
        pageNo, pageSize, clsNo, addressNo, rateValue, keyword);

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
      @RequestParam String keyword) {

    // 페이지 사이즈
    if (pageSize < 3 || pageSize > 8) {
      pageSize = 3;
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

    HashMap<String,Object> content = new HashMap<>();

    // clsNo와 일치하는 스터디 개수를 불러온다.
    int rowCount = studyService.size(clsNo, addressNo, rateValue, keyword);
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
        pageNo, pageSize, clsNo, addressNo, rateValue, keyword);

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

    if (addressNo.equals("undefined")) {
      addressNo = "";
    }
    HashMap<String,Object> content = new HashMap<>();
    List<Address> list = addressService.addressList(addressNo);
    content.put("list", list);
    return content;
  }

  @GetMapping("studyphoto")
  public Object getStudy(int no) {
    //studyService.updateRate(no);
    Study study = studyService.getStudy(no);
    return study;
  }
  
}










