package com.studyboot.sms.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.StudyDao;
import com.studyboot.sms.domain.Study;
import com.studyboot.sms.service.StudyService;

@Service
public class StudyServiceImpl implements StudyService {
  
  StudyDao studyDao;
  
  public StudyServiceImpl(StudyDao studyDao) {
    this.studyDao = studyDao;
  }

  @Override
  public List<Study> list(int pageNo, int pageSize) {
    
    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    
    return studyDao.findAll(params);
  }

  @Override
  public int add(Study study) {
    
    return studyDao.insert(study);
  }

  @Override
  public Study get(int no) {
    return studyDao.findByNo(no);
  }
  
  @Override
  public int updateRate(int no) {

    // StudyDao에서 번호에 해당하는 스터디를 불러와서 List에 담는다.
    // List에 담는 이유는 스터디에 속해있는 멤버가 여러명일 수 있기 때문에
    // Study 객체가 여럿 생성될 수 있다.
    double[] memberRateList = studyDao.findMemberRateByNo(no);
    double studyMemberTotalRate = 0;
    
    // 스터디의 멤버들의 현재 평점을 모두 더한다.
    for (double r : memberRateList) {
      studyMemberTotalRate += r;
    }
    // 총 평점을 멤버수 만큼 나눈다.
    studyMemberTotalRate /= memberRateList.length;
    
    // 스터디 객체를 클라이언트쪽에 넘겨 줘야 한다.
    // 번호에 해당하는 스터디 정보를 꺼내서 rate 변수에 계산한 평점을 입력해 준다.
    Study study = studyDao.findByNo(no);
    study.setRate(studyMemberTotalRate);
    
    return studyDao.updateRate(study);
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
  public int size() {

    return studyDao.countAll();
  }
  
}
