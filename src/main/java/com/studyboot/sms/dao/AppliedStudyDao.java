package com.studyboot.sms.dao;

import java.util.List;
import com.studyboot.sms.domain.AppliedStudy;

public interface AppliedStudyDao {
  List<AppliedStudy> findAllByUser(int memberNo);
  List<AppliedStudy> findAllByStudy(int studyNo);
}







