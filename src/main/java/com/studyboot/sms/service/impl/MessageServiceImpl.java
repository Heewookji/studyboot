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
  public List<Message> list(int pageNo, int pageSize, 
      List<Integer> memberNos, int loginNo) {

    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    params.put("member_ids", memberNos);
    params.put("userNo", loginNo);

    return messageDao.findAll(params);
  }

  @Override
  public List<Message> list2(int pageNo, int pageSize, 
      List<Integer> memberNos, int loginNo) {

    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    params.put("member_ids", memberNos);
    params.put("userNo", loginNo);

    return messageDao.findAll2(params);
  }

  @Override
  public int size(List<Integer> memberNos, int loginNo) {
    
    HashMap<String,Object> params = new HashMap<>();
    params.put("member_ids", memberNos);
    params.put("userNo", loginNo);

    int count = messageDao.countAll(params);
    return count;
  }
  
  @Override
  public int size2(List<Integer> memberNos, int loginNo) {
    
    HashMap<String,Object> params = new HashMap<>();
    params.put("member_ids", memberNos);
    params.put("userNo", loginNo);

    int count = messageDao.countAll2(params);
    return count;
  }

  @Override
  public Message get(int no) {
    return messageDao.findByNo(no);
  }
  
  @Override
  public int delete(int no) {
    return messageDao.delete(no);
  }
  
  @Override
  public int add(Message message) {
    return messageDao.insert(message);
  }

}







