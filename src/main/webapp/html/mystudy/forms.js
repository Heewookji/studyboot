var param = location.href.split('?')[1],
noss = param.split('=')[1],
leader;

//리더 유무 받아오기
$.getJSON('../../app/json/MyStudy/leader?no=' + noss,
    function(obj) {
  leader = obj.leader;
});


$('#add-board').click((e) => {

  $("#contents").load("/studyboot/html/mystudy/forms.html", function(){

    $('#update-min-btn').hide();

    $('#checkboxSuccess').click((e) => {
      if (leader != true){
        alert("스터디장만 공지사항입력이 가능합니다.");
        $("input:checkbox[id='checkboxSuccess']").prop("checked", false);
      }
    });


    $('#add-min-btn').click((e) => {
      var markup = $('.js-text-editor').summernote('code');
      console.log(markup);
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
    });

  });
});


//$(window).on("beforeunload", function() {
//  if($('#inputHorizontalSuccess').val().length != 0) {
//    return "게시글이 존재합니다. 뒤로가시겠습니까?";
//  } else if($('.note-editable').text().length != 0) {
//    return "게시글이 존재합니다. 뒤로가시겠습니까?";
//  }
//});

