


function loadDetail(no) {
  $.getJSON('../../app/json/MyStudy/detail?no=' + no, function(obj) {

    console.log(obj);
    
    $('#detail-photo').attr("src", "/studyboot/upload/images/" + obj.member.photo);
    $('#detail-nick').html(obj.member.nickName);
    $('#detail-date').html(obj.date);
    $('#detail-title').html(obj.title);
    $('#detail-cont').html(obj.contents);
    
    $(document.body).trigger('loaded-detail');

  });

}


//board 핸들바스 사용해 리스트 전부 출력완료
//$(document.body).bind('loaded-list', () => {
//alert("view.js");
//$('.detail-btn').click((e) => {
//e.preventDefault();
//loadDetail($(e.target).attr('data-no'));
//});
//});

//loadDetail 전부 완료된 후 
//$(document.body).bind('loaded-detail', () => {

//$("#contents").load("/studyboot/html/mystudy/view.html", function(){

//});
//});


/*
 $('.loaded-detail').click((e) => {
    alert("okok");
    $("#contents").load("/studyboot/html/mystudy/view.html", function(){

      alert($(e.target).attr('data-no'));
    });



  });
 */




$(document.body).bind('loaded-list', () => {
  $('.detail-btn').click((e) => {
    $("#contents").load("/studyboot/html/mystudy/view.html", function(){

      loadDetail($(e.target).attr('data-no'));

    });
  });
});












