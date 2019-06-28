var param = location.href.split('?')[1],
nos = param.split('=')[1];

$(document).ready(function() {

  
  $("#min_nav_bar").load("/studyboot/html/mystudy/navbar.html", function() {
    
    
    $('#std-board').attr("href", "/studyboot/html/mystudy/board.html?no=" + nos);

    $('#std-repository').click((e) => {
      window.location.href = "/studyboot/html/mystudy/repository.html?no=" + nos;
    });

    $('#std-management').click((e) => {
      
      if(window.leader == false) {
          Swal.fire({
            type: 'error',
            title: errorTitle,
            text: '스터디 관리 권한이 없습니다.',
            showConfirmButton: false,
            timer: 1500
          });
          return;
      } else {
        window.location.href = "/studyboot/html/mystudy/management.html?no=" + nos;
      }
      
    });

    $(document.body).trigger('loaded-nav');
    $(document.body).trigger('study-name');

  });

});


$(document.body).bind('loaded-nav', () => {

  
  
  $("#mystudy-imagesetting").load("/studyboot/html/mypage/imagesetting.html");

  
  $.getJSON('../../app/json/MyStudy/studyphoto?no=' + nos,
      function(obj) {

//  if(obj.study.photo === 'default.jpg') {

//  $('#study-img').attr('src', '/studyboot/upload/images/mystudy/default.jpg');
//  } else {

    $('#study-img').attr('src', '/studyboot/upload/images/mystudy/thumbnail.' + obj.study.photo + '.jpg');
//  }
    var stdMemberListTemplateSrc = $('#study-memberList').html();
    var stdMemberListGenerator = Handlebars.compile(stdMemberListTemplateSrc);
//  $(stdMemberListGenerator(obj)).appendTo('#std-MemberList');

    if  (obj.list.length === 1) {
      $(stdMemberListGenerator(obj)).appendTo('#std-MemberList');

      var memberCard =
        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>" +

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>" +

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>"+

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>"+

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>"+

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>"+

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>";

      $("#std-MemberList").append(memberCard);

    } else if(obj.list.length === 2) {

      $(stdMemberListGenerator(obj)).appendTo('#std-MemberList');

      var memberCard =
        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui seven column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>" +

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>" +

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>"+

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>"+

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>"+

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>";

      $("#std-MemberList").append(memberCard);

    } else if(obj.list.length === 3) {

      $(stdMemberListGenerator(obj)).appendTo('#std-MemberList');

      var memberCard =
        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui seven column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>" +

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>" +

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>"+

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>"+

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>" ;

      $("#std-MemberList").append(memberCard);

    } else if(obj.list.length === 4) {

      $(stdMemberListGenerator(obj)).appendTo('#std-MemberList');

      var memberCard =
        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui seven column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>" +

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>" +

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>"+

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>";
      
      $("#std-MemberList").append(memberCard);

    } else if (obj.list.length === 5) {
      $(stdMemberListGenerator(obj)).appendTo('#std-MemberList');

      var memberCard =

//      "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
//      "<div class='ui raised segment'>"+
//      "<div class='row'>"+
//      "<div class='col-2'>"+
//      "<div class='ui placeholder rounded-circle g-height-40 g-width-40'>"+
//      "<div class='image'></div>"+
//      "</div>"+
//      "</div>"+
//      "<div class='col g-pl-20'>"+
//      "<div class='ui placeholder'>"+
//      "<div class='line'></div>"+
//      "<div class='line'></div>"+
//      "</div>"+
//      "</div>"+
//      "</div>"+
//      "</div>"+
//      "</div>"+
//      "</li>" +

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui olumn stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>" +

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>" +

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>";

      $("#std-MemberList").append(memberCard);

    } else if (obj.list.length === 6) {
      $(stdMemberListGenerator(obj)).appendTo('#std-MemberList');

      var memberCard =
        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>" +

        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>";

      $("#std-MemberList").append(memberCard);

    }   else if (obj.list.length === 7) {
      $(stdMemberListGenerator(obj)).appendTo('#std-MemberList');

      var memberCard =
        "<li class='g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-minus-1'>"+
        "<div class='ui column stackable grid'>" +
        "<div class='column'>" +
        "<div class='ui raised segment'>" +
        "<div class='ui placeholder'>" +
        "<div class='image header'>" +
        "<div class='line'></div>" +
        "<div class='line'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>";

      $("#std-MemberList").append(memberCard);

    } else {
      $(stdMemberListGenerator(obj)).appendTo('#std-MemberList');
    }

    $(document.body).trigger('messageAddModalLoad');
    $(document.body).trigger('study-deport');

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

$(document.body).bind('study-name', () => {
  (function (nos) {
    $.getJSON('../../app/json/MyStudy/studyName?studyNo=' + nos, function(obj) {
      console.log("스터디 네임: "+obj.name);

      $('.study-name').html(obj.name);
    });
  })(nos);
});


$(document.body).bind('study-deport', () => {

  (function (myStudyNo) {
    $.getJSON('../../app/json/MyStudy/leader?no=' + myStudyNo,
        function(obj) {
      window.leader = obj.leader;
      console.log(window.leader);
    });
  }(myStudyNo));
  
  if (window.leader == true) {
    $('.deport-li').show(); 
  }
  
  $('.study-deport').click((e) => {

    var nickName = $(e.target).attr("nick-name");

    Swal.fire({
      title: '해당 멤버를 추방 하시겠습니까?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.value) {

        (function (myStudyNo) { // 해당 멤버 추방
          $.getJSON('../../app/json/retireEvaluation/deport?nickName=' + nickName + '&studyNo=' + myStudyNo,
              function(obj) {
            if(obj.status == "success") {

              // 추방 후 해당 멤버에게 쪽지 보냄
              $("#message-add").load("/studyboot/html/message/messageAddModal.html", function(e) {
                $('#message-add-nick').attr('nick-name', nickName);
                $('#addModal').modal('show');
                
                // 쪽지 후 리로드
                $('#addModal').on('hidden.bs.modal', function() {
                  location.reload();
                });
              });
              
            } else if(obj.status == "notleader") {
              Swal.fire({
                type: 'error',
                title: errorTitle,
                text:"스터디 장만 추방 할 수 있습니다."
              });
              
            } else if(obj.status == "leader") {
              Swal.fire({
                type: 'error',
                title: errorTitle,
                text: "본인은 추방 할 수 없습니다."
              });
            } else {
              Swal.fire({
                type: 'error',
                title: errorTitle,
                text: "추방에 실패 하였습니다."
              });
            }
          });
        }(myStudyNo));
      }
    })
  });

});