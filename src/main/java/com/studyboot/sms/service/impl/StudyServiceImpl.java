package com.studyboot.sms.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.AddressDao;
import com.studyboot.sms.dao.StudyDao;
import com.studyboot.sms.dao.StudyMemberDao;
import com.studyboot.sms.domain.Study;
import com.studyboot.sms.domain.StudyMember;
import com.studyboot.sms.service.StudyService;

@Service
public class StudyServiceImpl implements StudyService {
  
  StudyDao studyDao;
  StudyMemberDao studyMemberDao;
  AddressDao addressDao;
  
  public StudyServiceImpl(
      StudyDao studyDao,
      StudyMemberDao studyMemberDao,
      AddressDao addressDao) {
    
    this.studyDao = studyDao;
    this.studyMemberDao = studyMemberDao;
    this.addressDao = addressDao;
  }
  
  @Override
  public List<Study> list(
      int pageNo, int pageSize, String clsNo, String addressNo) {
    
    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    params.put("clsNo", clsNo);
    params.put("addressNo", addressNo);
    params.put("addressNoSize", addressNo.length());
    
    List<Study> list;
    
    if (clsNo.length() == 2) {
      list = studyDao.findAllByLargeFilter(params);
    } else if (clsNo.length() == 4) {
      list = studyDao.findAllByMediumFilter(params);
    } else {
      list = studyDao.findAllBySmallFilter(params);
    }
    
      return list;
  }

  @Override
  public int add(Study study) {
    
    return studyDao.insert(study);
  }

  @Override
  public Study get(int no) {
    
    List<StudyMember> memberList = studyMemberDao.findStudyMembersByNo(no);
    int totalAge = 0;
    double totalAttendance = 0;
    
    for (StudyMember sm : memberList) {
      totalAge += sm.getAge();
      totalAttendance += sm.getAttendance();
    }
    totalAge /= memberList.size();
    totalAttendance /= memberList.size();
    
    Study study = studyDao.findByNo(no);
    study.setMemberAge(totalAge);
    study.setAttendance(totalAttendance);
    
    return study;
  }
  
  @Override
  public int updateRate(int no) {

    // 스터디원의 평점을 가져온다.
    List<StudyMember> memberList = studyMemberDao.findStudyMembersByNo(no);
    double totalRate = 0;
    
    
    // 스터디의 멤버들의 현재 평점을 모두 더한다.
    for (StudyMember sm : memberList) {
      totalRate += sm.getRate();
    }
    // 총 평점을 멤버수 만큼 나눈다.
    totalRate /= memberList.size();
    
    // 스터디 객체를 클라이언트쪽에 넘겨 줘야 한다.
    // 번호에 해당하는 스터디 정보를 꺼내서 rate 변수에 계산한 평점을 입력해 준다.
    Study study = studyDao.findByNo(no);
    study.setRate(totalRate);
    
    return studyDao.update(study);
  }
  

  @Override
  public int update(Study study) {
    
    return studyDao.update(study);
  }

  @Override
  public int delete(int no) {

    return studyDao.delete(no);
  }

  @Override
  public int size(String clsNo, String addressNo) {
    
    HashMap<String,Object> params = new HashMap<>();
    
    params.put("clsNo", clsNo);
    params.put("size", clsNo.length());
    params.put("addressNo", addressNo);
    params.put("addressSize", addressNo.length());
    
    return  studyDao.countAll(params);
  }
  
  
  
}
