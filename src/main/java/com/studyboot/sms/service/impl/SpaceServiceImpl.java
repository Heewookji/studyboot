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

  // 숫자로된 공간주소를 한글로 바꾸는 역할을 하는 메서드
  @Override
  public void spaceAddress(List<Space> spaceList) {
    // 컨트롤러에서 공간 정보 리스트를 받아옴
    
    List<String> address = new ArrayList<>();
    List<String> addressDetail = new ArrayList<>();

    // 공간 정보 리스트에서 숫자로된 주소(111111)과 상세주소만 찾은 후 리스트에 담는다.
    for (Space space : spaceList) {
      address.add(space.getAddress());
      addressDetail.add(space.getAddressDetail());
    }
    
    List<Address> fullAddressName = new ArrayList<>();

    HashMap<String, Object> daoMap = new HashMap<>(); // dao에 값을 보내기 위한 Map
    
    // 58줄에서 새로운 리스트에 저장된 숫자를 쪼개기 위한 반복문
    for (int i = 0; i < address.size(); i++) {
      String addSplit = address.get(i); // 첫번째 리스트의 공간정보를 빼서 addSplit에 담는다.
      
      int smallNo = Integer.parseInt(addSplit.substring(0, 2)); // 공간정보를 쪼갠다.
      int mediumNo = Integer.parseInt(addSplit.substring(2, 4));
      int largeNo = Integer.parseInt(addSplit.substring(4, 6));
      
      // dao의 파라미터 타입이 map이기 때문에 hashMap에 put을 한다.
      daoMap.put("smallNo", smallNo);
      daoMap.put("mediumNo", mediumNo);
      daoMap.put("largeNo", largeNo);
      
      // dao에 값을 전달하여 주소 정보를 받아오고, fullAddressName에 정보를 저장한다.
      fullAddressName.add(addressDao.findFullAddressName(daoMap));
    }

    for(int i = 0; i < fullAddressName.size(); i++) {
      // 객체에서 주소 각각의 이름을 꺼내서 하나의 String으로 바꾼다.
      String fullAddress = 
          fullAddressName.get(i).getLargeName() + " " 
        + fullAddressName.get(i).getMediumName() + " " 
         + fullAddressName.get(i).getSmallName() ;
     
      // 위에서 합친 주소에 상세주소를 합친다.
      String completedAddress = fullAddress + " " + addressDetail.get(i);
      
      spaceList.get(i).setCompletedAddress(completedAddress);
    }
  }
  
}







