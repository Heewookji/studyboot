package com.studyboot.sms.dao;

import java.util.List;
import com.studyboot.sms.domain.MyStudyCalendar;

public interface MyStudyCalendarDao {
  
  int insert(MyStudyCalendar myStudyCalendar);
  List<MyStudyCalendar> findAll();
}







