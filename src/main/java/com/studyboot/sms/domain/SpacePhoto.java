package com.studyboot.sms.domain;

public class SpacePhoto {

  private int no;
  private int spaceNo;
  private String filePath;
  
  @Override
  public String toString() {
    return "SpacePhoto [no=" + no + ", spaceNo=" + spaceNo + ", filePath=" + filePath + "]";
  }
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getSpaceNo() {
    return spaceNo;
  }
  public void setSpaceNo(int spaceNo) {
    this.spaceNo = spaceNo;
  }
  public String getFilePath() {
    return filePath;
  }
  public void setFilePath(String filePath) {
    this.filePath = filePath;
  }

}
