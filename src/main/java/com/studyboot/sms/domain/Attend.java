package com.studyboot.sms.domain;

public class Attend {

  private int scheduleNo;
  private int studyNo;
  private int memberNo;
  
  @Override
  public String toString() {
    return "Attend [scheduleNo=" + scheduleNo + ", studyNo=" + studyNo + ", memberNo=" + memberNo
        + "]";
  }
  
  public int getScheduleNo() {
    return scheduleNo;
  }
  public void setScheduleNo(int scheduleNo) {
    this.scheduleNo = scheduleNo;
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
  
  
}
