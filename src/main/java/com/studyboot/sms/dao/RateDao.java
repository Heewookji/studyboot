package com.studyboot.sms.dao;

import java.util.List;
import java.util.Map;
import com.studyboot.sms.domain.Member;
import com.studyboot.sms.domain.Rate;
import com.studyboot.sms.domain.RateLog;

public interface RateDao {
  List<Rate> findAll(Map<String, Object> params);
  List<Rate> findRate(int no); // 멤버 아이디로 해당 멤버 평점을 가져옴
  int evaluationAdd(Map<String, Object> evaluationMap);
//  int rateRequireUpdate(Map<String, Object> rateRequireMap);
  List<RateLog> findRateLog(int no);
  int insertRateLog(Member member);
}
