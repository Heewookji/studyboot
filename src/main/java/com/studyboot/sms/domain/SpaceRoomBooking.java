package com.studyboot.sms.domain;

import java.util.Date;

public class SpaceRoomBooking {
  
  private int no;
  private int roomNo;
  private int studyNo;
  private int memberNo;
  private Date bookingStartDate;
  private Date bookingEndDate;
  
  @Override
  public String toString() {
    return "SpaceRoomBooking [no=" + no + ", roomNo=" + roomNo + ", studyNo=" + studyNo
        + ", memberNo=" + memberNo + ", bookingStartDate=" + bookingStartDate + ", bookingEndDate="
        + bookingEndDate + "]";
  }
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getRoomNo() {
    return roomNo;
  }
  public void setRoomNo(int roomNo) {
    this.roomNo = roomNo;
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
  public Date getBookingStartDate() {
    return bookingStartDate;
  }
  public void setBookingStartDate(Date bookingStartDate) {
    this.bookingStartDate = bookingStartDate;
  }
  public Date getBookingEndDate() {
    return bookingEndDate;
  }
  public void setBookingEndDate(Date bookingEndDate) {
    this.bookingEndDate = bookingEndDate;
  }
  
}
