package com.studyboot.sms.dao;

import java.util.List;
import com.studyboot.sms.domain.StudyCls;

public interface StudyClsDao {
  List<StudyCls> findSmallClsName(String clsNo);
  List<StudyCls> findMediumClsName(String clsNo);
}







