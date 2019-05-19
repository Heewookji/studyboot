package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.SpaceRoom;

public interface SpaceRoomService {
  int size(int spaceNo);
  List<SpaceRoom> list(List<Integer> roomNos, int spaceNo);
}
