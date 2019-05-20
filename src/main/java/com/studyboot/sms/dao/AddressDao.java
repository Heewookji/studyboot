package com.studyboot.sms.dao;

import java.util.List;
import com.studyboot.sms.domain.Address;

public interface AddressDao {
  List<Address> findLargeAddressName();
  List<Address> findMediumAddressName(String addressNo);
  List<Address> findSmallAddressName(String addressNo);
  Address findFullAddressName(int no);
  List<Address> findAddressName();
}







