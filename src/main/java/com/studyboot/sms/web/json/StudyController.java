package com.studyboot.sms.web.json;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.studyboot.sms.domain.Study;
import com.studyboot.sms.service.StudyService;


@RestController("json/StudyController")
@RequestMapping("/json/study")
public class StudyController {
  
  @Autowired StudyService studyService;
  
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
    Study study = studyService.get(no);
    return study;
  }
  
  @GetMapping("list")
  public Object list(
      @RequestParam(defaultValue = "1") int pageNo,
      @RequestParam(defaultValue = "3") int pageSize) {
    
    if (pageSize < 3 || pageSize > 8) {
      pageSize = 3;
    }
    
    int rowCount = studyService.size();
    int totalPage = rowCount / pageSize;
    
    if (rowCount % pageSize > 0) {
      totalPage++;
    }
    
    if (pageNo < 1) {
      pageNo = 1;
    } else if (pageNo > totalPage) {
      pageNo = totalPage;
    }
    
    List<Study> studys = studyService.list(pageNo, pageSize);
    HashMap<String,Object> content = new HashMap<>();
    content.put("list", studys);
    content.put("pageNo", pageNo);
    content.put("pageSize", pageSize);
    content.put("totalPage", totalPage);
    
    return content;
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
}










