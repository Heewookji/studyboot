package com.studyboot.sms.domain;

import java.sql.Date;

public class StudyMember {
  
  private int studyNo;
  private int memberNo;
  private int endNo;
  private Date joinDate;
  private Date endDate;
  private boolean leader;
  private double attendance;
  private int upload;
  private double rate;
  private Date rateDate;
  
  @Override
  public String toString() {
    return "StudyMember [studyNo=" + studyNo + ", memberNo=" + memberNo + ", endNo=" + endNo
        + ", joinDate=" + joinDate + ", endDate=" + endDate + ", leader=" + leader + ", attendance="
        + attendance + ", upload=" + upload + ", rate=" + rate + ", rateDate=" + rateDate + "]";
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
  public int getEndNo() {
    return endNo;
  }
  public void setEndNo(int endNo) {
    this.endNo = endNo;
  }
  public Date getJoinDate() {
    return joinDate;
  }
  public void setJoinDate(Date joinDate) {
    this.joinDate = joinDate;
  }
  public Date getEndDate() {
    return endDate;
  }
  public void setEndDate(Date endDate) {
    this.endDate = endDate;
  }
  public boolean isLeader() {
    return leader;
  }
  public void setLeader(boolean leader) {
    this.leader = leader;
  }
  public double getAttendance() {
    return attendance;
  }
  public void setAttendance(double attendance) {
    this.attendance = attendance;
  }
  public int getUpload() {
    return upload;
  }
  public void setUpload(int upload) {
    this.upload = upload;
  }
  public double getRate() {
    return rate;
  }
  public void setRate(double rate) {
    this.rate = rate;
  }
  public Date getRateDate() {
    return rateDate;
  }
  public void setRateDate(Date rateDate) {
    this.rateDate = rateDate;
  }
  
}
