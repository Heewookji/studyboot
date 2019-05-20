package com.studyboot.sms.dao;

import java.util.List;
import com.studyboot.sms.domain.Space;
import com.studyboot.sms.domain.SpaceConvenienceInfo;
import com.studyboot.sms.domain.SpaceReview;

public interface SpaceDao {
  List<Space> findAll();
  Space findByNo(int no);
  List<SpaceConvenienceInfo> findConv(int no);
  List<SpaceReview> findReview(int no);
  
}







