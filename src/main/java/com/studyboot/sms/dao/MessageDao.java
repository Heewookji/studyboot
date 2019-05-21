package com.studyboot.sms.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.studyboot.sms.domain.Message;

public interface MessageDao {
  List<Message> findAll(Map<String,Object> params);
  List<Message> findAll2(Map<String,Object> params);
  //  int insert(Inquiry inquiry);
  Message findByNo(int no);
  int delete(int no);
  //  int countByClsAndMember(HashMap<String, Object> params);
  int countAll(HashMap<String, Object> params);
  int countAll2(HashMap<String, Object> params);
}







