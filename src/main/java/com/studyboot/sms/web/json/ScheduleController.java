package com.studyboot.sms.web.json;

import java.util.ArrayList;
import java.util.List;
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
    event.setStart("2019-05-13T00:00:00");
    event.setEnd("2019-05-23T00:00:00");
    event.setTitle("test!");

    Event event2 = new Event();

    event2.setId("1111");
    event2.setStart("2019-05-23T00:00:00");
    event2.setEnd("2019-05-26T00:00:00");
    event2.setTitle("test!");
    
    List<Event> events = new ArrayList<>();
    events.add(event);
    events.add(event2);



    return events;
  }



}










