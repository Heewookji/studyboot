package com.studyboot.sms.domain;
import java.io.Serializable;
import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class StudyBoard implements Cloneable, Serializable {
  private static final long serialVersionUID = 1L;

  private int no;
  private int studyNo;
  private int memberNo;
  private int ntc;
  private String title;
  private String contents;
  private int cls;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm")
  private Date date;
  
  private int viewCount;
  private Member member;
  
  @Override
  public String toString() {
    return "StudyBoard [no=" + no + ", studyNo=" + studyNo + ", memberNo=" + memberNo + ", ntc="
        + ntc + ", title=" + title + ", contents=" + contents + ", cls=" + cls + ", date=" + date
        + ", viewCount=" + viewCount + ", suspectPerson=" + member + "]";
  }
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
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
  public int getNtc() {
    return ntc;
  }
  public void setNtc(int ntc) {
    this.ntc = ntc;
  }
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public String getContents() {
    return contents;
  }
  public void setContents(String contents) {
    this.contents = contents;
  }
  public int getCls() {
    return cls;
  }
  public void setCls(int cls) {
    this.cls = cls;
  }
  public Date getDate() {
    return date;
  }
  public void setDate(Date date) {
    this.date = date;
  }
  public int getViewCount() {
    return viewCount;
  }
  public void setViewCount(int viewCount) {
    this.viewCount = viewCount;
  }
  public Member getMember() {
    return member;
  }
  public void setMember(Member member) {
    this.member = member;
  }
  public static long getSerialversionuid() {
    return serialVersionUID;
  }
  
}
