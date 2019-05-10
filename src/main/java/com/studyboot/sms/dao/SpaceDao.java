package com.studyboot.sms.dao;

import java.util.List;
import com.studyboot.sms.domain.Space;

public interface SpaceDao {
//  int insert(Space space);
  List<Space> findAll();
  Space findByNo(int no);
//  int update(Space space);
//  int delete(int no);
//  int countAll();
}







