package com.studyboot.sms.web.json;

import java.util.HashMap;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
// Install the Java helper library from twilio.com/docs/libraries/java
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;


@RestController("json/SmsController")
@RequestMapping("/json/sms")
public class SmsController {

  final static Logger logger = LogManager.getLogger(SmsController.class);

  // Find your Account Sid and Auth Token at twilio.com/console
  public static final String ACCOUNT_SID =
      "AC27b874227941b2d9aa0ca91ca6268bca";
  public static final String AUTH_TOKEN =
      "e0e1dcf5a907917d4a79901606a26285";

  @GetMapping("send")
  public Object sendSms(@RequestParam String no) {
    
    HashMap<String,Object> content = new HashMap<>();
    
    Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

    String id = String.valueOf((int)(Math.random()*1000));
    
    String[] phoneNos = no.split("-");
      String phoneNo = "+82"+phoneNos[0]+phoneNos[1]+phoneNos[2];
    
    Message message = Message
        .creator(new PhoneNumber(phoneNo), // to
            new PhoneNumber("+16513500755"), // from
            "인증번호 : " + id)
        .create();
    System.out.println(message.getSid());
    
    content.put("id", id);
    
    return content;
  }
  
  
}