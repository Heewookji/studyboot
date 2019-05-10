package com.studyboot.sms.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.studyboot.sms.dao.InquiryDao;
import com.studyboot.sms.domain.Inquiry;
import com.studyboot.sms.service.InquiryService;

// 스프링 IoC 컨테이너가 관리하는 객체 중에서 
// 비즈니스 로직을 담당하는 객체는 
// 특별히 그 역할을 표시하기 위해 @Component 대신에 @Service 애노테이션을 붙인다.
// 이렇게 애노테이션으로 구분해두면 나중에 애노테이션으로 객체를 찾을 수 있다.
@Service
public class InquiryServiceImpl implements InquiryService {
  
  InquiryDao inquiryDao;
  
  public InquiryServiceImpl(InquiryDao inquiryDao) {
    this.inquiryDao = inquiryDao;
  }
  
  // 비지니스 객체에서 메서드 이름은 가능한 업무 용어를 사용한다.
  @Override
  public List<Inquiry> list(int pageNo, int pageSize, String pageCls) {
    // 게시물 목록을 가져오는 경우 서비스 객체에서 특별하게 할 일이 없다.
    // 그럼에도 불구하고 Command 객체와 DAO 사이에 Service 객체를 두기로 했으면 
    // 일관성을 위해 Command 객체는 항상 Service 객체를 통해 데이터를 다뤄야 한다.
    // 
    
    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    params.put("cls", pageCls);
    
    List<Inquiry> list = inquiryDao.findAll(params);
    
    System.out.println(list);
    
    return list;
  }
  
  @Override
  public int add(Inquiry inquiry) {
    // 이 메서드도 하는 일이 없다.
    // 그래도 일관된 프로그래밍을 위해 Command 객체는 항상 Service 객체를 경유하여 DAO를 사용해야 한다.
    return inquiryDao.insert(inquiry);
  }
  
  @Override
  public Inquiry get(int no) {
    return inquiryDao.findByNo(no);
  }
  
  @Override
  public int delete(int no) {
    // 이 메서드도 그냥 DAO에 명령을 전달하는 일을 한다.
    // 그래도 항상 Command 객체는 이 Service 객체를 통해서 데이터를 처리해야 한다.
    return inquiryDao.delete(no);
  }
  
  @Override
  public int size(int pageCls) {
    // 전체 게시물의 개수
    return inquiryDao.countAll(pageCls);
  }
}







