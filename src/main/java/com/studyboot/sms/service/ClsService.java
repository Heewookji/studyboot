package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.Cls;

public interface ClsService {
  List<Cls> clsList(String clsNo);
}
