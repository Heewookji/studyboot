package com.studyboot.sms.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.SpaceDao;
import com.studyboot.sms.domain.Space;
import com.studyboot.sms.domain.SpaceConvenienceInfo;
import com.studyboot.sms.domain.SpaceReview;
import com.studyboot.sms.service.SpaceService;

@Service
public class SpaceServiceImpl implements SpaceService {
  
  SpaceDao spaceDao;
  
  public SpaceServiceImpl(SpaceDao spaceDao) {
    this.spaceDao = spaceDao;
  }
  
  @Override
  public List<Space> list() {
    
    return spaceDao.findAll();
  }
  
  @Override
  public int addReview(SpaceReview spaceReview) {
    return spaceDao.insertReview(spaceReview);
  }
  
  @Override
  public int deleteReview(int no) {
    return spaceDao.deleteReview(no);
  }
  
//  @Override
//  public Space get(int no) {
//    Space space = spaceDao.findByNo(no);
//    return space;
//  }
//  
  @Override
  public Space detail(int no) {
    
    Space space = spaceDao.findByNo(no);
    
    List<SpaceConvenienceInfo> sc = spaceDao.findConv(no);
    List<SpaceReview> sr = spaceDao.findReview(no);
    
    space.setSpaceConvenienceInfos(sc);
    space.setSpaceReview(sr);
    
    return space;
  }

  @Override
  public int updateReview(SpaceReview spaceReview) {

    return spaceDao.updateReview(spaceReview);
  }

  
  
//  @Override
//  public int delete(int no) {
//    // 이 메서드도 그냥 DAO에 명령을 전달하는 일을 한다.
//    // 그래도 항상 Command 객체는 이 Service 객체를 통해서 데이터를 처리해야 한다.
//    return spaceDao.delete(no);
//  }
//  
//  @Override
//  public int size() {
//    // 전체 게시물의 개수
//    return spaceDao.countAll();
//  }
}







