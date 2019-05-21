package com.studyboot.sms.service;

import java.util.List;

public interface MemberService {

	List<Integer> findMemberNoByKeyword(String keyword);
	List<Integer> findMemberNoMsg(String keyword);
	
}
