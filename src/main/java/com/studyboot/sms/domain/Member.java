package com.studyboot.sms.domain;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Member implements Cloneable, Serializable {

  private static final long serialVersionUID = 1L;


  private int no;
  private double rate;
  private String password;
  private String name;
  private String nickName;
  private String email;
  private String photo;
  private String tel;
  private List<String> cls;
  
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date birth;

  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date registeredDate;

  private boolean admin;
  private String address;
  
  
  
  @Override
  public String toString() {
    return "Member [no=" + no + ", rate=" + rate + ", password=" + password + ", name=" + name
        + ", nickName=" + nickName + ", email=" + email + ", photo=" + photo + ", tel=" + tel
        + ", cls=" + cls + ", birth=" + birth + ", registeredDate=" + registeredDate + ", admin="
        + admin + ", address=" + address + "]";
  }
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public double getRate() {
    return rate;
  }
  public void setRate(double rate) {
    this.rate = rate;
  }
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getNickName() {
    return nickName;
  }
  public void setNickName(String nickName) {
    this.nickName = nickName;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getPhoto() {
    return photo;
  }
  public void setPhoto(String photo) {
    this.photo = photo;
  }
  public String getTel() {
    return tel;
  }
  public void setTel(String tel) {
    this.tel = tel;
  }
  public List<String> getCls() {
    return cls;
  }
  public void setCls(List<String> cls) {
    this.cls = cls;
  }
  public Date getBirth() {
    return birth;
  }
  public void setBirth(Date birth) {
    this.birth = birth;
  }
  public Date getRegisteredDate() {
    return registeredDate;
  }
  public void setRegisteredDate(Date registeredDate) {
    this.registeredDate = registeredDate;
  }
  public boolean isAdmin() {
    return admin;
  }
  public void setAdmin(boolean admin) {
    this.admin = admin;
  }
  public String getAddress() {
    return address;
  }
  public void setAddress(String address) {
    this.address = address;
  }
  
  
  
  
}
