package com.studyboot.sms.dao;

import java.util.Map;
import com.studyboot.sms.domain.RateRequire;

public interface RateRequireDao {
  int rateRequire (Map<String, Object> rateRequireMap);
  RateRequire retireTrueOrFalse (Map<String, Object> map);
}
