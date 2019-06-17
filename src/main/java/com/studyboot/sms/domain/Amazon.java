package com.studyboot.sms.domain;

public class Amazon {
  
  private String fileName;
  private Long fileSize;
  private String extenstion;
  
  @Override
  public String toString() {
    return "Amazon [fileName=" + fileName + ", fileSize=" + fileSize + ", extenstion=" + extenstion
        + "]";
  }

  public String getFileName() {
    return fileName;
  }

  public void setFileName(String fileName) {
    this.fileName = fileName;
  }

  public Long getFileSize() {
    return fileSize;
  }

  public void setFileSize(Long fileSize) {
    this.fileSize = fileSize;
  }

  public String getExtenstion() {
    return extenstion;
  }

  public void setExtenstion(String extenstion) {
    this.extenstion = extenstion;
  }
 
}
