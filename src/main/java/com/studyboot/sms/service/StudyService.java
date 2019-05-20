package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.Study;
import com.studyboot.sms.domain.Cls;

public interface StudyService {
  
  int add(Study study);
  Study get(int no);
  int updateRate(int no);
  int update(Study study);
  int delete(int no);
  int size(String clsNo, String addressNo);
  List<Study> list(int pageNo, int pageSize, String clsNo, String addressNo);
}
