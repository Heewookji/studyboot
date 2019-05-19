package com.studyboot.sms.dao;

import java.util.HashMap;
import java.util.List;
import com.studyboot.sms.domain.SpaceRoomBooking;

public interface SpaceRoomBookingDao {
  List<SpaceRoomBooking> findAllBookedByDate(HashMap<String, Object> params);
List<SpaceRoomBooking> findAllBookedByDateTime(HashMap<String, Object> params);
}







