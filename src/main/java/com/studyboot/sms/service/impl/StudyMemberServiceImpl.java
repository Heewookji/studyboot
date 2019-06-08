package com.studyboot.sms.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.StudyDao;
import com.studyboot.sms.dao.StudyMemberDao;
import com.studyboot.sms.domain.Study;
import com.studyboot.sms.domain.StudyMember;
import com.studyboot.sms.service.StudyMemberService;

@Service
public class StudyMemberServiceImpl implements StudyMemberService {

  StudyMemberDao studyMemberDao;
  StudyDao studyDao;

  public StudyMemberServiceImpl(StudyMemberDao studyMemberDao,
      StudyDao studyDao) {
    this.studyMemberDao = studyMemberDao;
    this.studyDao = studyDao;
  }

  @Override
  public List<Study> findMyStudyList(int no) {
    
    List<Integer> list = studyMemberDao.findStudyNoByMemberNo(no);
    
    if(list.size() != 0) {
      return studyDao.findByNos(list);
    } else {
      return null;
    }
  }

  @Override
  public List<StudyMember> findStudyMember(int no) {
    
    List<StudyMember> memberList = studyMemberDao.findStudyMembersByNo(no);
    
    return memberList;
  }

  @Override
  public boolean findStudyMemberLeader(Map<String, Object> map) {

    return studyMemberDao.findStudyMemberLeaderByMap(map);
  }
  
  @Override
  public List<StudyMember> rateInfo(int no) {
    List<StudyMember> list = studyMemberDao.findRateInfoByMemberId(no);
    System.out.println(list);
    return list;
  }
  
}







