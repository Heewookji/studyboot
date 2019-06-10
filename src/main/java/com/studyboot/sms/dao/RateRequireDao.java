package com.studyboot.sms.dao;

import java.util.List;
import java.util.Map;
import com.studyboot.sms.domain.RateRequire;

public interface RateRequireDao {
  int rateRequire (Map<String, Object> rateRequireMap);
  List<RateRequire> retireTrueOrFalse (Map<String, Object> map);
  RateRequire retireEvaluationWait(Map<String, Object> map);
}
