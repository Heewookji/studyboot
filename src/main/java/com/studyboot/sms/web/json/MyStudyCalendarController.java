package com.studyboot.sms.web.json;

import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
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

}










