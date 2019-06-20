package com.studyboot.sms.service.impl;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.AddressDao;
import com.studyboot.sms.dao.AppliedStudyDao;
import com.studyboot.sms.dao.ClsDao;
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
  ClsDao clsDao;
  AppliedStudyDao appliedStudyDao;
  
  public StudyServiceImpl(
      StudyDao studyDao,
      StudyMemberDao studyMemberDao,
      AddressDao addressDao,
      ClsDao clsDao,
      AppliedStudyDao appliedStudyDao) {
    this.clsDao = clsDao;
    this.studyDao = studyDao;
    this.studyMemberDao = studyMemberDao;
    this.addressDao = addressDao;
    this.appliedStudyDao = appliedStudyDao;
  }

  
  
  @Override
  public List<Study> list(int pageNo, int pageSize, List<String> clsNo, String addressNo,
      double rateValue, String keyword, List<Integer> dayNoList) {

    HashMap<String,Object> params = new HashMap<>();

//    키워드 검색시, 키워드로 스터디 이름,목표, 설명, 분야번호를 찾아내야한다. 때문에 키워드로 먼저 관심분야 번호를 검색한다.
//    그 뒤에 스터디 매퍼에서 관심분야 번호로 스터디를 검색한다.
      HashMap<String,Object> clsParam = new HashMap<>();
      clsParam.put("keyword", keyword);
    List<String> findedClsNosByKeyword = clsDao.findedClsNoByKeyword(clsParam);
    
    if(findedClsNosByKeyword.size() != 0) {
      params.put("findedClsNosByKeyword", findedClsNosByKeyword);
    }
    
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    params.put("dayNoList", dayNoList);
    params.put("dayNoListSize", dayNoList.size());
    params.put("clsNo", clsNo);
    params.put("addressNo", addressNo);
    params.put("addressNoSize", addressNo.length());
    params.put("rateValue", rateValue);
    params.put("keyword", keyword);
    
    List<Study> list;
    
    list = studyDao.findAllByKeyword(params);
    
      return list;
  }
  @Override
  public List<Study> list(
      int pageNo, int pageSize,
      String clsNo, String addressNo,
      double rateValue, String keyword,
      List<Integer> dayNoList) {
    
    HashMap<String,Object> params = new HashMap<>();

//    키워드 검색시, 키워드로 스터디 이름,목표, 설명, 분야번호를 찾아내야한다. 때문에 키워드로 먼저 관심분야 번호를 검색한다.
//    그 뒤에 스터디 매퍼에서 관심분야 번호로 스터디를 검색한다.
    if(keyword != null) {
      HashMap<String,Object> clsParam = new HashMap<>();
      clsParam.put("keyword", keyword);
    List<String> findedClsNosByKeyword = clsDao.findedClsNoByKeyword(clsParam);
    
    if(findedClsNosByKeyword.size() != 0) {
      params.put("findedClsNosByKeyword", findedClsNosByKeyword);
    }
    
    }
    
    
    params.put("size", pageSize);
    params.put("dayNoList", dayNoList);
    params.put("dayNoListSize", dayNoList.size());
    params.put("rowNo", (pageNo - 1) * pageSize);
    params.put("clsNo", clsNo);
    params.put("clsNoSize", clsNo.length());
    params.put("addressNo", addressNo);
    params.put("addressNoSize", addressNo.length());
    params.put("rateValue", rateValue);
    params.put("keyword", keyword);
    
    List<Study> list;
    
    list = studyDao.findAll(params);
    
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
    
    LocalDate now = LocalDate.now();
    
    //생년월일과 현재날짜의 차로 나이를 계산한다.
    for (StudyMember sm : memberList) {
      LocalDate birth = sm.getBirth().toLocalDate();
      Period period = Period.between(birth, now);
      int age = period.getYears() + 1;
      totalAge += age;
      totalAttendance += sm.getAttendance();
    }
    totalAge /= memberList.size();
    totalAttendance /= memberList.size();
    
    Study study = studyDao.findByNo(no);
    study.setMemberAge(totalAge);
    study.setAttendance(totalAttendance);
    
   
    
    //활동요일을 변환해준다.
    HashMap<String,Integer> dayMap = new HashMap<>();
    dayMap.put("월",1);
    dayMap.put( "화",2);
    dayMap.put( "수",4);
    dayMap.put( "목",8);
    dayMap.put( "금",16);
    dayMap.put( "토",32);
    dayMap.put( "일",64);
    ArrayList<String> dayStrList = new ArrayList<>();
    dayMap.forEach((dayStr, dayNo)->{
      if(dayNo == (dayNo & study.getDay())) {
        dayStrList.add(dayStr);
      }
    });
    
   dayStrList.sort((String str1, String str2)->{
     if(dayMap.get(str1) > dayMap.get(str2)) {
       return 0;
     } else {
       return 1;
     }
   });
    
    study.setDayStrList(dayStrList);
    
    
    //전체 일수와 남은 일수를 계산해준다.
    
    long totalCal = study.getEndDate().getTime() - study.getStartDate().getTime();
    long totalDiff = totalCal / (24 * 60 * 60 * 1000);
    long CurrentCal = study.getEndDate().getTime() - new Date().getTime();
    long currentDiff = CurrentCal / (24 * 60 * 60 * 1000);
    
    study.setTotalDateDiff(totalDiff);
    study.setCurrentDateDiff(currentDiff);
    
    return study;
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
  public int size(
      String clsNo, String addressNo , double rateValue, String keyword, List<Integer> dayNoList) {
    
    HashMap<String,Object> params = new HashMap<>();
    if(keyword != null) {
      HashMap<String,Object> clsParam = new HashMap<>();
      clsParam.put("keyword", keyword);
      List<String> findedClsNosByKeyword = clsDao.findedClsNoByKeyword(clsParam);
      if(findedClsNosByKeyword.size() != 0) {
        params.put("findedClsNosByKeyword", findedClsNosByKeyword);
      }
      }
    params.put("clsNo", clsNo);
    params.put("dayNoList", dayNoList);
    params.put("dayNoListSize", dayNoList.size());
    params.put("size", clsNo.length());
    params.put("addressNo", addressNo);
    params.put("addressSize", addressNo.length());
    params.put("keyword", keyword);
    params.put("rateValue", rateValue);
    
    return  studyDao.countAll(params);
  }
  
  @Override
  public int size(
      List<String> clsNo, String addressNo , double rateValue, String keyword, List<Integer> dayNoList) {
    
    HashMap<String,Object> params = new HashMap<>();
      HashMap<String,Object> clsParam = new HashMap<>();
      clsParam.put("keyword", keyword);
      List<String> findedClsNosByKeyword = clsDao.findedClsNoByKeyword(clsParam);
      if(findedClsNosByKeyword.size() != 0) {
        params.put("findedClsNosByKeyword", findedClsNosByKeyword);
      }
    params.put("clsNo", clsNo);
    params.put("dayNoList", dayNoList);
    params.put("dayNoListSize", dayNoList.size());
    params.put("addressNo", addressNo);
    params.put("addressSize", addressNo.length());
    params.put("keyword", keyword);
    params.put("rateValue", rateValue);
    
    return  studyDao.countAllByKeyword(params);
  }
  
  @Override
  public Study getStudyPhoto(int no) {
    
    Study study = studyDao.findPhotoByNo(no);
    return study;
  }
  
  @Override
  public int insertPickedStudy(int userNo, int studyNo) {
    
   HashMap<String,Object> params = new HashMap<>();
    
    params.put("userNo", userNo);
    params.put("studyNo", studyNo);
    
    
    return studyDao.insertPickedStudyByUserNoAndStudyNo(params);
  }
  

  @Override
  public int deletePickedStudy(int userNo, int studyNo) {
    
    HashMap<String,Object> params = new HashMap<>();
    
    params.put("userNo", userNo);
    params.put("studyNo", studyNo);
    
    return studyDao.deletePickedStudyByUserNoAndStudyNo(params);
  }


  @Override
  public int insertAppliedStudy(int userNo, int studyNo, String determination) {

    HashMap<String,Object> params = new HashMap<>();
     
     params.put("userNo", userNo);
     params.put("studyNo", studyNo);
     params.put("determination", determination);
     
     return appliedStudyDao.insertAppliedStudyByUserNoAndStudyNo(params);
  }
  
  

  @Override
  public boolean checkFullCapacityByStudyNo(int studyNo) {
    return studyDao.checkFullCapacityByStudyNo(studyNo);
  }


//스터디의 모집상태를 갱신해주는 메서드
  @Override
  public void updateAllStudyRecruitState() {
    studyDao.updateAllStudyRecruitState();
    studyDao.updateAllStudyRecruitState2();
    studyDao.updateAllStudyRecruitState3();
  }

// 현재인원 증가
  @Override
  public int prsnCount(int stdNo) {
    return studyDao.addPrsn(stdNo);
  }

  
  


  @Override
  public int updateRate(int studyNo) {
  //스터디 평점을 갱신해준다.
    List<StudyMember> memberList = studyMemberDao.findStudyMembersByNo(studyNo);
    double totalRate = 0;

    // 스터디의 멤버들의 현재 평점을 모두 더한다.
    for (StudyMember sm : memberList) {
      totalRate += sm.getRate();
    }
    // 총 평점을 멤버수 만큼 나눈다.
    totalRate /= memberList.size();

    // 번호에 해당하는 스터디 정보를 꺼내서 rate 변수에 계산한 평점을 입력해 준다.
    Study study = studyDao.findByNo(studyNo);
    
    study.setRate(totalRate);
    return studyDao.update(study);
  }
 
  

}
