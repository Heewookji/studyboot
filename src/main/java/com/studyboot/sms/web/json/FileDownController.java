package com.studyboot.sms.web.json;

import java.io.OutputStream;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.studyboot.sms.service.AmazonS3_Service;


// AJAX 기반 JSON 데이터를 다루는 컨트롤러
@RestController("json/FileDownController")
@RequestMapping("/json/FileDown")
public class FileDownController {

  @Autowired AmazonS3_Service amazonS3_Service;

  @GetMapping(path="fileDownload")
  public void fileDownload(
      @RequestParam String fileName,
      @RequestParam int studyNo,
      HttpServletResponse response,
      OutputStream out) {

    try {
      response.setContentType("application/download");
      amazonS3_Service.fileDownload(studyNo, fileName, out);
    } catch (Exception e) {
      e.printStackTrace();
    }

  }

}










