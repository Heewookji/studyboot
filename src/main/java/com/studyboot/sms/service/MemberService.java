package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.Member;

public interface MemberService {

  List<Integer> findMemberNoByKeyword(String keyword);
  List<Integer> findMemberNoMsg(String keyword);
  Member get(String email, String password);
  Member get(int no);
  int findByNickName(String nickName);
  int update(Member member);
}
