package com.studyboot.sms.service.impl;

import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.MyStudyCalendarDao;
import com.studyboot.sms.domain.MyStudyCalendar;
import com.studyboot.sms.service.MyStudyCalendarService;

@Service
public class MyStudyCalendarServiceImpl implements MyStudyCalendarService {

  MyStudyCalendarDao myStudyCalendarDao;

  @Override
  public int add(MyStudyCalendar myStudyCalendar) {
    
    return myStudyCalendarDao.insert(myStudyCalendar);
  }
  
}







