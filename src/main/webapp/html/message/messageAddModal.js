var messagePage = location.href.split('/')[5],
messagePageStudyNo,
studyMemberLength;

if (messagePage === "mystudy") { // 현재 페이지가 mystudy 이면..
  var messageReceiver,
  messagePageStudyNo =  location.href.split('?')[1].split('=')[1]; // 스터디 번호를 담는다.

  // 해당 스터디 회원이 몇명인지 알아본다.
  $.getJSON('../../app/json/MyStudy/studyphoto?no=' + messagePageStudyNo,
      function(obj) {
    studyMemberLength = obj.list.length;
    window.studyMemberList = obj.list;
    console.log(window.studyMemberLength);
    console.log(window.studyMemberList);
    console.log(window.studyMemberList[0].member.nickName);
  });

}

//모달이 켜지기 전에 준비하는 함수
$('#addModal').on('show.bs.modal', function (e) { 

  if(messagePage === "mystudy") { // 현재 페이지가 mystudy면 보내는이를 넣어준다.
    alert(messagePage);
    messageReceiver = $('#message-add-nick').attr('nick-name');
    $('#recv_id').attr("value", messageReceiver);
    $('#recv_id').attr("readonly", true);
    
  } else if(messagePage === "study") { // 현재 페이지가 study면 보내는이를 넣어준다.
    
    messageReceiver = $('#study-message-add-nick').attr('nick-name');
    $('#recv_id').attr("value", messageReceiver);
    $('#recv_id').attr("readonly", true);
  }
  
});

// 모달에서 보내기 버튼 누를때
$('#messageAdd-btn').click((e) => {
  $.ajax({
    url:'../../app/json/message/add',
    type: 'post',
    dataType: 'text',
    data: {
      nickName : $(recv_id).val(),
      title: $(title).val(),
      contents: $(message_contents).val()
    },
    success: function(data){
      var obj = JSON.parse(data);
      
      if (messagePage == "mystudy" || messagePage == "study") { // 현재 페이지가 mystudy면 쪽지 보내고 리로드 안함
        $('#addModal').modal('hide');
      } else {
        location.reload();
      }
    },
    error: function(){
      Swal.fire({
        type: 'error',
        title: errorTitle,
        text: '닉네임을 확인해주세요.'
      });
      $(recv_id).val("");
    }
  });
});
