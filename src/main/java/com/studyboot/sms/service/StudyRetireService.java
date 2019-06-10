package com.studyboot.sms.service;

import java.util.Map;
import com.studyboot.sms.domain.RateRequire;

public interface StudyRetireService {

  int evaluationAdd(Map<String, Object> evaluationMap);
  int rateRequire(Map<String, Object> rateRequireMap);
  RateRequire retireTrueOrFalse(Map<String, Object> map);
}
