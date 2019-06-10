package com.studyboot.sms.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.MemberDao;
import com.studyboot.sms.dao.RateDao;
import com.studyboot.sms.domain.Member;
import com.studyboot.sms.domain.Rate;
import com.studyboot.sms.domain.RateLog;
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
    
    // std_id 와 member_id 를 맵 객체로 넘겨주고
    // sms_member_rate_info 테이블에 저장된 개체를 가져온다.
    List<Rate> rateList = rateDao.findAll(params);
    
    // 가져온 개체의 평점을 모두 더하고 평균 값을 구한다.
    for (Rate r : rateList) {
      totalRate += r.getRate();
    }
    totalRate /= rateList.size();

    // member_id 와 일치하는 회원을 꺼낸다.
    // 회원이 갖고 있던 현재 평점 데이터에 평균값을 더한 후 /2 해준다.
    // 회원을 다시 db에 업데이트 시킨다.
    Member member = memberDao.findByNo((int) params.get("no"));
    member.setRate((totalRate + member.getRate()) / 2);
    return memberDao.update(member);
  }
  
  @Override
  public List<RateLog> list(int no) {
    return rateDao.findRateLog(no);
  }
  
  @Override
  public int addRateLog() {
    
    List<Member> rateList = memberDao.findAllRate();
    int count = 0;
    
    for (Member m : rateList) {
      count = rateDao.insertRateLog(m);
    }
    
    return count;
  }
}






