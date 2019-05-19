package com.studyboot.sms.web.json;

import java.time.LocalTime;
import java.time.ZoneId;
import java.util.ArrayList;
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
import com.studyboot.sms.service.SpaceRoomService;


@RestController("json/SpaceRoomBookingController")
@RequestMapping("/json/spaceroombooking")
public class SpaceRoomBookingController {

SpaceRoomBookingService spaceRoomBookingService;
SpaceRoomService spaceRoomService;



  public SpaceRoomBookingController(
      SpaceRoomBookingService spaceRoomBookingService,
      SpaceRoomService spaceRoomService) {
  this.spaceRoomBookingService = spaceRoomBookingService;
  this.spaceRoomService = spaceRoomService;
}



  @GetMapping("allbookedtime")
  public Object listAllBookedTime(
      @RequestParam int spaceNo,
      @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") Date date) {

    HashMap<String,Object> content = new HashMap<>();
    
    //날짜 정보로 모든 예약 정보를 가져온다.
    List<SpaceRoomBooking> list = spaceRoomBookingService.listBookedByDate(spaceNo, date);
    
    //공간번호로 공간의 방 개수를 가져온다.
    int roomSize = spaceRoomService.size(spaceNo);
    
    //모든 스터디룸이 예약된 시간을 담을 리스트 준비
    List<String> fulledtimes = new ArrayList<String>();
    
    //예약시간과 예약개수를 담을 맵 준비
    HashMap<Date,Integer> map = new HashMap<>();
    
    //예약 정보를 돌면서 맵에 예약시간, 해당 시간의 예약 개수(예약 개수가 방 개수와 같다면 해당 시간은 모든 방이 예약됐다고 간주) 저장
    for(SpaceRoomBooking b : list) {
      Date time = b.getBookingStartDate();
      
      //이미 해당 시간이 맵에 저장되어있다면, 카운트만 하나 올리고 continue.
      if(map.containsKey(time)) {
        map.replace(time, map.get(time)+1);
        continue;
      }
      
      map.put(time, 1);
    }
    
    //예약 개수가 방 개수(roomSize)와 같다면 예약이 다 찬 시간이므로 fulledtimes에 저장한다.
    map.forEach((key, value) -> {
      if(value == roomSize) {
        fulledtimes.add(LocalTime.ofInstant(key.toInstant(), ZoneId.of("Asia/Seoul")).toString());
      }
    });
    
    // 저장된 예약이 다 찬 시간리스트를 프런트단으로 전송한다.
    content.put("fulledtimes", fulledtimes);
    return content;
  }

}










