package com.studyboot.sms.domain;

import java.util.List;

public class Space {

  private int no;
  private String name;
  private int address;
  private String addressDetail;
  private String tel;
  private String intro;

  private List<SpaceTag> tags;
  private List<SpacePhoto> files;

  private SpaceTag spaceTag;
  private SpacePhoto spacePhoto;
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public int getAddress() {
    return address;
  }
  public void setAddress(int address) {
    this.address = address;
  }
  public String getAddressDetail() {
    return addressDetail;
  }
  public void setAddressDetail(String addressDetail) {
    this.addressDetail = addressDetail;
  }
  public String getTel() {
    return tel;
  }
  public void setTel(String tel) {
    this.tel = tel;
  }
  public String getIntro() {
    return intro;
  }
  public void setIntro(String intro) {
    this.intro = intro;
  }
  public List<SpaceTag> getTags() {
    return tags;
  }
  public void setTags(List<SpaceTag> tags) {
    this.tags = tags;
  }
  public List<SpacePhoto> getFiles() {
    return files;
  }
  public void setFiles(List<SpacePhoto> files) {
    this.files = files;
  }
  public SpaceTag getSpaceTag() {
    return spaceTag;
  }
  public void setSpaceTag(SpaceTag spaceTag) {
    this.spaceTag = spaceTag;
  }
  public SpacePhoto getSpacePhoto() {
    return spacePhoto;
  }
  public void setSpacePhoto(SpacePhoto spacePhoto) {
    this.spacePhoto = spacePhoto;
  }
  
}
