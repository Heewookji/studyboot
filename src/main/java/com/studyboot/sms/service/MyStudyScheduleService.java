package com.studyboot.sms.service;

import java.util.List;
import java.util.Map;
import com.studyboot.sms.domain.Schedule;

public interface MyStudyScheduleService {
  
  int add(Schedule schedule);
  List<Object> list(int no);
  Schedule get(int no);
  int delete(int no);
  int update(Schedule schedule);
  int attend(Map<String, Object> attendMap);
}
