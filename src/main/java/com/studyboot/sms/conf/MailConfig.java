package com.studyboot.sms.conf;
import java.util.Properties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl; 

@Configuration 
public class MailConfig { 
  

  @Bean 
  public static JavaMailSender javaMailSender(){
   
    JavaMailSenderImpl mailSender = new JavaMailSenderImpl(); 
    mailSender.setDefaultEncoding("UTF-8");
    mailSender.setHost("smtp.naver.com"); 
    mailSender.setPort(587);
    mailSender.setUsername("wlgmldnr@naver.com"); 
    mailSender.setPassword("FWUCSUS1L5Y9"); 
    Properties prop = new Properties();
    prop.put("mail.smtp.auth", true);
    prop.put("mail.smtp.starttls.enable", true);
    prop.put("mail.smtp.ssl.trust", "smtp.naver.com");

    
    mailSender.setJavaMailProperties(prop);
    return mailSender; 

  } 

}

