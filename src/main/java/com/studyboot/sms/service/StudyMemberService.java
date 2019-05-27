package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.Study;

public interface StudyMemberService {
  List<Study> findMyStudyList(int no);
}
