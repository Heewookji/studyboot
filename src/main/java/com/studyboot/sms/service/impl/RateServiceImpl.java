package com.studyboot.sms.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.MemberDao;
import com.studyboot.sms.dao.RateDao;
import com.studyboot.sms.domain.Member;
import com.studyboot.sms.domain.Rate;
import com.studyboot.sms.service.RateService;

@Service
public class RateServiceImpl implements RateService {

  RateDao rateDao;
  MemberDao memberDao;
  double totalRate = 0;
  
  public RateServiceImpl(RateDao rateDao, MemberDao memberDao) {
    this.rateDao = rateDao;
    this.memberDao = memberDao;
  }
  
  @Override
  public int updateRate(Map<String, Object> params) {

    List<Rate> rateList = rateDao.findAll(params);
    
    for (Rate r : rateList) {
      totalRate += r.getRate();
    }
    totalRate /= rateList.size();

    Member member = memberDao.findByNo((int) params.get("no"));
    member.setRate((totalRate + member.getRate()) / 2);
    return memberDao.updateRate(member);
  }
}
