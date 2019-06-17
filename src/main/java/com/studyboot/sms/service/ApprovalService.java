package com.studyboot.sms.service;

import java.util.List;
import com.studyboot.sms.domain.AppliedStudy;

public interface ApprovalService {

  List<AppliedStudy> list(int stdNo); // 저장소에 있는 파일목록 출력

  
//  void add(int stdNo); // 스터디 생성시 저장소 생성
//  void fileAdd(Part files, int stdNo) throws IOException; // 저장소에 파일 저장
//  void fileDelete(int stdNo, String fileName); // 저장소에 파일 삭제
//  void delete(); // 스터디 삭제시 저장소 삭제(스터디가 삭제되면 없애야 함 스터디 기간이 끝나면 삭제하도록 해야함)
//  void fileDownload(int stdNo, String fileName);

}
