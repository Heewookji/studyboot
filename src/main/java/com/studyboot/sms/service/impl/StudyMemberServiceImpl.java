package com.studyboot.sms.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.StudyDao;
import com.studyboot.sms.dao.StudyMemberDao;
import com.studyboot.sms.domain.History;
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
  public int addStudyMember(int studyNo, int memberNo, boolean leader) {
    Map<String,Object> params = new HashMap<>();
    
    params.put("studyNo", studyNo);
    params.put("memberNo", memberNo);
    params.put("leader", leader);
    
    return studyMemberDao.add(params);
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
  public int attendUpdate(Map<String, Object> map) {
    return studyMemberDao.attendUpdate(map);
  };
  
  public List<StudyMember> rateInfo(int no) {
    List<StudyMember> list = studyMemberDao.findRateInfoByMemberId(no);
    System.out.println(list);
    return list;
  }
  
  @Override
  public StudyMember findMyStudyByNo(Map<String, Object> map) {

    return studyMemberDao.findMyStudyByNo(map);
  }
  
  @Override
  public List<History> userHistory(int no, int pageNo, int pageSize) {
    Map<String,Object> params = new HashMap<>();
    params.put("memberNo", no);
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    
    return studyMemberDao.findHistoryByMemberId(params);
  }
  
  @Override
  public int sizeEndStudy(int no) {
    return studyMemberDao.countEndStudyByMemberNo(no);
  }
  
  @Override
  public int attendPercentUpdate(Map<String, Object> map) {
   
    return studyMemberDao.attendPercentUpdate(map);
  }
  
}







