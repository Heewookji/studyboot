package com.studyboot.sms.domain;

public class Address {
  
  private String addressLargeNo;
  private String addressMediumNo;
  private String addressSmallNo;
  private String addressNo;
  private String name;
  
  private String largeName;
  private String mediumName;
  private String smallName;
  
  @Override
  public String toString() {
    return "Address [addressLargeNo=" + addressLargeNo + ", addressMediumNo=" + addressMediumNo
        + ", addressSmallNo=" + addressSmallNo + ", addressNo=" + addressNo + ", name=" + name
        + ", largeName=" + largeName + ", mediumName=" + mediumName + ", smallName=" + smallName
        + "]";
  }
  
  public String getAddressLargeNo() {
    return addressLargeNo;
  }
  public void setAddressLargeNo(String addressLargeNo) {
    this.addressLargeNo = addressLargeNo;
  }
  public String getAddressMediumNo() {
    return addressMediumNo;
  }
  public void setAddressMediumNo(String addressMediumNo) {
    this.addressMediumNo = addressMediumNo;
  }
  public String getAddressSmallNo() {
    return addressSmallNo;
  }
  public void setAddressSmallNo(String addressSmallNo) {
    this.addressSmallNo = addressSmallNo;
  }
  public String getAddressNo() {
    return addressNo;
  }
  public void setAddressNo(String addressNo) {
    this.addressNo = addressNo;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }

  public String getLargeName() {
    return largeName;
  }

  public void setLargeName(String largeName) {
    this.largeName = largeName;
  }

  public String getMediumName() {
    return mediumName;
  }

  public void setMediumName(String mediumName) {
    this.mediumName = mediumName;
  }

  public String getSmallName() {
    return smallName;
  }

  public void setSmallName(String smallName) {
    this.smallName = smallName;
  }
  
}
