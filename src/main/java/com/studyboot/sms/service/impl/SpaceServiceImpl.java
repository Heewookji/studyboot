package com.studyboot.sms.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.AddressDao;
import com.studyboot.sms.dao.SpaceDao;
import com.studyboot.sms.domain.Space;
import com.studyboot.sms.domain.SpaceConvenienceInfo;
import com.studyboot.sms.domain.SpaceReview;
import com.studyboot.sms.service.SpaceService;

@Service
public class SpaceServiceImpl implements SpaceService {

  SpaceDao spaceDao;
  AddressDao addressDao;
  
  public SpaceServiceImpl(SpaceDao spaceDao, AddressDao addressDao) {
    this.spaceDao = spaceDao;
    this.addressDao = addressDao;
  }

  @Override
  public List<Space> list() {

    return spaceDao.findAll();
  }

  @Override
  public Space detail(int no) {

    Space space = spaceDao.findByNo(no);

    List<SpaceConvenienceInfo> sc = spaceDao.findConv(no); // 공간 편의시설 리턴
    List<SpaceReview> sr = spaceDao.findReview(no); // 공간 리뷰 목록 리턴

    space.setSpaceConvenienceInfos(sc); 
    space.setSpaceReview(sr);

    return space;
  }
  
  @Override
  public String spaceAddress(Map<String, Object> listMap) {
    List<Space> spaceLists = (List<Space>) listMap.get("list");

    
    List<String> address = new ArrayList<>();
    List<String> addressDetail = new ArrayList<>();
    
    for (Space space : spaceLists) {
      address.add(space.getAddress());
      addressDetail.add(space.getAddressDetail());
    }
    
    List<Integer> largeNo = new ArrayList<>();
    List<Integer> mediumNo = new ArrayList<>();
    List<Integer> smallNo = new ArrayList<>();
    
    for (int i = 0; i < address.size(); i++) {
      String addSplit = address.get(i); // 55 55 55 // 11 11 11 // 22 22 22
      
      largeNo.add(Integer.parseInt(addSplit.substring(1)));
      mediumNo.add(Integer.parseInt(addSplit.substring(2, 3)));
      smallNo.add(Integer.parseInt(addSplit.substring(4, 5)));
      
      addressDao.findFullAddressName(smallNo.get(i));
    }
    
    
    
    return null;
  }
}







