package com.studyboot.sms.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.AppliedStudyDao;
import com.studyboot.sms.domain.AppliedStudy;
import com.studyboot.sms.service.ApprovalService;

@Service
public class ApprovalServiceImpl implements ApprovalService {

  AppliedStudyDao appliedStudyDao;
  
  public ApprovalServiceImpl(AppliedStudyDao appliedStudyDao) {
    this.appliedStudyDao = appliedStudyDao;
  }
  
  @Override
  public List<AppliedStudy> list(int stdNo) {
    
    List<AppliedStudy> list = appliedStudyDao.findUserApproval(stdNo);
    return list;
  }

  @Override
  public int delete(int stdNo, int memberNo) {
    
    HashMap<String,Object> params = new HashMap<>();
    params.put("stdNo", stdNo);
    params.put("memberNo", memberNo);
    
    return appliedStudyDao.delete(params);
  }

}


















