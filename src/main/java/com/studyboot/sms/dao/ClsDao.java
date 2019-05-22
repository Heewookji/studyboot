package com.studyboot.sms.dao;

import java.util.HashMap;
import java.util.List;
import com.studyboot.sms.domain.Cls;

public interface ClsDao {
  List<Cls> findLargeClsName();
  List<Cls> findMediumClsName(String clsNo);
  List<Cls> findSmallClsName(String clsNo);
  List<String> findedClsNoByKeyword(HashMap<String, Object> clsParam);
}







