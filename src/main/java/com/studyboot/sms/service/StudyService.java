package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.Study;
import com.studyboot.sms.domain.StudyCls;

public interface StudyService {
  
  int add(Study study);
  Study get(int no);
  int updateRate(int no);
  int update(Study study);
  int delete(int no);
  int size();
  List<Study> list(int pageNo, int pageSize, String clsNo);
  List<StudyCls> clsList(String clsNo);
}
