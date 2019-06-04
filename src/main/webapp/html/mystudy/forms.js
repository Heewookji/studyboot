$('#add-board').click((e) => {

  $("#contents").load("/studyboot/html/mystudy/forms.html", function(){
    $('#add-min-btn').click((e) => {

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
          contents: $('.note-editable').text()
        },
        success: function(data){
          var obj = JSON.parse(data);
          console.log(obj);
          alert(obj.status);

        },
        error: function(request, status, error){
          alert("등록에 실패 했습니다.");
        }
      });
      window.location.href = "/studyboot/html/mystudy/index.html?" + nos;

    });
    $(document.body).trigger('loaded-paging');


  });
});
