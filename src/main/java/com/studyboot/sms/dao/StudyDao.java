package com.studyboot.sms.dao;

import java.util.List;
import java.util.Map;
import com.studyboot.sms.domain.Study;

public interface StudyDao {
  
  int insert(Study study);
  List<Study> findAllByFilter(Map<String,Object> param);
  Study findByNo(int no);
  //int increaseCount(int no);
  int update(Study study);
  int delete(int no);
  int countAll();
}
