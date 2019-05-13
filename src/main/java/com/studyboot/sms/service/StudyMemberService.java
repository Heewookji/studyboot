package com.studyboot.sms.service;

import java.util.List;
import java.util.Map;
import com.studyboot.sms.domain.MemberRate;
import com.studyboot.sms.domain.StudyMember;

public interface StudyMemberService {
  
  List<MemberRate> list(int studyNo);
  StudyMember findRate(Map<String, Object> rate);
  int updateRate(StudyMember studyMember);
  
}
