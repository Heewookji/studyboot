package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.Message;

public interface MessageService {
  List<Message> list(int pageNo, int pageSize);
  List<Message> list2(int pageNo, int pageSize);
  //  int add(Inquiry inquiry);
  Message get(int no);
  int delete(int no);
  int size();
  int size2();
}
