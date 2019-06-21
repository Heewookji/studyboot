package com.studyboot.sms.service;

import java.util.List;
import java.util.Map;
import com.studyboot.sms.domain.RateLog;

public interface RateService {
  
  int updateRate(Map<String, Object> map);
  List<RateLog> list(int no);
  int addRateLog();
}
