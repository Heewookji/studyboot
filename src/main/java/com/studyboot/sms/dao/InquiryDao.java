package com.studyboot.sms.dao;

import java.util.List;
import java.util.Map;

import com.studyboot.sms.domain.Inquiry;

public interface InquiryDao {
  int insert(Inquiry inquiry);
  List<Inquiry> findAll(Map<String,Object> params);
  Inquiry findByNo(int no);
  int delete(int no);
  int countAll();
}







