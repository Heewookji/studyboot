package com.studyboot.sms.domain;

public class RateRequire {

  private int studyNo;
  private int memberNo;
  private boolean rateRequire;
  private String nickName;
  private String photo;
  private String name;
  private int studyRateRequireCount;
  
  @Override
  public String toString() {
    return "RateRequire [studyNo=" + studyNo + ", memberNo=" + memberNo + ", rateRequire="
        + rateRequire + ", nickName=" + nickName + ", photo=" + photo + ", name=" + name
        + ", studyRateRequireCount=" + studyRateRequireCount + "]";
  }
  
  public int getStudyNo() {
    return studyNo;
  }
  public void setStudyNo(int studyNo) {
    this.studyNo = studyNo;
  }
  public int getMemberNo() {
    return memberNo;
  }
  public void setMemberNo(int memberNo) {
    this.memberNo = memberNo;
  }
  public boolean isRateRequire() {
    return rateRequire;
  }
  public void setRateRequire(boolean rateRequire) {
    this.rateRequire = rateRequire;
  }
  public String getNickName() {
    return nickName;
  }
  public void setNickName(String nickName) {
    this.nickName = nickName;
  }
  public String getPhoto() {
    return photo;
  }
  public void setPhoto(String photo) {
    this.photo = photo;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public int getStudyRateRequireCount() {
    return studyRateRequireCount;
  }
  public void setStudyRateRequireCount(int studyRateRequireCount) {
    this.studyRateRequireCount = studyRateRequireCount;
  }
  
}
