package com.studyboot.sms.domain;

import java.util.Date;

public class Event {
  
  private String id;
  private String title;
  private Date start;
  private Date end;
  
  public String getId() {
    return id;
  }
  public void setId(String id) {
    this.id = id;
  }
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public Date getStart() {
    return start;
  }
  public void setStart(Date start) {
    this.start = start;
  }
  public Date getEnd() {
    return end;
  }
  public void setEnd(Date end) {
    this.end = end;
  }
  @Override
  public String toString() {
    return "Event [id=" + id + ", title=" + title + ", start=" + start + ", end=" + end + "]";
  }

  
  
  
  
}
