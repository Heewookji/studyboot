package com.studyboot.sms.domain;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class RateLog {
  
  private int rateLogNo;
  private int memberNo;
  private double rate;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone = "Asia/Seoul")
  private Date updateDate;

  
  @Override
  public String toString() {
    return "RateLog [rateLogNo=" + rateLogNo + ", memberNo=" + memberNo + ", rate=" + rate
        + ", updateDate=" + updateDate + "]";
  }

  public int getRateLogNo() {
    return rateLogNo;
  }

  public void setRateLogNo(int rateLogNo) {
    this.rateLogNo = rateLogNo;
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

  public Date getUpdateDate() {
    return updateDate;
  }

  public void setUpdateDate(Date updateDate) {
    this.updateDate = updateDate;
  }
  
}
