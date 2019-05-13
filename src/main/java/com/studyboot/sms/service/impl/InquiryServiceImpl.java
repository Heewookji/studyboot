package com.studyboot.sms.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.studyboot.sms.dao.InquiryDao;
import com.studyboot.sms.domain.Inquiry;
import com.studyboot.sms.service.InquiryService;

@Service
public class InquiryServiceImpl implements InquiryService {

  InquiryDao inquiryDao;

  public InquiryServiceImpl(InquiryDao inquiryDao) {
    this.inquiryDao = inquiryDao;
  }

  @Override
  public List<Inquiry> list(int pageNo, int pageSize, int clsNo, List<Integer> memberNos) {

    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    params.put("cls", clsNo);
    params.put("member_ids", memberNos);

    List<Inquiry> list = inquiryDao.findAll(params);

    return list;
  }


  @Override
  public int add(Inquiry inquiry) {
    return inquiryDao.insert(inquiry);
  }

  @Override
  public Inquiry get(int no) {
    return inquiryDao.findByNo(no);
  }

  @Override
  public int delete(int no) {
    return inquiryDao.delete(no);
  }

  @Override
  public int size(int clsNo, List<Integer> memberNos) {
    
    HashMap<String,Object> params = new HashMap<>();
    params.put("cls", clsNo);
    params.put("member_ids", memberNos);

    int count = inquiryDao.countByClsAndMember(params);
    return count;
  }




}







