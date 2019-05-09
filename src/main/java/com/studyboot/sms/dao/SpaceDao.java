package com.studyboot.sms.dao;

import java.util.List;
import java.util.Map;
import com.studyboot.sms.domain.Space;

public interface SpaceDao {
//  int insert(Space space);
  List<Space> findAll(Map<String,Object> params);
//  Space findByNo(int no);
//  int increaseCount(int no);
//  int update(Space space);
//  int delete(int no);
//  int countAll();
}







