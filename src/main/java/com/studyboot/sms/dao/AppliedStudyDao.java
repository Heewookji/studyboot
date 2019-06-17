package com.studyboot.sms.dao;

import java.util.HashMap;
import java.util.List;
import com.studyboot.sms.domain.AppliedStudy;

public interface AppliedStudyDao {
  List<AppliedStudy> findAllByUser(int memberNo);
  List<AppliedStudy> findAllByStudy(int studyNo);
  List<AppliedStudy> findUserApproval(int studyNo);
  int insertAppliedStudyByUserNoAndStudyNo(HashMap<String, Object> params);
}







