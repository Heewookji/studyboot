package com.studyboot.sms.domain;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class MyStudyCalendar {

  private int no;
  private String name;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date scheduleStartDate;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date scheduleStartEnd;
  
  private String memo;
  
  private int studyNo;
  private int memberNo;
  private int spaceBookingNo;
  
  @Override
  public String toString() {
    return "MyStudyCalendar [no=" + no + ", name=" + name + ", scheduleStartDate="
        + scheduleStartDate + ", scheduleStartEnd=" + scheduleStartEnd + ", memo=" + memo
        + ", studyNo=" + studyNo + ", memberNo=" + memberNo + ", spaceBookingNo=" + spaceBookingNo
        + "]";
  }
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public Date getScheduleStartDate() {
    return scheduleStartDate;
  }
  public void setScheduleStartDate(Date scheduleStartDate) {
    this.scheduleStartDate = scheduleStartDate;
  }
  public Date getScheduleStartEnd() {
    return scheduleStartEnd;
  }
  public void setScheduleStartEnd(Date scheduleStartEnd) {
    this.scheduleStartEnd = scheduleStartEnd;
  }
  public String getMemo() {
    return memo;
  }
  public void setMemo(String memo) {
    this.memo = memo;
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
  public int getSpaceBookingNo() {
    return spaceBookingNo;
  }
  public void setSpaceBookingNo(int spaceBookingNo) {
    this.spaceBookingNo = spaceBookingNo;
  }
  
}