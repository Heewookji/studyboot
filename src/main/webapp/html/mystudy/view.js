var user,
param = location.href.split('?')[1],
nosss = param.split('=')[1],
leader;

$(document).ready(function() {
  if($('#ntc-no').attr('data-no') != undefined){
    //사용자 정보 받아오기
    $.getJSON('../../app/json/MyStudy/user?',
        function(obj) {
      user = obj.user;
    });

    $('#drop-menu').click(function() {
      console.log("유저정보" + user);
      console.log("게시글유저" + $('#mem-no').attr('data-mem'));
      if ($('#mem-no').attr('data-mem') != user) {
        Swal.fire({
          type: 'error',
          title: errorTitle,
          text: '작성자만 수정이 가능합니다'
        });
        $('#detail-edit').hide();
        $('#detail-del').hide();
      }
    });

    loadDetail($('#ntc-no').attr('data-no'));
  }

});


$(document.body).bind('loaded-list', () => {

  $('.detail-btn').click((e) => {
    $("#contents").load("/studyboot/html/mystudy/view.html", function(){

      //리더 유무 받아오기
      $.getJSON('../../app/json/MyStudy/leader?no=' + nosss,
          function(obj) {
        leader = obj.leader;
        console.log(leader);
      });

      //사용자 정보 받아오기
      $.getJSON('../../app/json/MyStudy/user?',
          function(obj) {

        user = obj.user;
      });

      $('#drop-menu').click(function() {
        console.log("유저정보" + user);
        console.log("게시글유저" + $(e.target).attr('data-member'));
        if ($(e.target).attr('data-member') != user) {
          Swal.fire({
            type: 'error',
            title: errorTitle,
            text: '작성자만 수정이 가능합니다'
          });
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
    src="/studyboot/upload/images/member/thumbnail.{{photo}}.jpg"
    $('#detail-photo').attr("src", "/studyboot/upload/images/member/thumbnail." + obj.member.photo + 
        ".jpg");
    $('#detail-nick').html(obj.member.nickName);
    $('#detail-date').html(obj.date);
    $('#detail-title').html(obj.title);
    $('#detail-cont').html(obj.contents);
    $('#detail-no').html(obj.no);
    $('#detail-member').html(obj.memberNo);

    // 업데이트 버튼
    $('#detail-edit').click((e) => {
      $("#contents").load("/studyboot/html/mystudy/forms.html", function(){
        $('.js-text-editor').summernote('code', obj.contents);
        $('#inputHorizontalSuccess').val(obj.title);
        if(obj.ntc) {
          $("input:checkbox[id='checkboxSuccess']").prop("checked", true);
        }
        $('#add-min-btn').hide();

        // 공지사항 유효성 검사
        $('#checkboxSuccess').click((e) => {
          if (leader != true){
            Swal.fire({
              type: 'error',
              title: errorTitle,
              text: '스터디장만 공지사항입력이 가능합니다.'
            });
            $("input:checkbox[id='checkboxSuccess']").prop("checked", false);
          }
        });

        $('#update-min-btn').click((e) => {
          var markup = $('.js-text-editor').summernote('code');

          if($('#inputHorizontalSuccess').val().length === 0) {
            Swal.fire({
              type: 'error',
              title: errorTitle,
              text: '제목을 입력해 주세요.'
            });
            return;
          } else if($('.note-editable').text().length === 0) {
            Swal.fire({
              type: 'error',
              title: errorTitle,
              text: '게시글을 입력해 주세요.'
            });
            return;
          } 

          $.ajax({
            url:'../../app/json/MyStudy/update',
            type: 'post',
            dataType: 'text',
            data: {
              no : obj.no,
              studyNo : location.href.split('=')[1].substring(0,1),
              ntc: $('input[id="checkboxSuccess"]:checked').val(),
              title: $(inputHorizontalSuccess).val(),
              contents: markup
            },
            success: function(data){
              Swal.fire({
                type: 'success',
                title: '게시글을 수정했습니다.',
                showConfirmButton: false,
                timer: 1500
              }).then((result) => {
                location.reload();
              })
            },
            error: function(request, status, error){
              Swal.fire({
                type: 'error',
                title: errorTitle,
                text: '등록에 실패 했습니다.'
              });
            }
          });
        }); // ajax 끝

      });
    }); // end update

    // 삭제 버튼
    $('#detail-del').click((e) => {

      $.getJSON('../../app/json/MyStudy/delete?no=' + obj.no + 
          '&memberNo=' + obj.memberNo, function(obj) {
        Swal.fire({
          type: 'success',
          title: '삭제되었습니다.',
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          location.reload();
        })
        
//      $(document.body).trigger('loaded-test'); // 트리거 실행이 안됨
      })
    }); // end delete

    $('#board-list-btn').click((e) => {
      location.href = "/studyboot/html/mystudy/board.html?no=" + nosss;
    });
  });
}














