package com.studyboot.sms.domain;

import java.sql.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Study {
  
  private int no;
  private String name;
  private String address;
  private String cls;
  private String photo;
  private int day;
  private double rate;
  private boolean recruitApply;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="Asia/Seoul")
  private Date startDate;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="Asia/Seoul")
  private Date endDate;
  
  private boolean state;
  private String goal;
  private String contents;
  private int personnel;
  private int nowPersonnel;
  private int memberAge;
  private double attendance;
  private double endrate;
  private String clsName;
  private String addressName;
  private List<String> dayStrList;
  private Long totalDateDiff;
  private Long currentDateDiff;
  private List<StudyMember> studyMembers;
  private List<Cls> clsList;
  
  public List<Cls> getClsList() {
    return clsList;
  }
  public void setClsList(List<Cls> clsList) {
    this.clsList = clsList;
  }
  public List<StudyMember> getStudyMembers() {
    return studyMembers;
  }
  public void setStudyMembers(List<StudyMember> studyMembers) {
    this.studyMembers = studyMembers;
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
  public boolean isRecruitApply() {
    return recruitApply;
  }
  public void setRecruitApply(boolean recruitApply) {
    this.recruitApply = recruitApply;
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
  public int getNowPersonnel() {
    return nowPersonnel;
  }
  public void setNowPersonnel(int nowPersonnel) {
    this.nowPersonnel = nowPersonnel;
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
  public String getAddressName() {
    return addressName;
  }
  public void setAddressName(String addressName) {
    this.addressName = addressName;
  }
  public List<String> getDayStrList() {
    return dayStrList;
  }
  public void setDayStrList(List<String> dayStrList) {
    this.dayStrList = dayStrList;
  }
  public Long getTotalDateDiff() {
    return totalDateDiff;
  }
  public void setTotalDateDiff(Long totalDateDiff) {
    this.totalDateDiff = totalDateDiff;
  }
  public Long getCurrentDateDiff() {
    return currentDateDiff;
  }
  public void setCurrentDateDiff(Long currentDateDiff) {
    this.currentDateDiff = currentDateDiff;
  }
  @Override
  public String toString() {
    return "Study [no=" + no + ", name=" + name + ", address=" + address + ", cls=" + cls
        + ", photo=" + photo + ", day=" + day + ", rate=" + rate + ", recruitApply=" + recruitApply
        + ", startDate=" + startDate + ", endDate=" + endDate + ", state=" + state + ", goal="
        + goal + ", contents=" + contents + ", personnel=" + personnel + ", nowPersonnel="
        + nowPersonnel + ", memberAge=" + memberAge + ", attendance=" + attendance + ", endrate="
        + endrate + ", clsName=" + clsName + ", addressName=" + addressName + ", dayStrList="
        + dayStrList + ", totalDateDiff=" + totalDateDiff + ", currentDateDiff=" + currentDateDiff
        + ", studyMembers=" + studyMembers + ", clsList=" + clsList + "]";
  }
  
  
}
