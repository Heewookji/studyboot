package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.Space;

public interface SpaceService {
  List<Space> list();
  int add(Space space);
  Space get(int no);
  int update(Space board);
  int delete(int no);
  int size();
}
