package com.studyboot.sms.domain;

import java.io.Serializable;

public class BoardCls  implements Cloneable, Serializable {
	  private static final long serialVersionUID = 1L;

	 private int no;
	 private String name;
	 
	 
	@Override
	public String toString() {
		return "BoardCls [no=" + no + ", name=" + name + "]";
	}

	@Override
	protected BoardCls clone() throws CloneNotSupportedException {
		return (BoardCls) super.clone();
	}
	
	public int getNo() {
		return no;
	}
	public void setNo(int no) {
		this.no = no;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
