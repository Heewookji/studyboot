package com.studyboot.sms.dao;

import java.util.Map;
import com.studyboot.sms.domain.StudyMember;

public interface StudyMemberDao {
	
  StudyMember findRate(Map<String, Object> rate);
  int updateRate(StudyMember studyMember);
}







