package com.studyboot.sms.domain;

import java.util.Date;

public class SpaceRoomBooking {
  
  private int no;
  private int roomNo;
  private int studyNo;
  private int memberId;
  private Date bookingDate;
  private int rating;
  private String review;
  
  @Override
  public String toString() {
    return "SpaceRoomBooking [no=" + no + ", roomNo=" + roomNo + ", studyNo=" + studyNo
        + ", memberId=" + memberId + ", bookingDate=" + bookingDate + ", rating=" + rating
        + ", review=" + review + "]";
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
  public int getMemberId() {
    return memberId;
  }
  public void setMemberId(int memberId) {
    this.memberId = memberId;
  }
  public Date getBookingDate() {
    return bookingDate;
  }
  public void setBookingDate(Date bookingDate) {
    this.bookingDate = bookingDate;
  }
  public int getRating() {
    return rating;
  }
  public void setRating(int rating) {
    this.rating = rating;
  }
  public String getReview() {
    return review;
  }
  public void setReview(String review) {
    this.review = review;
  }
  
}
