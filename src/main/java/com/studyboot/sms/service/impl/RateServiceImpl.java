package com.studyboot.sms.service.impl;

import java.util.List;
import com.studyboot.sms.dao.RateDao;
import com.studyboot.sms.domain.Rate;
import com.studyboot.sms.service.RateService;

public class RateServiceImpl implements RateService {

  RateDao rateDao;
  
  public RateServiceImpl(RateDao rateDao) {
    this.rateDao = rateDao;
  }
  
  @Override
  public int updateRate(Rate rate) {
//    
//    List<Rate> rateList = rateDao.findAll();
//    double totalRate = 0;
//    
//    for (Rate r : rateList) {
//      totalRate += r.getRate();
//    }
//    totalRate /= rateList.size();
//    
//    
    return 0;
  }

}
