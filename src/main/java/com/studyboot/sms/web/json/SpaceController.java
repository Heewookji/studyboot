package com.studyboot.sms.web.json;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
    
    // 데이터 베이스에서 공간에 대한 정보 리스트를 받아온다.
    List<Space> spaces = spaceService.list();

    // index.html에 보내기 위한 content를 만든다.
    HashMap<String,Object> content = new HashMap<>();
    
    // serviceImplement에 정보 목록을 넣어주며 호출한다.
    //Space의 변수 completedAddress에 완성된 값을 담는 역할을 한다.
    spaceService.spaceAddress(spaces);  
    
    content.put("list", spaces);
    
    System.out.println(spaces);
    return content;
  }
  
}










