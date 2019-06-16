package com.studyboot.sms.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.studyboot.sms.domain.StudyBoard;

public interface StudyBoardDao {

  List<StudyBoard> findAll(Map<String,Object> params);
  int countByClsAndMember(HashMap<String, Object> params);
  List<StudyBoard> findNtc(int no);
  int insert(StudyBoard studyBoard);
  int update(StudyBoard studyBoard);
  StudyBoard findByNo(int no);
  int delete(int no);
  int increaseCount(int no);
}
