package com.studyboot.sms.domain;

public class SpaceConvenienceInfo {

  private int convenienceNo;
  private int spaceNo;
  private String note;
  
  @Override
  public String toString() {
    return "SpaceConvenienceInfo [convenienceNo=" + convenienceNo + ", spaceNo=" + spaceNo
        + ", note=" + note + "]";
  }
  
  public int getConvenienceNo() {
    return convenienceNo;
  }
  public void setConvenienceNo(int convenienceNo) {
    this.convenienceNo = convenienceNo;
  }
  public int getSpaceNo() {
    return spaceNo;
  }
  public void setSpaceNo(int spaceNo) {
    this.spaceNo = spaceNo;
  }
  public String getNote() {
    return note;
  }
  public void setNote(String note) {
    this.note = note;
  }
  
}
