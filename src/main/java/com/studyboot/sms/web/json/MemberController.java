package com.studyboot.sms.web.json;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.studyboot.sms.domain.Member;
import com.studyboot.sms.service.MemberService;


@RestController("json/MemberController")
@RequestMapping("/json/member")
public class MemberController {

  @Autowired MemberService memberService;

  /*
  @GetMapping("delete")
  public Object delete(int no) {

    HashMap<String,Object> content = new HashMap<>();
    try {
      if (memberService.delete(no) == 0) 
        throw new RuntimeException("해당 번호의 공간이 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
   */

  @GetMapping("detail")
  public Object detail(HttpSession session) {
    
    Member loginUser = (Member) session.getAttribute("loginUser");
    
    Member member = memberService.get(loginUser.getNo());
    return member;
  }


  @PostMapping("update")
  public Object update(HttpSession session, Member member) {
    
    Member loginUser = (Member) session.getAttribute("loginUser");
    member.setNo(loginUser.getNo());
    
    Map<String,Object> content = new HashMap<>();
    
    try {
      if (memberService.update(member) == 0) 
        throw new RuntimeException("해당 번호의 공간이 없습니다.");
      
      loginUser = memberService.get(loginUser.getNo());
      
      session.setAttribute("loginUser", loginUser);
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @PostMapping("nickcheck")
  public Object nickcheck(@RequestBody String nickName) {
    
    int count = 0;
    Map<String, Object> map = new HashMap<>();

    count = memberService.nickNameCheck(nickName);
    map.put("cnt", count);

    return map;
  }

  @PostMapping("passwordcheck")
  public Object passwordcheck(
      HttpSession session,
      @RequestBody String password) {
    
    boolean result = false;
    Map<Object, Object> map = new HashMap<Object, Object>();
    
    Member loginUser = (Member) session.getAttribute("loginUser");

    result = memberService.passwordCheck(loginUser.getEmail(), password);
    System.out.println(result);
    map.put("result", result);

    return map;
  }
}






