package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.Study;

public interface StudyService {
  
  List<Study> listLarge(int pageNo, int pageSize, String clsNo);
  List<Study> listMedium(int pageNo, int pageSize, String clsNo);
  List<Study> listSmall(int pageNo, int pageSize, String clsNo);
  
  int add(Study study);
  Study get(int no);
  int updateRate(int no);
  int update(Study study);
  int delete(int no);
  int size();
}
