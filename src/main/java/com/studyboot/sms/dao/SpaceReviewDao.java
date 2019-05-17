package com.studyboot.sms.dao;

import com.studyboot.sms.domain.SpaceReview;

public interface SpaceReviewDao {
  int insertReview(SpaceReview spaceReview);
  int deleteReview(int no);
  int updateReview(SpaceReview spaceReview);
}







