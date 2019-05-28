package com.studyboot.sms.web.json;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.studyboot.sms.domain.MyStudyCalendar;
import com.studyboot.sms.service.MyStudyCalendarService;

@RestController("json/MyStudyCalendarController")
@RequestMapping("/json/mystudycalendar")
public class MyStudyCalendarController {

  @Autowired MyStudyCalendarService myStudyCalendarService;
  
  @PostMapping("add")
  public Object add(MyStudyCalendar myStudyCalendar) {
    System.out.println("컨트롤러: " + myStudyCalendar);
    HashMap<String,Object> content = new HashMap<>();
    try {
      myStudyCalendarService.add(myStudyCalendar);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @GetMapping("list")
  public Object list() {
    
    // 데이터 베이스에서 공간에 대한 정보 리스트를 받아온다.
    List<MyStudyCalendar> myStudyCalendar = myStudyCalendarService.list();

    
    System.out.println(myStudyCalendar);
    
    return myStudyCalendar;
  }
}










