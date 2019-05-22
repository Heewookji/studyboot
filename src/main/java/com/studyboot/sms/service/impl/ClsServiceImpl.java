package com.studyboot.sms.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.ClsDao;
import com.studyboot.sms.domain.Cls;
import com.studyboot.sms.service.ClsService;

@Service
public class ClsServiceImpl implements ClsService {
  
  ClsDao clsDao;
  
  public ClsServiceImpl(
      ClsDao clsDao) {
    
    this.clsDao = clsDao;
  }
  
  public List<Cls> clsList(String clsNo) {
    
    List<Cls> list = null;
    
    if (clsNo.length() == 0) {
      list = clsDao.findLargeClsName();
      
    } else if(clsNo.length() == 2) {
      list = clsDao.findMediumClsName(clsNo);
      
    } else if (clsNo.length() == 4) {
      list = clsDao.findSmallClsName(clsNo);
    }
    
    for (Cls c : list) {
      if (c.getClsLargeNo() == null)
        c.setClsLargeNo("");
      if (c.getClsMediumNo() == null)
        c.setClsMediumNo("");
      if (c.getClsSmallNo() == null)
        c.setClsSmallNo("");
      
      c.setClsNo(c.getClsLargeNo()+c.getClsMediumNo()+c.getClsSmallNo());
    }
    
    return list;
  }
  
  
}
