package com.studyboot.sms.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.studyboot.sms.dao.StudyBoardDao;
import com.studyboot.sms.dao.StudyDao;
import com.studyboot.sms.domain.StudyBoard;
import com.studyboot.sms.service.MyStudyService;

@Service
public class MyStudyServiceImpl implements MyStudyService {

  StudyDao studyDao;
  StudyBoardDao studyBoardDao;

  public MyStudyServiceImpl(StudyBoardDao studyBoardDao) {
    this.studyBoardDao = studyBoardDao;
  }

  @Override
  public List<StudyBoard> list(int pageNo, int pageSize, 
      int clsNo, List<Integer> memberNos, String keyword, int no) {

    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    params.put("cls", clsNo);
    params.put("member_ids", memberNos);
    params.put("keyword", keyword);
    params.put("no", no);

    if (memberNos != null) {
      params.put("ids_size", memberNos.size());
    } else if (memberNos == null) {
      params.put("ids_size", 0);
    }

    List<StudyBoard> list = studyBoardDao.findAll(params);

    return list;
  }

  @Override
  public int size(int clsNo, List<Integer> memberNos, String keyword, int no) {

    HashMap<String,Object> params = new HashMap<>();

    params.put("cls", clsNo);
    params.put("member_ids", memberNos);
    params.put("keyword", keyword);
    params.put("no", no);

    if (memberNos != null) {
      params.put("ids_size", memberNos.size());
    } else if (memberNos == null) {
      params.put("ids_size", 0);
    }

    int count = studyBoardDao.countByClsAndMember(params);
    return count;
  }

  @Override
  public List<StudyBoard> ntcList(int no) {

    List<StudyBoard> boardNtc = studyBoardDao.findNtc(no);

    return boardNtc;
  }

  @Override
  public StudyBoard get(int no) {
    return studyBoardDao.findByNo(no);
  }

  @Override
  public int add(StudyBoard studyBoard) {
    return studyBoardDao.insert(studyBoard);
  }

  @Override
  public int delete(int no) {
    return studyBoardDao.delete(no);
  }

  @Override
  public int update(StudyBoard studyBoard) {
    return studyBoardDao.update(studyBoard);
  }















  //  InquiryDao inquiryDao;
  //
  //  public MyStudyImpl(InquiryDao inquiryDao) {
  //    this.inquiryDao = inquiryDao;
  //  }
  //
  //  @Override
  //  public List<Inquiry> list(int pageNo, int pageSize, int clsNo, List<Integer> memberNos) {
  //
  //    HashMap<String,Object> params = new HashMap<>();
  //    params.put("size", pageSize);
  //    params.put("rowNo", (pageNo - 1) * pageSize);
  //    params.put("cls", clsNo);
  //    params.put("member_ids", memberNos);
  //
  //    List<Inquiry> list = inquiryDao.findAll(params);
  //
  //    return list;
  //  }
  //
  //
  //  @Override
  //  public int add(Inquiry inquiry) {
  //    return inquiryDao.insert(inquiry);
  //  }
  //
  //  @Override
  //  public Inquiry get(int no) {
  //    return inquiryDao.findByNo(no);
  //  }
  //
  //  @Override
  //  public int delete(int no) {
  //    return inquiryDao.delete(no);
  //  }
  //
  //  @Override
  //  public int size(int clsNo, List<Integer> memberNos) {
  //    
  //    HashMap<String,Object> params = new HashMap<>();
  //    params.put("cls", clsNo);
  //    params.put("member_ids", memberNos);
  //
  //    int count = inquiryDao.countByClsAndMember(params);
  //    return count;
  //  }
  //
  //
  //

}







