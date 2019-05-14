package com.studyboot.sms.service;

import java.util.List;
import java.util.Map;
import com.studyboot.sms.domain.MemberRate;

public interface StudyMemberService {
  
  List<MemberRate> list(int studyNo);
  int findRate(Map<String, Object> rate);
}
