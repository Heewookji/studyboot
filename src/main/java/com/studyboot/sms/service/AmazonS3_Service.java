package com.studyboot.sms.service;

import java.io.IOException;
import java.util.List;
import javax.servlet.http.Part;
import software.amazon.awssdk.services.s3.model.S3Object;

public interface AmazonS3_Service {

  void add(int stdNo); // 스터디 생성시 저장소 생성
  void fileAdd(Part files, int stdNo) throws IOException; // 저장소에 파일 저장
  void fileDelete(int stdNo, String fileName); // 저장소에 파일 삭제
  void delete(); // 스터디 삭제시 저장소 삭제(스터디가 삭제되면 없애야 함 스터디 기간이 끝나면 삭제하도록 해야함)
  List<S3Object> list(int stdNo); // 저장소에 있는 파일목록 출력
  void fileDownload(int stdNo, String fileName);

}
