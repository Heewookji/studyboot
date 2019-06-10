package com.studyboot.sms.service;

import java.util.List;
import java.util.Map;
import com.studyboot.sms.domain.History;
import com.studyboot.sms.domain.Study;
import com.studyboot.sms.domain.StudyMember;

public interface StudyMemberService {
  List<Study> findMyStudyList(int no);
  List<StudyMember> findStudyMember(int no);
  // 스터디 장인지 판단하는 Service , 코드 재활용을 위해 파라미터값 Map으로 해놓음
  boolean findStudyMemberLeader(Map<String, Object> map);
  int attendUpdate(Map<String, Object> map);
  StudyMember findMyStudyByNo(Map<String, Object> map);
  List<StudyMember> rateInfo(int no);
  List<History> userHistory(int no);
}

