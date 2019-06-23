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

//    if(obj.study.photo === 'default.jpg') {
//  
//      $('#study-img').attr('src', '/studyboot/upload/images/mystudy/default.jpg');
//    } else {
     
      $('#study-img').attr('src', '/studyboot/upload/images/mystudy/thumbnail.' + obj.study.photo + '.jpg');
//    }
    var stdMemberListTemplateSrc = $('#study-memberList').html();
    var stdMemberListGenerator = Handlebars.compile(stdMemberListTemplateSrc);
    $(stdMemberListGenerator(obj)).appendTo('#std-MemberList')

     $(document.body).trigger('messageAddModalLoad');
    
    // 평점 꽂아주기 가입한 스터디 회원이 핸들바스를 통해 꽂힌 다음 모달창을 꽂아 준다.
    $("#sb-history").load("rateInfo.html", function(e) {
      $('.apply-modal-btn').click((e) => {
        $('#userNo').attr('data-no', $(e.target).parents('.refuse-mem').find('a').attr('data-no'));
        $('#historyModal').modal('show');
      });
    });
    
    $(document.body).trigger('navbar-rate');
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


$(document.body).bind('navbar-rate', () => {
});

$(document.body).bind('messageAddModalLoad', () => {
  
  $("#message-add").load("/studyboot/html/message/messageAddModal.html", function(e) {
    $('.study-message').click((e) => {

      $('#message-add-nick').attr('nick-name',$(e.target).parents('.message-li').find('a').attr('nick-name'));
      $('#addModal').modal('show');
    });
  });
});


(function (nos) {
$.getJSON('../../app/json/MyStudy/studyName?studyNo=' + nos, function(obj) {
	  console.log(obj.name);
	  $('#study-name').html(obj.name);
});
})(nos);