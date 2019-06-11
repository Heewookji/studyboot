package com.studyboot.sms.domain;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class History {
  
  private String studyName;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone = "Asia/Seoul")
  private Date joinDate;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone = "Asia/Seoul")
  private Date endDate;
  
  private double attendance;

  @Override
  public String toString() {
    return "History [studyName=" + studyName + ", joinDate=" + joinDate + ", endDate="
        + endDate + ", attendance=" + attendance + "]";
  }

  public String getStudyName() {
    return studyName;
  }

  public void setStudyName(String studyName) {
    this.studyName = studyName;
  }

  public Date getJoinDate() {
    return joinDate;
  }

  public void setJoinDate(Date joinDate) {
    this.joinDate = joinDate;
  }

  public Date getEndDate() {
    return endDate;
  }

  public void setEndDate(Date endDate) {
    this.endDate = endDate;
  }

  public double getAttendance() {
    return attendance;
  }

  public void setAttendance(double attendance) {
    this.attendance = attendance;
  }
  
}
