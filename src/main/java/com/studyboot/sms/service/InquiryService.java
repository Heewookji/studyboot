package com.studyboot.sms.service;

import java.util.List;

import com.studyboot.sms.domain.Inquiry;

public interface InquiryService {
  int add(Inquiry inquiry);
  List<Inquiry> list(int pageNo, int pageSize);
  Inquiry get(int no);
  int delete(int no);
  int size();
}