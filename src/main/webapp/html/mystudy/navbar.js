var param = location.href.split('?')[1],
nos = param.split('=')[1];

$(document).ready(function() {

  $("#min_nav_bar").load("/studyboot/html/mystudy/navbar.html", function() {
    $('#std-board').attr("href", "/studyboot/html/mystudy/board.html?no=" + nos);

    $('#std-repository').click((e) => {
      window.location.href = "/studyboot/html/mystudy/repository.html?no=" + nos;
    });

    $('#std-management').click((e) => {
      window.location.href = "/studyboot/html/mystudy/management.html?no=" + nos;
    });


    $(document.body).trigger('loaded-nav');

  });
  
});


$(document.body).bind('loaded-nav', () => {
  
  $("#mystudy-imagesetting").load("/studyboot/html/mypage/imagesetting.html");
  
  $.getJSON('../../app/json/MyStudy/studyphoto?no=' + nos,
      function(obj) {

    if(obj.study.photo === 'default.jpg') {
  
      $('#study-img').attr('src', '/studyboot/upload/images/mystudy/default.jpg');
    } else {
     
      $('#study-img').attr('src', '/studyboot/upload/images/mystudy/thumbnail.' + obj.study.photo + '.jpg');
    }
    var stdMemberListTemplateSrc = $('#study-memberList').html();
    var stdMemberListGenerator = Handlebars.compile(stdMemberListTemplateSrc);
    $(stdMemberListGenerator(obj)).appendTo('#std-MemberList')

    // 평점 꽂아주기
    $("#sb-history").load("rateInfo.html");
  });
});

/*
(function (nos) {
  $.getJSON('../../app/json/MyStudy/studyProfile?no=' + nos,
      function(obj) {
    
    $('#study-img').attr('src', '/studyboot/upload/images/member/thumbnail.' + user.photo + '.jpg');
  });
}(nos));
*/
>>>>>>> refs/heads/jihwan0618

