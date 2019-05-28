package com.studyboot.sms.web.json;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.studyboot.sms.domain.Schedule;
import com.studyboot.sms.service.MyStudyScheduleService;

//@RestController("json/MyStudyCalendarController")
//@RequestMapping("/json/mystudycalendar")
@RestController("json/MyStudyScheduleController")
@RequestMapping("/json/mystudyschedule")
public class MyStudyScheduleController {

  @Autowired MyStudyScheduleService myStudyScheduleService;

  @PostMapping("add")
  public Object add(Schedule schedule) {
    System.out.println("컨트롤러: " + schedule);
    HashMap<String,Object> content = new HashMap<>();
    try {
      myStudyScheduleService.add(schedule);
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
    List<Schedule> schedule = myStudyScheduleService.list();


    System.out.println("컨트롤러 list: " + schedule);

    return schedule;
  }

  @GetMapping("detail")
  public Object detail(@RequestParam int no) {
    
    Schedule schedule = myStudyScheduleService.get(no);
    
    return schedule;
  }

}










