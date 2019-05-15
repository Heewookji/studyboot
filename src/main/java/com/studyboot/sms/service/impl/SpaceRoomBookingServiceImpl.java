package com.studyboot.sms.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.SpaceRoomBookingDao;
import com.studyboot.sms.domain.SpaceRoomBooking;
import com.studyboot.sms.service.SpaceRoomBookingService;

@Service
public class SpaceRoomBookingServiceImpl implements SpaceRoomBookingService {

  SpaceRoomBookingDao spaceRoomBookingDao;

  public SpaceRoomBookingServiceImpl(SpaceRoomBookingDao spaceRoomBookingDao) {
    this.spaceRoomBookingDao = spaceRoomBookingDao;
  }

  @Override
  public List<SpaceRoomBooking> listBooked(int spaceNo, Date date) {

    HashMap<String,Object> params = new HashMap<>();
    params.put("space_id", spaceNo);
    params.put("date", date);

    List<SpaceRoomBooking> list = spaceRoomBookingDao.findAllBookedByDate(params);

    return list;
  }


}







