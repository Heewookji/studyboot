package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.AppliedStudy;
import com.studyboot.sms.domain.Member;

public interface MemberService {

  List<Integer> findMemberNoByKeyword(String keyword);
  List<Integer> findMemberNoMsg(String keyword);
  Member get(String email, String password);
  Member get(int no);
  int findByNickName(String nickName);
  int update(Member member);
  int nickNameCheck(String nickName);
  boolean passwordCheck(String email, String password);
  List<AppliedStudy> appliedStudyList(int no);
}
