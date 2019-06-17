package com.studyboot.sms.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.RateDao;
import com.studyboot.sms.dao.RateRequireDao;
import com.studyboot.sms.domain.Rate;
import com.studyboot.sms.domain.RateRequire;
import com.studyboot.sms.service.StudyRetireService;

@Service
public class StudyRetireServiceImpl implements StudyRetireService {

  RateDao rateDao;
  RateRequireDao rateRequireDao;
  
  public StudyRetireServiceImpl(RateDao rateDao, RateRequireDao rateRequireDao) {
    this.rateDao = rateDao;
    this.rateRequireDao = rateRequireDao;
  }
  
  @Override
  public int evaluationAdd(Map<String, Object> evaluationMap) {

    return rateDao.evaluationAdd(evaluationMap);
  }
  
  @Override
  public int rateRequire(Map<String, Object> rateRequireMap) {
    
    return rateRequireDao.rateRequire(rateRequireMap);
  }
  
  @Override
  public List<RateRequire> retireTrueOrFalse(Map<String, Object> map) {

    return rateRequireDao.retireTrueOrFalse(map);
  }
  
  @Override
  public List<Rate> retireEvaluation(Map<String, Object> map) {
   
    return rateDao.findAll(map);
  }
  
  @Override
  public RateRequire retireEvaluationWait(Map<String, Object> map) { // 삭제하기

    return rateRequireDao.retireEvaluationWait(map);
  }
  
  @Override
  public int evaluationMemberCount(int retireeMemberNo) {

    return rateRequireDao.evaluationMemberCount(retireeMemberNo);
  }
  
  @Override
  public int retireeEvaluationCount(Map<String, Object> retireeEcaluationCountMap) {
   
    return rateRequireDao.retireeEvaluationCount(retireeEcaluationCountMap);
  }
  
  @Override
  public int rateRequireUpdate(Map<String, Object> map) {
   
    return rateRequireDao.rateRequireUpdate(map);
  }
}
