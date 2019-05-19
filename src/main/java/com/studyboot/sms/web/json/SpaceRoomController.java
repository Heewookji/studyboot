package com.studyboot.sms.web.json;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.studyboot.sms.domain.SpaceRoom;
import com.studyboot.sms.domain.SpaceRoomBooking;
import com.studyboot.sms.service.SpaceRoomBookingService;
import com.studyboot.sms.service.SpaceRoomService;


@RestController("json/SpaceRoomController")
@RequestMapping("/json/spaceroom")
public class SpaceRoomController {

SpaceRoomService spaceRoomService;
SpaceRoomBookingService spaceRoomBookingService;

  public SpaceRoomController(SpaceRoomService spaceRoomService,
      SpaceRoomBookingService spaceRoomBookingService) {
  this.spaceRoomService = spaceRoomService;
  this.spaceRoomBookingService = spaceRoomBookingService;
}


  @GetMapping("listroom")
  public Object list(
      @RequestParam int spaceNo,
      @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd HH:mm") Date date) {
    
    HashMap<String, Object> content = new HashMap<>();
    
    List<SpaceRoomBooking> bookedList = spaceRoomBookingService.listBookedByDateTime(spaceNo, date);
    List<Integer> roomNos = new ArrayList<>();
    
    for (SpaceRoomBooking booked : bookedList) {
      roomNos.add(booked.getRoomNo());
    }
    
    List<SpaceRoom> list = spaceRoomService.list(roomNos, spaceNo);
    
    content.put("list", list);
    return content;
  }

}










