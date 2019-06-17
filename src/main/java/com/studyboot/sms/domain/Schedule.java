package com.studyboot.sms.domain;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Schedule {

  private int id;
  private String title;
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm:ss")
  private String start;
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm:ss")
  private String end;
  private String memo;
  private String color;
  
  private int studyNo;
  private int memberNo;
  private int spaceBookingNo;
  
  private boolean allDay = false;
  private boolean studyLeader; // 스터디 장 판단을 위해 넣은 필드

  
  @Override
  public String toString() {
    return "Schedule [id=" + id + ", title=" + title + ", start=" + start + ", end=" + end
        + ", memo=" + memo + ", color=" + color + ", studyNo=" + studyNo + ", memberNo=" + memberNo
        + ", spaceBookingNo=" + spaceBookingNo + ", allDay=" + allDay + ", studyLeader="
        + studyLeader + "]";
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

  public String getStart() {
    return start;
  }

  public void setStart(String start) {
    this.start = start;
  }

  public String getEnd() {
    return end;
  }

  public void setEnd(String end) {
    this.end = end;
  }

  public String getMemo() {
    return memo;
  }

  public void setMemo(String memo) {
    this.memo = memo;
  }
  
  public String getColor() {
    return color;
  }

  public void setColor(String color) {
    this.color = color;
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

  public boolean isAllDay() {
    return allDay;
  }

  public void setAllDay(boolean allDay) {
    this.allDay = allDay;
  }

  public boolean isStudyLeader() {
    return studyLeader;
  }

  public void setStudyLeader(boolean studyLeader) {
    this.studyLeader = studyLeader;
  }


}