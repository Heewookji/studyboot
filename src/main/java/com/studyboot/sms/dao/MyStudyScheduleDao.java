package com.studyboot.sms.dao;

import java.util.List;
import com.studyboot.sms.domain.Schedule;

public interface MyStudyScheduleDao {
  
  int insert(Schedule schedule);
  List<Schedule> findAll();
  Schedule findByNo(int no);
}







