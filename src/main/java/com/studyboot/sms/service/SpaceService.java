package com.studyboot.sms.service;

import java.util.List;
import java.util.Map;
import com.studyboot.sms.domain.Space;

public interface SpaceService {
  List<Space> list();
  Space detail(int no);
  Map<String, Object> spaceAddress(List<Space> map);
}
