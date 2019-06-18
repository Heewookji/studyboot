var pageNo = 1,
pageSize = 3,
tbody = $('tbody'),
prevPageLi = $('#prevPage'),
nextPageLi = $('#nextPage'),
currSpan = $('#currPage > span'),
keyword = $("#message-search").val(),
templateSrc = $('#tr-template').html(),
templateSrcSend = $('#ms-template').html(); // script 태그에서 템플릿 데이터를 꺼낸다.

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



