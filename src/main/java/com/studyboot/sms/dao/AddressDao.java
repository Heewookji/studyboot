package com.studyboot.sms.dao;

import java.util.List;
import com.studyboot.sms.domain.Address;
import com.studyboot.sms.domain.StudyCls;

public interface AddressDao {
  List<StudyCls> findLargeAddressName();
  List<StudyCls> findMediumAddressName(String addressNo);
  List<StudyCls> findSmallAddressName(String addressNo);
  Address findFullAddressName(int no);
}







