package com.studyboot.sms.domain;

import java.util.List;

public class SpaceConvenienceInfo {

  private int convenienceNo;
  private int spaceNo;
  private String note;
  private List<SpaceConvenience> spaceConveniences;
  
  @Override
  public String toString() {
    return "SpaceConvenienceInfo [convenienceNo=" + convenienceNo + ", spaceNo=" + spaceNo
        + ", note=" + note + ", spaceConveniences=" + spaceConveniences + "]";
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
  public List<SpaceConvenience> getSpaceConveniences() {
    return spaceConveniences;
  }
  public void setSpaceConveniences(List<SpaceConvenience> spaceConveniences) {
    this.spaceConveniences = spaceConveniences;
  }
  

}
