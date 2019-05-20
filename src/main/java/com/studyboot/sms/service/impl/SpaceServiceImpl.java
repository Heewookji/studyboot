package com.studyboot.sms.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.AddressDao;
import com.studyboot.sms.dao.SpaceDao;
import com.studyboot.sms.domain.Address;
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
  @SuppressWarnings("unchecked")
  public Map<String, Object> spaceAddress(Map<String, Object> listMap) {

    // 컨트롤러에서 Map으로 공간 리스트를 받아옴 
    List<Space> spaceLists = (List<Space>) listMap.get("list");

    List<String> address = new ArrayList<>();
    List<String> addressDetail = new ArrayList<>();

    for (Space space : spaceLists) {
      address.add(space.getAddress()); // 리스트에 저장된 공간정보(111111)을 빼내서 새로운 리스트에 담는다.
      addressDetail.add(space.getAddressDetail());
    }

    List<Address> fullAddressName = new ArrayList<>();

    HashMap<String, Object> daoMap = new HashMap<>();
    
    // 58줄에서 새로운 리스트에 저장된 숫자를 쪼개기 위한 반복문
    for (int i = 0; i < address.size(); i++) {
      String addSplit = address.get(i); // 첫번째 리스트의 공간정보를 빼서 addSplit에 담는다.
      
      int smallNo = Integer.parseInt(addSplit.substring(0, 2)); // 공간정보를 쪼갠다.
      int mediumNo = Integer.parseInt(addSplit.substring(2, 4));
      int largeNo = Integer.parseInt(addSplit.substring(4, 6));
      
      daoMap.put("smallNo", smallNo); // dao의 파라미터 타입이 map이기 때문에 hashMap에 put을 한다.
      daoMap.put("mediumNo", mediumNo);
      daoMap.put("largeNo", largeNo);
      
      fullAddressName.add(addressDao.findFullAddressName(daoMap));
    }

    HashMap<String, Object> addressMap = new HashMap<>();

    addressMap.put("fullName", fullAddressName);
    addressMap.put("addressDetail", addressDetail);

    return addressMap;
  }
}







