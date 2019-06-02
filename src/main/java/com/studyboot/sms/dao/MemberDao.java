package com.studyboot.sms.dao;

import java.util.HashMap;
import java.util.List;
import com.studyboot.sms.domain.Member;

public interface MemberDao {

  List<Integer> findByKeyword(HashMap<String, Object> keywordMap);
  List<Integer> findByKeywordMsg(HashMap<String, Object> keywordMap);
  Member findByEmailPassword(HashMap<String, Object> paramMap);
  Member findByNo(int no);
  Member findByEmail(String email);
  int findByNickName(String nickName);
  int update(Member member);
  int updatePassword(Member member);
  int insert(Member member);
}







