package com.studyboot.sms.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.AppliedStudyDao;
import com.studyboot.sms.dao.MemberDao;
import com.studyboot.sms.dao.StudyDao;
import com.studyboot.sms.domain.AppliedStudy;
import com.studyboot.sms.domain.Member;
import com.studyboot.sms.domain.Study;
import com.studyboot.sms.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService {

  MemberDao memberDao;
  AppliedStudyDao appliedStudyDao;
  StudyDao studyDao;

  public MemberServiceImpl(
      MemberDao memberDao,
      AppliedStudyDao appliedStudyDao,
      StudyDao studyDao) {
    this.memberDao = memberDao;
    this.appliedStudyDao = appliedStudyDao;
    this.studyDao = studyDao;
  }

  @Override
  public List<Integer> findMemberNoByKeyword(String keyword) {

    HashMap<String,Object> keywordMap = new HashMap<>();
    keywordMap.put("keyword", keyword);

    return memberDao.findByKeyword(keywordMap);

  }

  @Override
  public List<Integer> findMemberNoMsg(String keyword) {

    HashMap<String,Object> keywordMap = new HashMap<>();
    keywordMap.put("keyword", keyword);

    return memberDao.findByKeywordMsg(keywordMap);

  }
  
  @Override
  public Member get(String email, String password) {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("email", email);
    paramMap.put("password", password);
    return memberDao.findByEmailPassword(paramMap);
  }

  @Override
  public Member get(int no) {
    return memberDao.findByNo(no);
  }
  
  @Override
  public int findByNickName(String nickName) {
    return memberDao.findByNickName(nickName);
  }
  
  @Override
  public int update(Member member) {
    
    if (member.getPassword() != null) {
      return memberDao.updatePassword(member);
    }
    return memberDao.update(member);
  }

  @Override
  public int nickNameCheck(String nickName) {
    try {
      return memberDao.findByNickName(nickName);
      
    } catch(Exception e) {
      return 0;
    }
  }

  @Override
  public boolean passwordCheck(String email, String password) {
    
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("email", email);
    paramMap.put("password", password);
    Member member = memberDao.findByEmailPassword(paramMap);
    
    return member != null ? true : false;
  }
  
  @Override
  public List<AppliedStudy> appliedStudyList(int no) {
    return appliedStudyDao.findAllByUser(no);
  }
  
  @Override
  public List<Study> pickedStudyList(int no) {
    return studyDao.findPickedStudyByUser(no);
  }
  
}







