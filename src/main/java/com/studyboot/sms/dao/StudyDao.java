package com.studyboot.sms.dao;

import java.util.List;
import java.util.Map;
import com.studyboot.sms.domain.Study;

public interface StudyDao {
  
  int insert(Study study);
  List<Study> findAll(Map<String,Object> param);
  Study findByNo(int no);
  //int increaseCount(int no);
  int update(Study study);
  int delete(int no);
  int countAll();
}
