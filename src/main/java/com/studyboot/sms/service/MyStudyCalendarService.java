package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.MyStudyCalendar;

public interface MyStudyCalendarService {
  
  int add(MyStudyCalendar myStudyCalendar);
  List<MyStudyCalendar> list();
}
