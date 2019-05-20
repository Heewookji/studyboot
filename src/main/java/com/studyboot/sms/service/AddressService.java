package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.Address;

public interface AddressService {
  List<Address> addressList(String addressNo);
}
