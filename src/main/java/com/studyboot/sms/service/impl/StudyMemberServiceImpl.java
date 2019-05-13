package com.studyboot.sms.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
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
  
  public StudyMemberServiceImpl(MemberRateDao memberRateDao, StudyMemberDao studyMemberDao) {
    this.memberRateDao = memberRateDao;
    this.studyMemberDao = studyMemberDao;
  }

  @Override
  public List<MemberRate> list(int studyNo) {
    List<MemberRate> rate = new ArrayList<>();
    
    
    
    return memberRateDao.findAll(studyNo);
  }

  @Override
  public StudyMember findRate(Map<String, Object> rate) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public int updateRate(StudyMember studyMember) {
    // TODO Auto-generated method stub
    return 0;
  }


  
}
