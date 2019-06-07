var user;

//사용자 정보 받아오기
$.getJSON('../../app/json/MyStudy/user?',
    function(obj) {

  user = obj.user;
  console.log("유저정보" + user);
});


$(document.body).bind('loaded-list', () => {
  $('.detail-btn').click((e) => {
    $("#contents").load("/studyboot/html/mystudy/view.html", function(){

    $('#drop-menu').click(function() {
      console.log("유저정보" + user);
      console.log("게시글유저" + $(e.target).attr('data-member'));
      if ($(e.target).attr('data-member') != user) {
        alert("작성자만 수정이 가능합니다");
        $('#detail-edit').hide();
        $('#detail-del').hide();
      }
    });
    loadDetail($(e.target).attr('data-no'));
  });
});
});

function loadDetail(no) {
  $.getJSON('../../app/json/MyStudy/detail?no=' + no, function(obj) {

    $('#detail-photo').attr("src", "/studyboot/upload/images/" + obj.member.photo);
    $('#detail-nick').html(obj.member.nickName);
    $('#detail-date').html(obj.date);
    $('#detail-title').html(obj.title);
    $('#detail-cont').html(obj.contents);
    $('#detail-no').html(obj.no);
    $('#detail-member').html(obj.memberNo);

    // 삭제 버튼
    $('#detail-delete').click((e) => {

      $.getJSON('../../app/json/MyStudy/delete?no=' + obj.no + 
          '&memberNo=' + obj.memberNo, function(obj) {

        alert(obj.status);
        location.reload();
      })
    });


  });
}












