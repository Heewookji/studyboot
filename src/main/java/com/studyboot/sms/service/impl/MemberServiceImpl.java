package com.studyboot.sms.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.studyboot.sms.dao.MemberDao;
import com.studyboot.sms.dao.StudyDao;
import com.studyboot.sms.domain.Member;
import com.studyboot.sms.domain.Study;
import com.studyboot.sms.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService {

  MemberDao memberDao;
  StudyDao studyDao;

  public MemberServiceImpl(
      MemberDao memberDao,
      StudyDao studyDao) {
    this.memberDao = memberDao;
    this.studyDao = studyDao;
  }


  @Override
  public int add(Member member) {

    return memberDao.insert(member);
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
  public Member get(String email) {
    return  memberDao.findByEmail(email);
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
    
    try {
    
      if (member.getPassword() != null) {
        return memberDao.updatePassword(member);
      }
      int count = memberDao.update(member);
      
      memberDao.clsDelete(member.getNo());
      
      if (member.getCls().size() != 0) {
        for (String c : member.getCls()) {
          Map<String,Object> clsData = new HashMap<>();
          clsData.put("no", member.getNo());
          clsData.put("cls", c);
          memberDao.clsInsert(clsData);
        }
      }
      return count;
      
    } catch (Exception e) {
      System.out.println("회원 정보 업데이트 도중 에러..!");
      return 0;
    }
    
  }
  
  @Override
  public int updatePhoto(Member member) {
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
  public List<Study> appliedStudyList(int no) {
    
    List<Study> list = studyDao.findAppliedStudyByUser(no);
    if (list.size() > 0) {
      return list;
    } else {
      return null;
    }
  }

  @Override
  public List<Study> pickedStudyList(int no) {
    List<Study> list = studyDao.findPickedStudyByUser(no);
    if (list.size() > 0) {
      return list;
    } else {
      return null;
    }
  }

  @Override
  public List<String> findMemberNoByNickNameList(String[] nickNames) {

  List<String> nickNameList = new ArrayList<String>();
    
    for(String nickName : nickNames) {
      nickNameList.add(nickName);
    }
    
    return memberDao.findMemberNoByNickNameList(nickNameList);
  }

  @Override
  public int findMemberNoByNickName(String nickName) {

      return memberDao.findMemberNoByNickName(nickName);
    }

  @Override
  public Member getFacebookMember(String token) {
    // Facebook의 Graph API 실행하기
    // => HTTP 요청을 할 때 스프링에서 제공하는 RestTemplate을 사용하라! 
    // 
    RestTemplate restTemplate = new RestTemplate();

    @SuppressWarnings("rawtypes")
    Map response = restTemplate.getForObject(
        "https://graph.facebook.com/me?fields=id,name&access_token="+ token, 
        Map.class);

    Member member = memberDao.findByEmail(response.get("id").toString());

    // 해당 회원을 현재 서버에서 찾았으면 그 정보를 리턴한다.
    if (member != null)
      return member;

    
    Member newbie = new Member();
    newbie.setEmail(response.get("id").toString());
    newbie.setName(response.get("name").toString());
    newbie.setNickName(UUID.randomUUID().toString().replace("-", "").substring(0, 10));

    memberDao.insert(newbie);

    return newbie;
  }


  @Override
  public Member getNaverMember(String token) {

    token = "Bearer " + token;
    RestTemplate restTemplate = new RestTemplate();
    HttpHeaders header = new HttpHeaders();
    header.add("Authorization", token );
    HttpEntity<String> requestEntity = new HttpEntity<>(null, header);

    ResponseEntity<Map> response = restTemplate.exchange("https://openapi.naver.com/v1/nid/me", 
        HttpMethod.GET, requestEntity, Map.class);

    Map result = (Map) response.getBody().get("response");

    Member member = memberDao.findByEmail(result.get("email").toString());

    // 해당 회원을 현재 서버에서 찾았으면 그 정보를 리턴한다.
    if (member != null)
      return member;

    Member newbie = new Member();
    newbie.setEmail(result.get("email").toString());
    newbie.setName(result.get("name").toString());
    newbie.setNickName(UUID.randomUUID().toString().replace("-", "").substring(0, 10));

    memberDao.insert(newbie);

    return newbie;
  }

  
  @Override
  public int withdrawal(int no) {
    
    Member member = new Member();

    member.setNo(no);
    member.setEmail(UUID.randomUUID().toString().replace("-", "").substring(0, 15));
    member.setNickName("Nick_" + UUID.randomUUID().toString().replace("-", "").substring(0, 6));
    member.setPassword(UUID.randomUUID().toString().replace("-", "").substring(0, 10));
    member.setName("탈퇴회원");
    member.setPhoto("defaultphoto");
    member.setWithdraw(true);
    
    return  memberDao.withdrawalUpdate(member);
  }

}







