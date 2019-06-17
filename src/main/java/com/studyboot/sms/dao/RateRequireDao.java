package com.studyboot.sms.dao;

import java.util.List;
import java.util.Map;
import com.studyboot.sms.domain.RateRequire;

public interface RateRequireDao {
  int rateRequire (Map<String, Object> rateRequireMap); // 탈퇴자 추가
  List<RateRequire> retireTrueOrFalse (Map<String, Object> map);
  int evaluationMemberCount(int retireeMemberNo);
  int retireeEvaluationCount(Map<String, Object> map);
  int rateRequireUpdate(Map<String, Object> rateRequireMap);
}
