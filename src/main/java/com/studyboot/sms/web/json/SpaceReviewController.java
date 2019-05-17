package com.studyboot.sms.web.json;

import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.studyboot.sms.domain.SpaceReview;
import com.studyboot.sms.service.SpaceReviewService;

@RestController("json/SpaceReviewController")
@RequestMapping("/json/space")
public class SpaceReviewController {

  @Autowired SpaceReviewService spaceReviewService;

  @PostMapping("add/review")
  public Object add(SpaceReview spaceReview) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      spaceReviewService.addReview(spaceReview);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @GetMapping("delete/review")
  public Object delete(int no) {

    HashMap<String,Object> content = new HashMap<>();
    try {
      if (spaceReviewService.deleteReview(no) == 0)
        throw new RuntimeException("해당 리뷰가 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @PostMapping("update/review")
  public Object update(SpaceReview spaceReview) {
    System.out.println("---------------------------------------------------------");
    System.out.println(spaceReview);
    System.out.println("---------------------------------------------------------");
    
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (spaceReviewService.updateReview(spaceReview) == 0) 
        throw new RuntimeException("해당 리뷰가 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
}










