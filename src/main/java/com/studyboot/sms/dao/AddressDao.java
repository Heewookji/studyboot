package com.studyboot.sms.dao;

import java.util.HashMap;
import java.util.List;
import com.studyboot.sms.domain.Address;

public interface AddressDao {
  Address findFullAddressName(int no);
  List<Address> findAddressName(HashMap<String, Object> params);
}







