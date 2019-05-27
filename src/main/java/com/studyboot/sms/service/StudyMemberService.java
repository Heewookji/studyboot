package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.Study;
import com.studyboot.sms.domain.StudyMember;

public interface StudyMemberService {
  List<Study> findMyStudyList(int no);
  List<StudyMember> findStudyMember(int no);
}
