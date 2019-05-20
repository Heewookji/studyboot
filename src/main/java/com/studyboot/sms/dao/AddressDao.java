package com.studyboot.sms.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.studyboot.sms.domain.Address;

public interface AddressDao {
  Address findFullAddressName(Map<String, Object> no);
  List<Address> findAddressName(HashMap<String, Object> params);
}







