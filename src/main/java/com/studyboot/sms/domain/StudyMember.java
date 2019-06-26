package com.studyboot.sms.domain;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

@SuppressWarnings("serial")
public class StudyMember extends Member {
  
  private int studyNo;
  private int memberNo;
  private int endNo;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone = "Asia/Seoul")
  private Date joinDate;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone = "Asia/Seoul")
  private Date endDate;
  private boolean leader;
  private double attendance;
  private int upload;
  
  private String studyName;
  private Member member;
  
  private String memberCls = "스터디원";

  @Override
  public String toString() {
    return "StudyMember [studyNo=" + studyNo + ", memberNo=" + memberNo + ", endNo=" + endNo
        + ", joinDate=" + joinDate + ", endDate=" + endDate + ", leader=" + leader + ", attendance="
        + attendance + ", upload=" + upload + ", studyName=" + studyName + ", member=" + member
        + ", memberCls=" + memberCls + "]";
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

  public int getEndNo() {
    return endNo;
  }

  public void setEndNo(int endNo) {
    this.endNo = endNo;
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

  public boolean getLeader() {
    return leader;
  }

  public void setLeader(boolean leader) {
    this.leader = leader;
  }

  public double getAttendance() {
    return attendance;
  }

  public void setAttendance(double attendance) {
    this.attendance = attendance;
  }

  public int getUpload() {
    return upload;
  }

  public void setUpload(int upload) {
    this.upload = upload;
  }

  public String getStudyName() {
    return studyName;
  }

  public void setStudyName(String studyName) {
    this.studyName = studyName;
  }

  public Member getMember() {
    return member;
  }

  public void setMember(Member member) {
    this.member = member;
  }

  public String getMemberCls() {
    return memberCls;
  }

  public void setMemberCls(String memberCls) {
    this.memberCls = memberCls;
  }

  
  
}
