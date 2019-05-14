package com.studyboot.sms.domain;

public class SpaceRoom {
  private int no;
  private int spaceNo;
  private String name;
  private String photo;
  private int personnel;
  private int price;

  @Override
  public String toString() {
    return "SpaceRoom [no=" + no + ", spaceNo=" + spaceNo + ", name=" + name + ", photo=" + photo
        + ", personnel=" + personnel + ", price=" + price + "]";
  }

  public int getNo() {
    return no;
  }

  public void setNo(int no) {
    this.no = no;
  }

  public int getSpaceNo() {
    return spaceNo;
  }

  public void setSpaceNo(int spaceNo) {
    this.spaceNo = spaceNo;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPhoto() {
    return photo;
  }

  public void setPhoto(String photo) {
    this.photo = photo;
  }

  public int getPersonnel() {
    return personnel;
  }

  public void setPersonnel(int personnel) {
    this.personnel = personnel;
  }

  public int getPrice() {
    return price;
  }

  public void setPrice(int price) {
    this.price = price;
  }
  
}
