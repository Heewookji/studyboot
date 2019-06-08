package com.studyboot.sms.dao;

import java.util.List;
import java.util.Map;
import com.studyboot.sms.domain.Rate;
import com.studyboot.sms.domain.RateLog;

public interface RateDao {
  List<Rate> findAll(Map<String, Object> params);
  List<RateLog> findRateLog(int no);
}
