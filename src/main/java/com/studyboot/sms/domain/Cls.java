package com.studyboot.sms.domain;

public class Cls {
  
  private String clsMediumNo;
  private String clsLargeNo;
  private String clsSmallNo;
  private String clsNo;
  private String name;
  @Override
  public String toString() {
    return "StudyCls [clsMediumNo=" + clsMediumNo + ", clsLargeNo=" + clsLargeNo + ", clsSmallNo="
        + clsSmallNo + ", clsNo=" + clsNo + ", name=" + name + "]";
  }
  public String getClsMediumNo() {
    return clsMediumNo;
  }
  public void setClsMediumNo(String clsMediumNo) {
    this.clsMediumNo = clsMediumNo;
  }
  public String getClsLargeNo() {
    return clsLargeNo;
  }
  public void setClsLargeNo(String clsLargeNo) {
    this.clsLargeNo = clsLargeNo;
  }
  public String getClsSmallNo() {
    return clsSmallNo;
  }
  public void setClsSmallNo(String clsSmallNo) {
    this.clsSmallNo = clsSmallNo;
  }
  public String getClsNo() {
    return clsNo;
  }
  public void setClsNo(String clsNo) {
    this.clsNo = clsNo;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  
  


}
