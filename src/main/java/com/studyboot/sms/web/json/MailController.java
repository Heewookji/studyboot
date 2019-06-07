package com.studyboot.sms.web.json;
import java.util.HashMap;
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
import com.studyboot.sms.domain.Member;
import com.studyboot.sms.service.MemberService;

@RestController("json/MailController")
@RequestMapping("/json/mail")
  public class MailController {
      
  final static Logger logger = LogManager.getLogger(MailController.class);
  
      @Autowired 
      private JavaMailSender mailSender;
      @Autowired 
      MemberService memberService;
      private String from = "wlgmldnr@naver.com";
      private String subject = "studyboot invites you!";
      
      @GetMapping("send")
      public Object sendMail(@RequestParam String email) {
          
        HashMap<String,Object> content = new HashMap<>();
        
        
          try {
            
              MimeMessage message = mailSender.createMimeMessage();
              MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
              messageHelper.setTo(email);
              
              int id = (int)(Math.random() * 1000);
              
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
      
      
      
      @GetMapping("sendpasswordmail")
      public Object sendPasswordMail(@RequestParam String email) {
          
        HashMap<String,Object> content = new HashMap<>();
        
        Member member = memberService.get(email);
        
        if(member != null) {
           
          try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
            messageHelper.setTo(email);
            
            String id = String.valueOf((int)(Math.random() * 10000000));
            
            messageHelper.setText("임시비밀번호는 " + id + " 입니다! \n"
                + "로그인 후 꼭 비밀번호를 다시 변경해주세요!");
            
            
            messageHelper.setFrom(from);
            messageHelper.setSubject("studyboot: 임시 비밀번호 발송");  // 메일제목은 생략이 가능하다
            
            
            mailSender.send(message);
            
            content.put("status", "success");
            content.put("id", id);
            
            member.setPassword(id);
            
            memberService.update(member);
            
        } catch(Exception e){
          
          content.put("status", "fail");
        }
          
        } else {
          content.put("status", "fail");
        }
        
        
          
          return content;
      }
  }
