package com.studyboot.sms.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.ScheduleDao;
import com.studyboot.sms.dao.StudyDao;
import com.studyboot.sms.dao.StudyMemberDao;
import com.studyboot.sms.domain.Schedule;
import com.studyboot.sms.service.MyStudyScheduleService;

@Service
public class MyStudyScheduleServiceImpl implements MyStudyScheduleService {

  ScheduleDao scheduleDao;
  StudyMemberDao studyMemberDao;
  StudyDao studyDao;

  public MyStudyScheduleServiceImpl(
      ScheduleDao scheduleDao, StudyMemberDao studyMemberDao, StudyDao studyDao) {
    this.scheduleDao = scheduleDao;
    this.studyMemberDao = studyMemberDao;
    this.studyDao = studyDao;
  }
  
  @Override
  public int add(Schedule schedule) {
    
    return scheduleDao.insert(schedule);
  }
  
  @Override
  public List<Object> list(int no) {
    
    return scheduleDao.findAll(no);
  }
  
  @Override
  public List<Schedule> allSchedules(int no) {
    
    HashMap<String,Object> params = new HashMap<>();
    List<Integer> studyNoList = studyMemberDao.findStudyNoByMemberNo(no);
    
    if (studyNoList == null || studyNoList.size() <= 0) {
      return null;
    }
    
    params.put("studyNoList", studyNoList);
    List<Schedule> list = scheduleDao.findAllByAllStudy(params);
    System.out.println(list);
    
   
    String[] colors = {"rgba(40, 155, 252,0.5)","rgba(255, 99, 132, 0.5)","rgba(166, 211, 56,0.5)",
        "rgba(75, 192, 192, 0.5)","rgba(153, 102, 255, 0.5)" };
    
    int colorIndex = 0;
    
    // 모든 스케줄 리스트에 스터디번호 별로 컬러를 삽입해준다.
    for (int i = 0; i < list.size(); i++) {
      
      // 5가지 컬러를 넘어가면 처음 컬러로 돌아간다.
      if (colorIndex >= colors.length) {
        colorIndex = 0;
      }
      
      for (int j = i; j < list.size(); j++) {
        
        // 스케줄의 스터디번호가 같으면 같은 컬러를 삽입해준다.
        if (list.get(i).getStudyNo() == list.get(j).getStudyNo()) {
          list.get(j).setColor(colors[colorIndex]);
          continue;
        }
        list.get(j).setColor(colors[++colorIndex]);
        i = j;
        break;
      }
    }
    return list;
  }
  
  @Override
  public Schedule get(int no) {
    Schedule schedule = scheduleDao.findByNo(no);
    schedule.setStudyName(studyDao.findByNo(schedule.getStudyNo()).getName());
    return schedule;
  }
  
  @Override
  public int delete(int no) {

    return scheduleDao.delete(no);
  }
  
  @Override
  public int update(Schedule schedule) {
   
    return scheduleDao.update(schedule);
  }
  
  @Override
  public int attend(Map<String, Object> attendMap) {

    return scheduleDao.attend(attendMap);
  }
  
  @Override
  public List<Schedule> attendTrueFalse(int scheduleNo) {
   
    return scheduleDao.attendTrueFalse(scheduleNo);
  }
  
  @Override
  public int allEventCount(int studyNo) {

    return scheduleDao.allEventCount(studyNo);
  }
  
  @Override
  public int studyAttendCount(Map<String, Object> map) {
    
    return scheduleDao.studyAttendCount(map);
  }
}







