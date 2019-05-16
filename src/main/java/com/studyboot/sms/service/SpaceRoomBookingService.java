package com.studyboot.sms.service;

import java.util.Date;
import java.util.List;
import com.studyboot.sms.domain.SpaceRoomBooking;

public interface SpaceRoomBookingService {
  List<SpaceRoomBooking> listBooked(int spaceNo, Date date);
}
