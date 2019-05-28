package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.Schedule;

public interface MyStudyScheduleService {
  
  int add(Schedule schedule);
  List<Schedule> list();
  Schedule get(int no);
}
