package com.studyboot.sms.dao;

import java.util.List;
import java.util.Map;
import com.studyboot.sms.domain.StudyMember;

public interface StudyMemberDao {
  
  int insert(StudyMember studyMember);
  List<StudyMember> findAll();
  
  // 스터디 넘버로 스터디 구성원 가져오기
  List<StudyMember> findStudyMembersByNo(int no);
  
  StudyMember findByNo(int no);
  //int increaseCount(int no);
  int update(StudyMember studyMember);
  int delete(int no);
  int countAll();
  List<Integer> findStudyNoByMemberNo(int no);
  boolean findStudyMemberLeaderByMap(Map<String, Object> map);
  
  List<StudyMember> findRateInfoByMemberId(int no);
}
