package com.studyboot.sms.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.MyStudyScheduleDao;
import com.studyboot.sms.domain.Schedule;
import com.studyboot.sms.service.MyStudyScheduleService;

@Service
public class MyStudyScheduleServiceImpl implements MyStudyScheduleService {

  MyStudyScheduleDao scheduleDao;

  public MyStudyScheduleServiceImpl(MyStudyScheduleDao myStudyScheduleDao) {
    this.scheduleDao = myStudyScheduleDao;
  }
  
  @Override
  public int add(Schedule schedule) {
    
    return scheduleDao.insert(schedule);
  }
  
  @Override
  public List<Schedule> list() {

    return scheduleDao.findAll();
  }
  
  @Override
  public Schedule get(int no) {
    return scheduleDao.findByNo(no);
  }
  
}







