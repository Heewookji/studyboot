package com.studyboot.sms.dao;

import java.util.List;
import java.util.Map;
import com.studyboot.sms.domain.Rate;
import com.studyboot.sms.domain.RateLog;

public interface RateDao {
  List<Rate> findAll(Map<String, Object> params);
  int evaluationAdd(Map<String, Object> evaluationMap);
<<<<<<< HEAD
  int rateRequireUpdate(Map<String, Object> rateRequireMap);
=======
  List<RateLog> findRateLog(int no);
>>>>>>> e9ddbeaaac532c19a22d2a1fc6c5b498c8b64445
}
