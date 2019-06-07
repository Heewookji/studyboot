var user,
param = location.href.split('?')[1],
nosss = param.split('=')[1],
leader;


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
        console.log("유저정보" + user);
      });
      
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
    
    // 업데이트 버튼
    $('#detail-edit').click((e) => {
      $("#contents").load("/studyboot/html/mystudy/forms.html", function(){
        $('.js-text-editor').summernote('code', obj.contents);
        $('#inputHorizontalSuccess').val(obj.title);
        
        // 공지사항 유효성 검사
        $('#checkboxSuccess').click((e) => {
          if (leader != true){
            alert("스터디장만 공지사항입력이 가능합니다.");
            $("input:checkbox[id='checkboxSuccess']").prop("checked", false);
          }
        });
        
        $('#add-min-btn').click((e) => {
          var markup = $('.js-text-editor').summernote('code');
          
          if($('#inputHorizontalSuccess').val().length === 0) {
            alert("제목을 입력해 주세요.");
            return;
          } else if($('.note-editable').text().length === 0) {
            alert("게시글을 입력해 주세요.");
            return;
          } 

          $.ajax({
            url:'../../app/json/MyStudy/add',
            type: 'post',
            dataType: 'text',
            data: {
              studyNo : location.href.split('=')[1].substring(0,1),
              ntc: $('input[id="checkboxSuccess"]:checked').val(),
              title: $(inputHorizontalSuccess).val(),
              contents: markup
            },
            success: function(data){
              var obj = JSON.parse(data);
              alert(obj.status);
              location.reload();
            },
            error: function(request, status, error){
              alert("등록에 실패 했습니다.");
            }
          });
        }); // ajax 끝
        
      });
    }); // end update

    // 삭제 버튼
    $('#detail-delete').click((e) => {

      $.getJSON('../../app/json/MyStudy/delete?no=' + obj.no + 
          '&memberNo=' + obj.memberNo, function(obj) {
        alert(obj.status);
        location.reload();
//        $(document.body).trigger('loaded-test'); // 트리거 실행이 안됨
      })
    }); // end delete
    
  });
}

$(document.body).bind('loaded-test', () => {
  alert("트리거실행");
});













