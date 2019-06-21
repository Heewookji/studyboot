package com.studyboot.sms.service.impl;

import java.util.HashMap;
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

  public RateServiceImpl(RateDao rateDao, MemberDao memberDao) {
    this.rateDao = rateDao;
    this.memberDao = memberDao;
  }

  @Override
  public int updateRate(Map<String, Object> map) {

    // 최근에 들어온 점수를 가져온다.
    double rate = rateDao.findRate(map);

    System.out.println("최근에 넣은 점수: " + rate);

    // 해당 멤버의 평균 평점을 가져온다.
    double memRateAvg = (double) memberDao.findByNo((int) map.get("confirmMemberNo")).getRate();
    System.out.println("디비에 저장된 평균 평점: " + memRateAvg);

    // 최근 들어온 점수와 디비에 저장된 평균 값을 더하여 2로 나눈다.
    double avgSum = (rate + memRateAvg) / 2;
    System.out.println("합쳐서 나누기 2 한 값: " + avgSum);

    double rateAvgCut = (int)(avgSum*10)/10.0; // 소수점 한자리 까지 자른다.
    System.out.println("소수점 자른 값: " + rateAvgCut);
    
    Map<String, Object> rateAvgNo = new HashMap<>();
    rateAvgNo.put("rateAvg", rateAvgCut);
    rateAvgNo.put("no", (int) map.get("confirmMemberNo"));

    return memberDao.updateRate(rateAvgNo);
  }

  @Override
  public List<RateLog> list(int no) {
    return rateDao.findRateLog(no);
  }

  @Override
  public int addRateLog() {

    // 각 회원들의 현재 평점을 가져온다.
    List<Member> rateList = memberDao.findAllRate();
    int count = 0;

    for (Member m : rateList) {
      count += rateDao.insertRateLog(m); // 각 회원들의 평점을 db에 저장한다.
    }

    return count;
  }
}






