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
  public int updateRate(int no) {

    List<Rate> rateList = rateDao.findRate(no);

    double totalRate = 0;
    System.out.println("탈퇴평가리스트: " + rateList);

    // 가져온 점수의 평점을 모두 더하고 평균 값을 구한다.
    for (Rate r : rateList) {
      System.out.println("점수: " + r.getRate());
      totalRate += (double) r.getRate();
    }
    System.out.println("총점: " + totalRate);


    double rateAvg = (double) (totalRate / rateList.size());
    System.out.println("총점 평균: " + rateAvg);

    // 해당 멤버의 평균 평점을 가져온다.
    double memRateAvg = (double) memberDao.findByNo(no).getRate();
    System.out.println("디비에 저장된 평균 평점: " + memRateAvg);
    
    
    // 총 점수와 , 평균 평점을 더해 나누기 2를 한다. (조금 더 신뢰성 있는 평점을 위해) 
    // (평가를 많이 받지 않은 회원이 평균 점수에 영향을 많이 줄 수 있어서)
    double avgSum = (rateAvg + memRateAvg) / 2;
    System.out.println("합쳐서 나누기 2 한 값: " + avgSum);

    double rateAvgCut = (Math.round((avgSum)*10)/10.0); // 소수점 한자리 까지 자른다.
    System.out.println("소수점 자른 값: " + rateAvgCut);
    
    Map<String, Object> map = new HashMap<>();
    map.put("rateAvg", rateAvgCut);
    map.put("no", no);


    return memberDao.updateRate(map);
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






