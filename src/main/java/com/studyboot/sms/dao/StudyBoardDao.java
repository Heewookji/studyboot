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
  StudyBoard findByNo(int no);
  int delete(int no);

  // 스터디 넘버로 스터디 구성원 가져오기
  //  List<StudyMember> findStudyMembersByNo(int no);

  //int increaseCount(int no);
  //  int update(StudyMember studyMember);

  //  int countAll();
  //  List<Integer> findStudyNoByMemberNo(int no);
}
