package com.studyboot.sms.domain;

import java.sql.Date;

public class MemberRate {
  private int memberRateNo;
  private int studyNo;
  private int memberNo;
  private double rate;
  private Date rateDate;
  
  @Override
  public String toString() {
    return "MemberRate [memberRateNo=" + memberRateNo + ", studyNo=" + studyNo + ", memberNo="
        + memberNo + ", rate=" + rate + ", rateDate=" + rateDate + "]";
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
