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

    $('#study_img').attr("src", "/studyboot/upload/images/" + obj.study.photo);

    var stdMemberListTemplateSrc = $('#study-memberList').html();
    var stdMemberListGenerator = Handlebars.compile(stdMemberListTemplateSrc);
    $(stdMemberListGenerator(obj)).appendTo('#std-MemberList')

    // 평점 꽂아주기 가입한 스터디 회원이 핸들바스를 통해 꽂힌 다음 모달창을 꽂아 준다.
    $("#sb-history").load("rateInfo.html");
    
    $(document.body).trigger('navbar-rate');
  });
});

$(document.body).bind('navbar-rate', () => {
});
