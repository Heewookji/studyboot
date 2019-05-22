package com.studyboot.sms.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.studyboot.sms.dao.MemberDao;
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
  public int findById(String nickName) {
    
    return memberDao.findById(nickName);
  }
}







