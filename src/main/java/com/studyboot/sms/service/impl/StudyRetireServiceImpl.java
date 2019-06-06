package com.studyboot.sms.service.impl;

import java.util.Map;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.StudyRetireDao;
import com.studyboot.sms.service.StudyRetireService;

@Service
public class StudyRetireServiceImpl implements StudyRetireService {

  StudyRetireDao studyRetireDao;
  
  public StudyRetireServiceImpl(StudyRetireDao studyRetireDao) {
    this.studyRetireDao = studyRetireDao;
  }
  
  @Override
  public int evaluationAdd(Map<String,Object> evaluationMap) {
    
    return studyRetireDao.evaluationAdd(evaluationMap);
  }
}
