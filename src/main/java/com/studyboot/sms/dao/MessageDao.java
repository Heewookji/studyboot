package com.studyboot.sms.dao;

import java.util.List;
import java.util.Map;
import com.studyboot.sms.domain.Message;

public interface MessageDao {
  List<Message> findAll(Map<String,Object> params);
  //  int insert(Inquiry inquiry);
  //  Inquiry findByNo(int no);
  //  int delete(int no);
  //  int countByClsAndMember(HashMap<String, Object> params);
  int countAll();
}







