package com.studyboot.sms.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.studyboot.sms.dao.MemberDao;
import com.studyboot.sms.domain.Member;
import com.studyboot.sms.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService {

  MemberDao memberDao;

  public MemberServiceImpl(MemberDao memberDao) {
    this.memberDao = memberDao;
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
    return memberDao.update(member);
  }

}







