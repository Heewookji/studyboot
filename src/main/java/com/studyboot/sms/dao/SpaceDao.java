package com.studyboot.sms.dao;

import java.util.List;
import com.studyboot.sms.domain.Space;
import com.studyboot.sms.domain.SpaceConvenienceInfo;
import com.studyboot.sms.domain.SpaceReview;
import com.studyboot.sms.domain.SpaceRoomBooking;

public interface SpaceDao {
  int insertReview(SpaceReview spaceReview);
  List<Space> findAll();
  Space findByNo(int no);
  List<SpaceConvenienceInfo> findConv(int no);
  List<SpaceRoomBooking> findBooking(int no);
  List<SpaceReview> findReview(int no);
//  int update(Space space);
//  int delete(int no);
//  int countAll();
}







