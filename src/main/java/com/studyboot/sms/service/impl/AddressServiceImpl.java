package com.studyboot.sms.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.AddressDao;
import com.studyboot.sms.domain.Address;
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
    
    return addressDao.findAddressName(); 
  }




}
