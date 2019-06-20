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

    alert("스터디넘버: "+ noss);
    $('#update-min-btn').hide();

    $('#checkboxSuccess').click((e) => {
      if (leader != true){
        Swal.fire({
          type: 'error',
          title: errorTitle,
          text: '스터디장만 가능합니다.'
        });
        $("input:checkbox[id='checkboxSuccess']").prop("checked", false);
      }
    });


    $('#add-min-btn').click((e) => {
      var markup = $('.js-text-editor').summernote('code');
      console.log(markup);
      
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
        url:'../../app/json/MyStudy/add',
        type: 'post',
        dataType: 'text',
        data: {
          studyNo : noss,
          ntc: $('input[id="checkboxSuccess"]:checked').val(),
          title: $(inputHorizontalSuccess).val(),
          contents: markup
        },
        success: function(data){
          Swal.fire({
            type: 'success',
            title: '게시글을 등록했습니다.',
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

