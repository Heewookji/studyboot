package com.studyboot.sms.dao;

import java.util.HashMap;
import java.util.List;

public interface StudyMemberDao {
	
	List<Integer> findByKeyword(HashMap<String, Object> keywordMap);
}







