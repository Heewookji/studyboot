package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.RateLog;

public interface RateService {
  
  int updateRate(int no);
  List<RateLog> list(int no);
  int addRateLog();
}
