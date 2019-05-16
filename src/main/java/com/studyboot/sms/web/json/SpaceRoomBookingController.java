package com.studyboot.sms.web.json;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.studyboot.sms.domain.SpaceRoomBooking;
import com.studyboot.sms.service.SpaceRoomBookingService;


@RestController("json/SpaceRoomBookingController")
@RequestMapping("/json/spaceroombooking")
public class SpaceRoomBookingController {

SpaceRoomBookingService spaceRoomBookingService;



  public SpaceRoomBookingController(SpaceRoomBookingService spaceRoomBookingService) {
  this.spaceRoomBookingService = spaceRoomBookingService;
}



  @GetMapping("listbooked")
  public Object listBooked(
      @RequestParam int spaceNo,
      @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") Date date) {

    HashMap<String,Object> content = new HashMap<>();

    List<SpaceRoomBooking> spaceRoomBookings = spaceRoomBookingService.listBooked(spaceNo, date);
    
    content.put("list", spaceRoomBookings);

    return content;
  }

}










