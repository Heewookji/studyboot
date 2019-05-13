package com.studyboot.sms.dao;

import java.util.List;
import com.studyboot.sms.domain.MemberRate;

public interface MemberRateDao {
  List<MemberRate> findAll(int studyNo);
}
