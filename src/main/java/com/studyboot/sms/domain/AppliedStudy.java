package com.studyboot.sms.domain;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class AppliedStudy {
  
  private int studyNo;
  private int memberNo;
  private String determination;
  private boolean state;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date appliedDate;
  
  private String studyName;
  private String photo;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date startDate;
  
  
  @Override
  public String toString() {
    return "AppliedStudy [studyNo=" + studyNo + ", memberNo=" + memberNo + ", determination="
        + determination + ", state=" + state + ", appliedDate=" + appliedDate + ", studyName="
        + studyName + ", photo=" + photo + ", startDate=" + startDate + "]";
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
  public String getDetermination() {
    return determination;
  }
  public void setDetermination(String determination) {
    this.determination = determination;
  }
  public boolean isState() {
    return state;
  }
  public void setState(boolean state) {
    this.state = state;
  }
  public Date getAppliedDate() {
    return appliedDate;
  }
  public void setAppliedDate(Date appliedDate) {
    this.appliedDate = appliedDate;
  }
  public String getStudyName() {
    return studyName;
  }
  public void setStudyName(String studyName) {
    this.studyName = studyName;
  }
  public String getPhoto() {
    return photo;
  }
  public void setPhoto(String photo) {
    this.photo = photo;
  }
  public Date getStartDate() {
    return startDate;
  }
  public void setStartDate(Date startDate) {
    this.startDate = startDate;
  }
  
}
