package com.studyboot.sms.domain;
import java.io.Serializable;
import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Inquiry implements Cloneable, Serializable {
  private static final long serialVersionUID = 1L;

  private int no;
  private int clsNo;
  private int inquiryPersonNo;
  private int suspectPersonNo;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
  private Date createdDate;
 
  private String contents;
  
  private BoardCls cls;
  private Member inquiryPerson;
  private Member suspectPerson;
  
  @Override
  public Inquiry clone() throws CloneNotSupportedException {
    return (Inquiry) super.clone();
  }

  
  
@Override
public String toString() {
	return "Inquiry [no=" + no + ", clsNo=" + clsNo + ", inquiryPersonNo=" + inquiryPersonNo + ", suspectPersonNo="
			+ suspectPersonNo + ", createdDate=" + createdDate + ", contents=" + contents + ", cls=" + cls
			+ ", inquiryPerson=" + inquiryPerson + ", suspectPerson=" + suspectPerson + "]";
}



public int getNo() {
	return no;
}

public void setNo(int no) {
	this.no = no;
}

public int getClsNo() {
	return clsNo;
}

public void setClsNo(int clsNo) {
	this.clsNo = clsNo;
}

public int getInquiryPersonNo() {
	return inquiryPersonNo;
}

public void setInquiryPersonNo(int inquiryPersonNo) {
	this.inquiryPersonNo = inquiryPersonNo;
}

public int getSuspectPersonNo() {
	return suspectPersonNo;
}

public void setSuspectPersonNo(int suspectPersonNo) {
	this.suspectPersonNo = suspectPersonNo;
}

public Date getCreatedDate() {
	return createdDate;
}

public void setCreatedDate(Date createdDate) {
	this.createdDate = createdDate;
}

public String getContents() {
	return contents;
}

public void setContents(String contents) {
	this.contents = contents;
}

public BoardCls getCls() {
	return cls;
}

public void setCls(BoardCls cls) {
	this.cls = cls;
}

public Member getInquiryPerson() {
	return inquiryPerson;
}

public void setInquiryPerson(Member inquiryPerson) {
	this.inquiryPerson = inquiryPerson;
}

public Member getSuspectPerson() {
	return suspectPerson;
}

public void setSuspectPerson(Member suspectPerson) {
	this.suspectPerson = suspectPerson;
}
  
}
