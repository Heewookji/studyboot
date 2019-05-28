package com.studyboot.sms.domain;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class MyStudyCalendar {

  private int id;
  private String title;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date start;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date end;
  
  private String memo;
  
  private int studyNo;
  private int memberNo;
  private int spaceBookingNo;
  
  @Override
  public String toString() {
    return "MyStudyCalendar [id=" + id + ", title=" + title + ", start=" + start + ", end=" + end
        + ", memo=" + memo + ", studyNo=" + studyNo + ", memberNo=" + memberNo + ", spaceBookingNo="
        + spaceBookingNo + "]";
  }
  
  public int getId() {
    return id;
  }
  public void setId(int id) {
    this.id = id;
  }
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public Date getStart() {
    return start;
  }
  public void setStart(Date start) {
    this.start = start;
  }
  public Date getEnd() {
    return end;
  }
  public void setEnd(Date end) {
    this.end = end;
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