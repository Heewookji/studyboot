package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.Study;

public interface StudyService {
  
  List<Study> list(int pageNo, int pageSize);
  int add(Study study);
  Study get(int no);
  int update(Study study);
  int delete(int no);
  int size();
}
