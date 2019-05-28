package com.studyboot.sms.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.MyStudyCalendarDao;
import com.studyboot.sms.domain.MyStudyCalendar;
import com.studyboot.sms.service.MyStudyCalendarService;

@Service
public class MyStudyCalendarServiceImpl implements MyStudyCalendarService {

  MyStudyCalendarDao myStudyCalendarDao;

  public MyStudyCalendarServiceImpl(MyStudyCalendarDao myStudyCalendarDao) {
    this.myStudyCalendarDao = myStudyCalendarDao;
  }
  
  @Override
  public int add(MyStudyCalendar myStudyCalendar) {
    
    return myStudyCalendarDao.insert(myStudyCalendar);
  }
  
  @Override
  public List<MyStudyCalendar> list() {

    return myStudyCalendarDao.findAll();
  }
  
}







