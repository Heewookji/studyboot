package com.studyboot.sms.domain;

public class Attend {

  private int scheduleNo;
  private int studyNo;
  private int memberNo;
  
  private String nickName;

  @Override
  public String toString() {
    return "Attend [scheduleNo=" + scheduleNo + ", studyNo=" + studyNo + ", memberNo=" + memberNo
        + ", nickName=" + nickName + "]";
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

  public String getNickName() {
    return nickName;
  }

  public void setNickName(String nickName) {
    this.nickName = nickName;
  }
  
}
