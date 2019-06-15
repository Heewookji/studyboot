package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.Study;

public interface StudyService {
  
  int add(Study study);
  Study get(int no);
  int updateRate(int no);
  int update(Study study);
  int delete(int no);
  int size(String clsNo, String addressNo, double rateValue, String keyword, List<Integer> dayNoList);
  int size(List<String> clsNo, String addressNo, double rateValue, String keyword, List<Integer> dayNoList);
  List<Study> list(int pageNo, int pageSize, String clsNo, String addressNo, double rateValue, String keyword, List<Integer> dayNoList);
  List<Study> list(int pageNo, int pageSize, List<String> clsNo, String addressNo, double rateValue, String keyword, List<Integer> dayNoList);
  boolean checkFullCapacityByStudyNo(int studyNo);
  void updateAllStudyRecruitState();
  Study getStudyPhoto(int no);
}
