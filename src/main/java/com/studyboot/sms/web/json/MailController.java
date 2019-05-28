package com.studyboot.sms.web.json;
import java.util.HashMap;
import java.util.UUID;
import javax.mail.internet.MimeMessage;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController("json/MailController")
@RequestMapping("/json/mail")
  public class MailController {
      
  final static Logger logger = LogManager.getLogger(MailController.class);
  
      @Autowired 
      private JavaMailSender mailSender;
      private String from = "wlgmldnr@naver.com";
      private String subject = "studyboot invites you!";
      
      @GetMapping("send")
      public Object sendMail(@RequestParam String email) {
          
        HashMap<String,Object> content = new HashMap<>();
        
        
          try {
            
              MimeMessage message = mailSender.createMimeMessage();
              MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
              messageHelper.setTo(email);
              
              String id = UUID.randomUUID().toString();
              
              messageHelper.setText("인증번호: " + id);
              
              
              messageHelper.setFrom(from);
              messageHelper.setSubject(subject);  // 메일제목은 생략이 가능하다
              
              
              mailSender.send(message);
              
              content.put("status", "success");
              content.put("id", id);
              
          } catch(Exception e){
            
            content.put("status", "fail");
          }
          
          return content;
      }
      
  }
