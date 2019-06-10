package com.studyboot.sms.domain;

public class RateRequire {
  
  private int studyNo;
  private int memberNo;
  private boolean rateRequire;
  
  @Override
  public String toString() {
    return "RateRequire [studyNo=" + studyNo + ", memberNo=" + memberNo + ", rateRequire="
        + rateRequire + "]";
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

  public boolean getRateRequire() {
    return rateRequire;
  }

  public void setRateRequire(boolean rateRequire) {
    this.rateRequire = rateRequire;
  }
  
}
