package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.Space;
import com.studyboot.sms.domain.SpaceReview;

public interface SpaceService {
  List<Space> list();
  int addReview(SpaceReview spaceReview);
  Space detail(int no);
  int deleteReview(SpaceReview spaceReview);
//  int update(Space board);
//  int delete(int no);
//  int size();
}
