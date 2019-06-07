package com.studyboot.sms.domain;

public class EndRate {
  private Double completePercent;
  private Double dropPercent;
  private Double exilePercent;
  
  @Override
  public String toString() {
    return "EndRate [completePercent=" + completePercent + ", dropPercent=" + dropPercent
        + ", exilePercent=" + exilePercent + "]";
  }
  
  public Double getCompletePercent() {
    return completePercent;
  }
  public void setCompletePercent(Double completePercent) {
    this.completePercent = completePercent;
  }
  public Double getDropPercent() {
    return dropPercent;
  }
  public void setDropPercent(Double dropPercent) {
    this.dropPercent = dropPercent;
  }
  public Double getExilePercent() {
    return exilePercent;
  }
  public void setExilePercent(Double exilePercent) {
    this.exilePercent = exilePercent;
  }
  
}
