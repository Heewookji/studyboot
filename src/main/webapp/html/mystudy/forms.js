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
    
    $('#checkboxSuccess').click((e) => {
      if (leader != true){
        alert("스터디장만 공지사항입력이 가능합니다.");
        $("input:checkbox[id='checkboxSuccess']").prop("checked", false);
      }
    });
    
    
    $('#add-min-btn').click((e) => {
      
      var markup = $('.note-editable').summernote('code');

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
