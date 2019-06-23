package com.studyboot.sms.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.AddressDao;
import com.studyboot.sms.domain.Address;
import com.studyboot.sms.domain.Cls;
import com.studyboot.sms.service.AddressService;

@Service
public class AddressServiceImpl implements AddressService {

  AddressDao addressDao;

  public AddressServiceImpl(
      AddressDao addressDao) {
    this.addressDao = addressDao;
  }

  @Override
  public List<Address> addressList(String addressNo) {

    HashMap<String, Object> params = new HashMap<>();

    params.put("addressNo", addressNo);
    params.put("addressSize", addressNo.length());

    List<Address> list = addressDao.findAddressName(params);

    for(Address a : list) {
      if(a.getAddressLargeNo() == null)
        a.setAddressLargeNo("");
      if(a.getAddressMediumNo() == null)
        a.setAddressMediumNo("");
      if(a.getAddressSmallNo() == null)
        a.setAddressSmallNo("");
      a.setAddressNo(a.getAddressLargeNo()+a.getAddressMediumNo()+a.getAddressSmallNo());
    }
    
    list.sort((Address str1, Address str2)->{
      
      if(str2.getName().equals("서울시")) {
        return 0;
      }
      return str1.getName().compareToIgnoreCase(str2.getName());
    });
    
    return list;
  }

  @Override
  public String addressFullName(String addressNo) {
    
    HashMap<String, Object> params = new HashMap<>(); // dao에 값을 보내기 위한 Map
    
    try {
      
      String largeNo = addressNo.substring(0, 2); // 공간정보를 쪼갠다.
      String mediumNo = addressNo.substring(2, 4);
      String smallNo = addressNo.substring(4, 6);
        
      params.put("smallNo", smallNo);
      params.put("mediumNo", mediumNo);
      params.put("largeNo", largeNo);
      
      Address address = addressDao.findFullAddressName(params);

      String fullAddress = 
          address.getLargeName() + " " 
        + address.getMediumName() + " " 
         + address.getSmallName() ;
      
      return fullAddress;
      
    } catch (Exception e) {
      System.out.println("유효하지 않은 지역 코드 입니다.!!");
      return null;
    }
  }


}
