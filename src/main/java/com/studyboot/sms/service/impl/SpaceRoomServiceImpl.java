package com.studyboot.sms.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.SpaceRoomDao;
import com.studyboot.sms.domain.SpaceRoom;
import com.studyboot.sms.service.SpaceRoomService;

@Service
public class SpaceRoomServiceImpl implements SpaceRoomService {

  SpaceRoomDao spaceRoomDao;
  
  public SpaceRoomServiceImpl(SpaceRoomDao spaceRoomDao) {
    this.spaceRoomDao = spaceRoomDao;
  }

  
  @Override
  public int size(int spaceNo) {
    return spaceRoomDao.countAll(spaceNo);
  }


  @Override
  public List<SpaceRoom> list(List<Integer> roomNos, int spaceNo) {
    
    HashMap<String, Object> params = new HashMap<>();
    
    params.put("space_id", spaceNo);
    
    if(roomNos.size() != 0) {
      params.put("list", roomNos);
    }
    
    return spaceRoomDao.findAllByRoomNo(params);
  }

  


}







