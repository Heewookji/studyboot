package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.StudyBoard;

public interface MyStudyService {

  // 스터디 게시판 관련 service
  List<StudyBoard> list(int pageNo, int pageSize, 
      int clsNo, List<Integer> memberNos, String keyword, int no);

  int size(int clsNo, List<Integer> memberNos, String keyword, int no);

  List<StudyBoard> ntcList(int no);
  StudyBoard get(int no);
  int add(StudyBoard studyBoard);
  int delete(int no);
  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  //  Study getStudy(int no);
}
