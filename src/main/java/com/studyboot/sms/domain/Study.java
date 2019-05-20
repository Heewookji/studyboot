package com.studyboot.sms.domain;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Study {
  
  private int no;
  private String name;
  private String address;
  private String cls;
  private String photo;
  private int day;
  private double rate;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date startDate;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date endDate;
  
  private boolean state;
  private String goal;
  private String contents;
  private int personnel;
  private int memberAge;
  private double attendance;
  private double endrate;
  private String clsName;
  
  @Override
  public String toString() {
    return "Study [no=" + no + ", name=" + name + ", address=" + address + ", cls=" + cls
        + ", photo=" + photo + ", day=" + day + ", rate=" + rate + ", startDate=" + startDate
        + ", endDate=" + endDate + ", state=" + state + ", goal=" + goal + ", contents=" + contents
        + ", personnel=" + personnel + ", memberAge=" + memberAge + ", attendance=" + attendance
        + ", endrate=" + endrate + ", clsName=" + clsName + "]";
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
  public String getAddress() {
    return address;
  }
  public void setAddress(String address) {
    this.address = address;
  }
  public String getCls() {
    return cls;
  }
  public void setCls(String cls) {
    this.cls = cls;
  }
  public String getPhoto() {
    return photo;
  }
  public void setPhoto(String photo) {
    this.photo = photo;
  }
  public int getDay() {
    return day;
  }
  public void setDay(int day) {
    this.day = day;
  }
  public double getRate() {
    return rate;
  }
  public void setRate(double rate) {
    this.rate = rate;
  }
  public Date getStartDate() {
    return startDate;
  }
  public void setStartDate(Date startDate) {
    this.startDate = startDate;
  }
  public Date getEndDate() {
    return endDate;
  }
  public void setEndDate(Date endDate) {
    this.endDate = endDate;
  }
  public boolean isState() {
    return state;
  }
  public void setState(boolean state) {
    this.state = state;
  }
  public String getGoal() {
    return goal;
  }
  public void setGoal(String goal) {
    this.goal = goal;
  }
  public String getContents() {
    return contents;
  }
  public void setContents(String contents) {
    this.contents = contents;
  }
  public int getPersonnel() {
    return personnel;
  }
  public void setPersonnel(int personnel) {
    this.personnel = personnel;
  }
  public int getMemberAge() {
    return memberAge;
  }
  public void setMemberAge(int memberAge) {
    this.memberAge = memberAge;
  }
  public double getAttendance() {
    return attendance;
  }
  public void setAttendance(double attendance) {
    this.attendance = attendance;
  }
  public double getEndrate() {
    return endrate;
  }
  public void setEndrate(double endrate) {
    this.endrate = endrate;
  }
  public String getClsName() {
    return clsName;
  }
  public void setClsName(String clsName) {
    this.clsName = clsName;
  }
  
}
