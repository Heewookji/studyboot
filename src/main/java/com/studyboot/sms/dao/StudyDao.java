package com.studyboot.sms.dao;

import java.util.List;
import java.util.Map;
import com.studyboot.sms.domain.Study;

public interface StudyDao {
  
  int insert(Study study);
  Study findByNo(int no);
  //int increaseCount(int no);
  int update(Study study);
  int delete(int no);
  int countAll(Map<String, Object> params);
  List<Study> findAll(Map<String, Object> params);
  List<Study> findAllByLargeFilter(Map<String, Object> params);
  List<Study> findAllByMediumFilter(Map<String, Object> params);
  List<Study> findAllBySmallFilter(Map<String, Object> params);
}
