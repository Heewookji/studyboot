package com.studyboot.sms.web.json;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.studyboot.sms.domain.Address;
import com.studyboot.sms.domain.Space;
import com.studyboot.sms.service.SpaceService;


@RestController("json/SpaceController")
@RequestMapping("/json/space")
public class SpaceController {
  
  @Autowired SpaceService spaceService;
  
  @GetMapping("detail")
  public Object detail(
      @RequestParam int no) {
    
    HashMap<String,Object> content = new HashMap<>();
    
    Space spaceInfo = spaceService.detail(no);
    
    content.put("detail", spaceInfo);
    
    return content;
  }

  @GetMapping("list")
  public Object list() {
    
    List<Space> spaces = spaceService.list();

    HashMap<String,Object> content = new HashMap<>();
    content.put("list", spaces);
   
    //content.put("address", spaceService.spaceAddress(content));  
    //--> 이렇게 하면 앞단에서 열기 어려워서 수정함
    
    // ServiceImplement에서 상세주소와 풀네임 주소를 받아온 후 Map에 저장한다.
    Map<String, Object> addressMap = spaceService.spaceAddress(content);  
    
    // 45줄에서 저장한 값을 바로 get한 후 content에 다시 담는다.
    content.put("fullName", addressMap.get("fullName"));
    content.put("addressDetail", addressMap.get("addressDetail"));
    
    System.out.println(content);
    
    return content;
  }

  /*
  @PostMapping("add")
  public Object add(SpaceReview spaceReview) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      spaceService.addReview(spaceReview);
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










