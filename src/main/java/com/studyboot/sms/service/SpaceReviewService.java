package com.studyboot.sms.service;

import com.studyboot.sms.domain.SpaceReview;

public interface SpaceReviewService {
  int addReview(SpaceReview spaceReview);
  int deleteReview(int no);
  int updateReview(SpaceReview spaceReview);
}
