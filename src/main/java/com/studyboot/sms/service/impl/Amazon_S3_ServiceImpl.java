package com.studyboot.sms.service.impl;

import org.springframework.stereotype.Service;
import com.studyboot.sms.service.AmazonS3_Service;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CreateBucketConfiguration;
import software.amazon.awssdk.services.s3.model.CreateBucketRequest;

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


  }


















