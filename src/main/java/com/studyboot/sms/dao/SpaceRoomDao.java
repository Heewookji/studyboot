package com.studyboot.sms.dao;

import java.util.HashMap;
import java.util.List;
import com.studyboot.sms.domain.SpaceRoom;

public interface SpaceRoomDao {
  int countAll(int spaceNo);
  List<SpaceRoom> findAllByRoomNo(HashMap<String, Object> map);
}







