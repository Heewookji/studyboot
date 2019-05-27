package com.studyboot.sms.web.json;

import java.sql.Date;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.studyboot.sms.domain.Event;


@RestController("json/ScheduleController")
@RequestMapping("/json/schedule")
public class ScheduleController {

  

  @GetMapping("list")
  public Object list() {
    
    Event event = new Event();
    
    event.setId("1111");
    event.setStart(Date.valueOf("2019-05-13"));
    event.setEnd(Date.valueOf("2019-05-23"));
    event.setTitle("test!");
    
    String data ="{\"id\":\"11\",\"title\":\"test!\",\"start\":\"2019-05-15\",\"end\":\"2019-05-20\"}";

    
    return data;
  }


  
}










