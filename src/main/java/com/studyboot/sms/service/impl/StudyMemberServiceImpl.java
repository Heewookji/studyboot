package com.studyboot.sms.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.MemberRateDao;
import com.studyboot.sms.dao.StudyMemberDao;
import com.studyboot.sms.domain.MemberRate;
import com.studyboot.sms.domain.StudyMember;
import com.studyboot.sms.service.StudyMemberService;

@Service
public class StudyMemberServiceImpl implements StudyMemberService {
  
  MemberRateDao memberRateDao;
  StudyMemberDao studyMemberDao;
  double averRate;
  
  public StudyMemberServiceImpl(MemberRateDao memberRateDao, StudyMemberDao studyMemberDao) {
    this.memberRateDao = memberRateDao;
    this.studyMemberDao = studyMemberDao;
  }

  @Override
  public List<MemberRate> list(int studyNo) {
    
    List<MemberRate> rateList = memberRateDao.findByStudy(studyNo);
    double totalRate = 0;
    
    for (MemberRate rate : rateList) {
      totalRate += rate.getRate();
    }
    averRate = totalRate / rateList.size();
    System.out.println("평균 평점 값: ====> " + averRate);
    
    return null;
  }

  @Override
  public int findRate(Map<String, Object> rate) {
    
    StudyMember studyMember = studyMemberDao.findRate(rate);
    studyMember.setAverRate(averRate);
    
    return studyMemberDao.updateRate(studyMember);
  }
  
}
