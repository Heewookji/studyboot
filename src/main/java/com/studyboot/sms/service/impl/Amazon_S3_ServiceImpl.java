package com.studyboot.sms.service.impl;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.Part;
import org.springframework.stereotype.Service;
import com.studyboot.sms.service.AmazonS3_Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CreateBucketConfiguration;
import software.amazon.awssdk.services.s3.model.CreateBucketRequest;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Request;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Object;
import software.amazon.awssdk.services.s3.paginators.ListObjectsV2Iterable;

@Service
public class Amazon_S3_ServiceImpl implements AmazonS3_Service {

  @Override
  public void add(int stdNo) {
    // 스터디 객체를 받아 add 시키면 해당 스터디의 번호로 스터디 버킷을 생성해 준다.
    Region region = Region.AP_NORTHEAST_2;
    S3Client s3 = S3Client.builder().region(region).build();

    CreateBucketRequest createBucketRequest = CreateBucketRequest
        .builder()
        .bucket("b2.sangminpark.site" + stdNo) // 해당 이름을 가진 버킷을 만든다
        .createBucketConfiguration(CreateBucketConfiguration.builder()
            .locationConstraint(region.id())
            .build())
        .build();
    s3.createBucket(createBucketRequest);
    System.out.println("버킷 생성!");
  }
  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 에드 완료
  @Override
  public void fileAdd(Part part, int stdNo) throws IOException {

    Region region = Region.AP_NORTHEAST_2;
    S3Client s3 = S3Client.builder().region(region).build();

    String filename = part.getSubmittedFileName();

    s3.putObject(
        PutObjectRequest.builder()
        .bucket("b2.sangminpark.site" + stdNo)
        .key(filename)
        .build(),
        RequestBody.fromInputStream(part.getInputStream(), part.getSize()));

    System.out.println("버킷에 파일 업로드 완료!");
  }
  
  //  END fileAdd ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡfileAdd 완료

  @Override
  public void fileDelete(int stdNo, String fileName) {

    Region region = Region.AP_NORTHEAST_2;
    S3Client s3 = S3Client.builder().region(region).build();

    // http 요청정보를 준비한다(이런 파일명을 가진 파일)
    DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
        .bucket("b2.sangminpark.site" + stdNo).key(fileName).build();
    s3.deleteObject(deleteObjectRequest);

    System.out.println("버킷의 파일 삭제!");
  }
  // END fileDelete ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡfileDelete 완료

  @Override
  public List<S3Object> list(int stdNo) {
    
    Region region = Region.AP_NORTHEAST_2;
    S3Client s3 = S3Client.builder().region(region).build();
    
    List<S3Object> filecont = new ArrayList<S3Object>();
    System.out.println("버킷의 파일 목록:");
    
    ListObjectsV2Request listReq = ListObjectsV2Request.builder()
        .bucket("b2.sangminpark.site" + stdNo)
        .maxKeys(1)
        .build();
    
    ListObjectsV2Iterable listRes = s3.listObjectsV2Paginator(listReq);
    for (S3Object content : listRes.contents()) {
      
      // 파일을 하나씩 꺼내서 List에 담는다.
      filecont.add(content);
      //System.out.println(" Key: " + content.key() + " size = " + content.size());
    }
    // List에 담은 객체를 컨트롤러 쪽으로 넘겨준다.
    return filecont;
  }
  // END listㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ90% 완료 리턴한 리스트에서 값을 어떻게 꺼내는지 질문해야함
  
  @Override
  public void fileDownload(int stdNo, String fileName) {
    
    Region region = Region.AP_NORTHEAST_2;
    S3Client s3 = S3Client.builder().region(region).build();
    
    s3.getObject(GetObjectRequest.builder()
        .bucket("b2.sangminpark.site" + stdNo).key(fileName).build(),
        // 저장할 파일의 경로를 지정해 줘야한다.
        ResponseTransformer.toFile(Paths.get("./tmp/" + fileName)));
    // ResponseTransformer = 다운로드 대행자
    // Paths = 파일 클래스와 동일 하지만 논블럭 파일 클래스의 역할을 한다.
    
    System.out.println("버킷의 파일 다운로드 완료!");
  }
  // END fileDownload

  
  @Override
  public void delete() {
    // 아직 필요한지 안필요한지 모르겠음 일단 service에 만들어 놓음 (버킷 삭제)
  }
}


















