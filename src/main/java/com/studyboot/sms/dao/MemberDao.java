package com.studyboot.sms.dao;

import java.util.HashMap;
import java.util.List;
import com.studyboot.sms.domain.Member;

public interface MemberDao {
	
	List<Integer> findByKeyword(HashMap<String, Object> keywordMap);
	Member findByNo(int no);
	int update(Member member);
	
	
}







