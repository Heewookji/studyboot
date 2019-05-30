package com.studyboot.sms.web.json;

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
    public Object sendSms(@RequestParam String[] email) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

        Message message = Message
                .creator(new PhoneNumber("+14159352345"), // to
                        new PhoneNumber("+16513500755"), // from
                        "Where's Wallace?")
                .create();

        System.out.println(message.getSid());
        
        return message;
    }
}