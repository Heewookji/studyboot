package com.studyboot.sms.domain;

import java.util.List;

public class Space {

  private int no;
  private String name;
  private String address;
  private String addressDetail;
  private String tel;
  private String intro;

  private List<SpaceTag> tags;
  private List<SpacePhoto> files;
  private List<SpaceRoom> rooms;
  private List<SpaceConvenienceInfo> spaceConvenienceInfos;
  private List<SpaceReview> spaceReview;
  
  @Override
  public String toString() {
    return "Space [no=" + no + ", name=" + name + ", address=" + address + ", addressDetail="
        + addressDetail + ", tel=" + tel + ", intro=" + intro + ", tags=" + tags + ", files="
        + files + ", rooms=" + rooms + ", spaceConvenienceInfos=" + spaceConvenienceInfos
        + ", spaceReview=" + spaceReview + "]";
  }
  
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
  public String getAddress() {
    return address;
  }
  public void setAddress(String address) {
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
  public List<SpaceRoom> getRooms() {
    return rooms;
  }
  public void setRooms(List<SpaceRoom> rooms) {
    this.rooms = rooms;
  }
  public List<SpaceConvenienceInfo> getSpaceConvenienceInfos() {
    return spaceConvenienceInfos;
  }
  public void setSpaceConvenienceInfos(List<SpaceConvenienceInfo> spaceConvenienceInfos) {
    this.spaceConvenienceInfos = spaceConvenienceInfos;
  }
  public List<SpaceReview> getSpaceReview() {
    return spaceReview;
  }
  public void setSpaceReview(List<SpaceReview> spaceReview) {
    this.spaceReview = spaceReview;
  }

  
  
}
