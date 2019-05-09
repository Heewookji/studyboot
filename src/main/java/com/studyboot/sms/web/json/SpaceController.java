package com.studyboot.sms.web.json;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.studyboot.sms.domain.Space;
import com.studyboot.sms.service.SpaceService;


@RestController("json/SpaceController")
@RequestMapping("/json/space")
public class SpaceController {
  
  @Autowired SpaceService spaceService;
  /*
  @PostMapping("add")
  public Object add(Space space) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      spaceService.add(space);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  @GetMapping("delete")
  public Object delete(int no) {
  
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (spaceService.delete(no) == 0) 
        throw new RuntimeException("해당 번호의 공간이 없습니다.");
      content.put("status", "success");
      
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  @GetMapping("detail")
  public Object detail(int no) {
    Space space = spaceService.get(no);
    return space;
  }
  */
  @GetMapping("list")
  public Object list() {
    
    List<Space> spaces = spaceService.list();
    
    HashMap<String,Object> content = new HashMap<>();
    content.put("list", spaces);
    
    return content;
  }
  /*
  @PostMapping("update")
  public Object update(Space space) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (spaceService.update(space) == 0) 
        throw new RuntimeException("해당 번호의 공간이 없습니다.");
      content.put("status", "success");
      
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  */
}










