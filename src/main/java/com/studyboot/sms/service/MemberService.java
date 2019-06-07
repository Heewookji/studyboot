package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.AppliedStudy;
import com.studyboot.sms.domain.EndRate;
import com.studyboot.sms.domain.Member;
import com.studyboot.sms.domain.Study;

public interface MemberService {
  
  Member getNaverMember(String token);
  Member getFacebookMember(String token);
  List<Integer> findMemberNoByKeyword(String keyword);
  List<Integer> findMemberNoMsg(String keyword);
  Member get(String email);
  Member get(String email, String password);
  Member get(int no);
  int findByNickName(String nickName);
  int update(Member member);
  int nickNameCheck(String nickName);
  boolean passwordCheck(String email, String password);
  List<AppliedStudy> appliedStudyList(int no);
  List<Study> pickedStudyList(int no);
  int add(Member member);
  List<String> findMemberNoByNickNameList(String[] nickNames);
  EndRate getEndRate(int no);
  
}
