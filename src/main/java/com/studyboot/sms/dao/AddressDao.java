package com.studyboot.sms.dao;

import java.util.List;
import com.studyboot.sms.domain.Address;

public interface AddressDao {
  List<Address> findLargeAddressName();
  List<Address> findMediumAddressName(String addressNo);
  List<Address> findSmallAddressName(String addressNo);
  List<Address> findAddressName();

  //Address findFullAddressName(int no);
}







