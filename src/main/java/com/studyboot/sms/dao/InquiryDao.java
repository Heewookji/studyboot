package com.studyboot.sms.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.studyboot.sms.domain.Inquiry;

public interface InquiryDao {
	int insert(Inquiry inquiry);
	List<Inquiry> findAll(Map<String,Object> params);
	List<Inquiry> searchByMemberNo(HashMap<String, Object> params);
	Inquiry findByNo(int no);
	int delete(int no);
	int countAll(int pageCls);
	int countAllByMemberNo(int memberNo);
	int findByKeyword(String keyword);
}







