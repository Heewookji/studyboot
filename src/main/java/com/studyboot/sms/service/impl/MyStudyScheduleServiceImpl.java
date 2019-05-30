package com.studyboot.sms.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.ScheduleDao;
import com.studyboot.sms.domain.Schedule;
import com.studyboot.sms.service.MyStudyScheduleService;

@Service
public class MyStudyScheduleServiceImpl implements MyStudyScheduleService {

  ScheduleDao scheduleDao;

  public MyStudyScheduleServiceImpl(ScheduleDao scheduleDao) {
    this.scheduleDao = scheduleDao;
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
  
  @Override
  public int delete(int no) {

    return scheduleDao.delete(no);
  }
  
  @Override
  public int update(Schedule schedule) {
   
    return scheduleDao.update(schedule);
  }
}







