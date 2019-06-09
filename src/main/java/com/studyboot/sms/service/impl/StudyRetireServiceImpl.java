package com.studyboot.sms.service.impl;

import java.util.Map;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.RateDao;
import com.studyboot.sms.service.StudyRetireService;

@Service
public class StudyRetireServiceImpl implements StudyRetireService {

  RateDao rateDao;
  
  public StudyRetireServiceImpl(RateDao rateDao) {
    this.rateDao = rateDao;
  }
  
  @Override
  public int evaluationAdd(Map<String, Object> evaluationMap) {

    return rateDao.evaluationAdd(evaluationMap);
  }
  
  @Override
  public int rateRequire(Map<String, Object> rateRequireMap) {
    
    return rateDao.rateRequireUpdate(rateRequireMap);
  }
}
