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

//  $(document.body).trigger('messageClick');
}
$('.study-message').click(() => {
  alert("??");
  });



$('#addModal').on('show.bs.modal', function (e) {
  
  messageReceiver = $('#message-add-nick').attr('nick-name');
  alert(messageReceiver);
 });





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
      location.reload();
    },
    error: function(){
      alert("닉네임을 확인해주세요.");
      $(recv_id).val("");
    }
  });
});
