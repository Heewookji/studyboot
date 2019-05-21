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

  @SuppressWarnings("unchecked")
  @GetMapping("list")
  public Object list() {
    
    List<Space> spaces = spaceService.list();

    HashMap<String,Object> content = new HashMap<>();
    
    //content.put("address", spaceService.spaceAddress(content));  
    //--> 이렇게 하면 앞단에서 열기 어려워서 수정함
    
    // ServiceImplement에서 상세주소와 풀네임 주소를 받아온 후 Map에 저장한다.
    Map<String, Object> addressMap = spaceService.spaceAddress(spaces);  
    
    // 45줄에서 저장한 값을 바로 get한 후 content에 다시 담는다.
//    content.put("fullName", addressMap.get("fullName"));
//    content.put("addressDetail", addressMap.get("addressDetail"));
    
    List<Address> fullAddressName = (List<Address>) addressMap.get("fullName");
    List<String> detailAddressName = (List<String>) addressMap.get("addressDetail");
    
    
    for(int i = 0; i < fullAddressName.size(); i++) {
      String largeName = fullAddressName.get(i).getLargeName();
      String mediumName = fullAddressName.get(i).getMediumName();
      String smallName = fullAddressName.get(i).getSmallName();
      
      String fullAddress = largeName + " " + mediumName + " " +smallName ;
      
      String completedAddress = fullAddress + detailAddressName.get(i);
      
      spaces.get(i).setCompletedAddress(completedAddress);
      
    }
    
    System.out.println(spaces);
    content.put("list", spaces);
    
    return content;
  }
  
}










