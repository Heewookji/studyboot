package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.Space;

public interface SpaceService {
  List<Space> list();
  Space detail(int no);
  void spaceAddress(List<Space> map);
}
