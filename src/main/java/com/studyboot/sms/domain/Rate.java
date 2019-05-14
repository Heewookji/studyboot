package com.studyboot.sms.domain;

import java.sql.Date;

public class Rate {
  
  private int memberRateNo;
  private int studyNo;
  private int memberNo;
  private int confirmNo;
  private double rate;
  private Date rateDate;
  
  @Override
  public String toString() {
    return "Rate [memberRateNo=" + memberRateNo + ", studyNo=" + studyNo + ", memberNo=" + memberNo
        + ", confirmNo=" + confirmNo + ", rate=" + rate + ", rateDate=" + rateDate + "]";
  }
  
  public int getMemberRateNo() {
    return memberRateNo;
  }
  public void setMemberRateNo(int memberRateNo) {
    this.memberRateNo = memberRateNo;
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
  public int getConfirmNo() {
    return confirmNo;
  }
  public void setConfirmNo(int confirmNo) {
    this.confirmNo = confirmNo;
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
