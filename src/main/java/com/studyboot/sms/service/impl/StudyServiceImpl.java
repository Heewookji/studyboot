package com.studyboot.sms.service.impl;

import java.util.HashMap;
import java.util.List;
import com.studyboot.sms.dao.StudyDao;
import com.studyboot.sms.domain.Study;
import com.studyboot.sms.service.StudyService;

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

    Study study = studyDao.findByNo(no);
    if (study != null) {
      studyDao.increaseCount(no);
    }
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
  public int size() {

    return studyDao.countAll();
  }
  
}
