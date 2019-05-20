package com.studyboot.sms.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.MessageDao;
import com.studyboot.sms.domain.Message;
import com.studyboot.sms.service.MessageService;

@Service
public class MessageServiceImpl implements MessageService {

  MessageDao messageDao;

  public MessageServiceImpl(MessageDao messageDao) {
    this.messageDao = messageDao;
  }

  @Override
  public List<Message> list(int pageNo, int pageSize) {

    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);

    return messageDao.findAll(params);
  }

  @Override
  public List<Message> list2(int pageNo, int pageSize) {

    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);

    return messageDao.findAll2(params);
  }

  @Override
  public int size() {
    return messageDao.countAll();
//    
//    HashMap<String,Object> params = new HashMap<>();
//    params.put("member_ids", memberNos);
//
//    int count = messageDao.countByClsAndMember(params);
//    return count;
  }
  
  @Override
  public int size2() {
    return messageDao.countAll2();
//    
//    HashMap<String,Object> params = new HashMap<>();
//    params.put("member_ids", memberNos);
//
//    int count = messageDao.countByClsAndMember(params);
//    return count;
  }

  @Override
  public Message get(int no) {
    return messageDao.findByNo(no);
  }
  
  @Override
  public int delete(int no) {
    return messageDao.delete(no);
  }
  
/*
  @Override
  public int add(Inquiry inquiry) {
    return inquiryDao.insert(inquiry);
  }

  @Override
  public int size(int clsNo, List<Integer> memberNos) {
    
    HashMap<String,Object> params = new HashMap<>();
    params.put("cls", clsNo);
    params.put("member_ids", memberNos);

    int count = inquiryDao.countByClsAndMember(params);
    return count;
  }
*/



}







