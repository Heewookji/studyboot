package com.studyboot.sms.domain;
import java.io.Serializable;
import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Message implements Cloneable, Serializable {
  private static final long serialVersionUID = 1L;

  private int no;
  private int sendNo;
  private int recvNo;
  private String contents;
  private String title;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm")
  private Date date;
  
  private Member messagePerson;
  
  @Override
  public String toString() {
    return "Message [no=" + no + ", sendNo=" + sendNo + ", recvNo=" + recvNo + ", contents="
        + contents + ", title=" + title + ", date=" + date + ", messagePerson=" + messagePerson
        + "]";
  }

  public int getNo() {
    return no;
  }

  public void setNo(int no) {
    this.no = no;
  }

  public int getSendNo() {
    return sendNo;
  }

  public void setSendNo(int sendNo) {
    this.sendNo = sendNo;
  }

  public int getRecvNo() {
    return recvNo;
  }

  public void setRecvNo(int recvNo) {
    this.recvNo = recvNo;
  }

  public String getContents() {
    return contents;
  }

  public void setContents(String contents) {
    this.contents = contents;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  public Member getMessagePerson() {
    return messagePerson;
  }

  public void setMessagePerson(Member messagePerson) {
    this.messagePerson = messagePerson;
  }

  public static long getSerialversionuid() {
    return serialVersionUID;
  }

}
