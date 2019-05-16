package com.studyboot.sms.domain;
import java.io.Serializable;
import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Message implements Cloneable, Serializable {
  private static final long serialVersionUID = 1L;

  private int messageNo;
  private int sendNo;
  private int recvNo;
  private String contents;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm")
  private Date date;
  
  private Member messagePerson;

  @Override
  public String toString() {
    return "Message [messageNo=" + messageNo + ", sendNo=" + sendNo + ", recvNo=" + recvNo
        + ", contents=" + contents + ", date=" + date + ", messagePerson=" + messagePerson + "]";
  }

  public int getMessageNo() {
    return messageNo;
  }

  public void setMessageNo(int messageNo) {
    this.messageNo = messageNo;
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
