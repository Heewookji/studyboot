package com.studyboot.sms.service.impl;

import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.SpaceReviewDao;
import com.studyboot.sms.domain.SpaceReview;
import com.studyboot.sms.service.SpaceReviewService;

@Service
public class SpaceReviewServiceImpl implements SpaceReviewService {

  SpaceReviewDao spaceReviewDao;

  public SpaceReviewServiceImpl(SpaceReviewDao spaceReviewDao) {
    this.spaceReviewDao = spaceReviewDao;
  }

  @Override
  public int addReview(SpaceReview spaceReview) {
    return spaceReviewDao.insertReview(spaceReview);
  }

  @Override
  public int deleteReview(int no) {
    return spaceReviewDao.deleteReview(no);
  }

  @Override
  public int updateReview(SpaceReview spaceReview) {
    return spaceReviewDao.updateReview(spaceReview);
  }
  
}







