var pageNo = 1,
pageSize = 3,
tbody = $('tbody'),
prevPageLi = $('#prevPage'),
nextPageLi = $('#nextPage'),
currSpan = $('#currPage > span'),
keyword = $("#message-search").val(),
templateSrc = $('#tr-template').html(),
templateSrcSend = $('#ms-template').html(); // script 태그에서 템플릿 데이터를 꺼낸다.




var trGenerator = Handlebars.compile(templateSrc);
var trGeneratorSend = Handlebars.compile(templateSrcSend);

function loadList(pn, keyword) {

  $.getJSON('../../app/json/message/list?pageNo=' + pn + '&pageSize=' + pageSize
      + "&keyword=" + keyword,
      function(obj) {

    tbody.html('');

    if(obj.pageNo != 0){

      pageNo = obj.pageNo;

      // 템플릿 엔진을 실행하여 tr 태그 목록을 생성한다. 그리고 바로 tbody에 붙인다.
      $(trGenerator(obj)).appendTo(tbody);

      // 현재 페이지의 번호를 갱신한다.
      currSpan.html(String(pageNo));

      // 1페이지일 경우 버튼을 비활성화 한다.
      if (pageNo == 1) {
        prevPageLi.addClass('disabled');
      } else {
        prevPageLi.removeClass('disabled');
      }

      // 마지막 페이지일 경우 버튼을 비활성화 한다.
      if (pageNo == obj.totalPage) {
        nextPageLi.addClass('disabled');
      } else {
        nextPageLi.removeClass('disabled');
      }

    } else{
      currSpan.html(obj.pageNo);
      prevPageLi.addClass('disabled');
      nextPageLi.addClass('disabled');
    } 
    // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-list');

  }); // Bitcamp.getJSON()

} // loadList()



function loadList2(pn, keyword) {

  $.getJSON('../../app/json/message/listsend?pageNo=' + pn + '&pageSize=' + pageSize
      + "&keyword=" + keyword,
      function(obj2) {

    tbody.html('');

    if(obj2.pageNo != 0){

      pageNo = obj2.pageNo;

      // 템플릿 엔진을 실행하여 tr 태그 목록을 생성한다. 그리고 바로 tbody에 붙인다.
      $(trGeneratorSend(obj2)).appendTo(tbody);

      // 현재 페이지의 번호를 갱신한다.
      currSpan.html(String(pageNo));

      // 1페이지일 경우 버튼을 비활성화 한다.
      if (pageNo == 1) {
        prevPageLi.addClass('disabled');
      } else {
        prevPageLi.removeClass('disabled');
      }

      // 마지막 페이지일 경우 버튼을 비활성화 한다.
      if (pageNo == obj2.totalPage) {
        nextPageLi.addClass('disabled');
      } else {
        nextPageLi.removeClass('disabled');
      }

    } else{
      currSpan.html(obj2.pageNo);
      prevPageLi.addClass('disabled');
      nextPageLi.addClass('disabled');
    } 
    // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-list');

  }); // Bitcamp.getJSON()

} // loadList()


$('#prevPage > a').click((e) => {
  e.preventDefault();
  if ($('#currCls').text() == '받은 쪽지함') {
    loadList(pageNo - 1, keyword);
  }
  if ($('#currCls').text() == '보낸 쪽지함') {
    loadList2(pageNo - 1, keyword);
  }
});

$('#nextPage > a').click((e) => {
  e.preventDefault();
  if ($('#currCls').text() == '받은 쪽지함') {
    loadList(pageNo + 1, keyword);
  }
  if ($('#currCls').text() == '보낸 쪽지함') {
    loadList2(pageNo + 1, keyword);
  }
});

$('#recvPage').click((e) => {
  e.preventDefault();
  currCls.html("받은 쪽지함");
  $(message).html("보낸 회원");
  keyword = '';
  loadList(1);
});

$('#sendPage').click((e) => {
  e.preventDefault();
  currCls.html("보낸 쪽지함");
  $(message).html("받은 회원");
  keyword = '';
  loadList2(1);
});

// 검색 클릭이벤트 발생
$('#message-search-btn').click((e) => {
keyword = $("#message-search").val();
if ($('#currCls').text() == '받은 쪽지함') {
  loadList(1, keyword);
}
if ($('#currCls').text() == '보낸 쪽지함') {
  loadList2(1, keyword);
}
});

loadList(1);

////스터디 목록 로딩 완료 후 실행될 수 있는 스터디 상세 클릭 이벤트 함수
//$(document.body).bind('loaded-list', () => {
//$('.message-view-link').click((e) => {
//e.preventDefault();
//window.location.href = 'view.js?no=' +
//$(e.target).attr('data-no');
//});
//});

// 체크박스 설정
var $checkAll = $('#checkAll');
$checkAll.change(function () {
    var $this = $(this);
    var checked = $this.prop('checked'); // checked 문자열 참조(true, false)
    // console.log(checked);
    $('input:checkbox[name="listCheck"]').prop('checked', checked);
});

var boxes = $('input:checkbox[name="listCheck"]');
console.log(boxes);
boxes.change(function () {
    // 첫 번째 방법
//    var selectAll = true;
//    var count = boxes.length;
//    var i = 0;
//    for (; i < count; i++) {
//        if (!boxes[i].checked) {
//            selectAll = false;
//            break;
//        }
//    }
    // 두 번째 방법
    var boxLength = boxes.length;
    // 체크된 체크박스 갯수를 확인하기 위해 :checked 필터를 사용하여 체크박스만 선택한 후 length 프로퍼티를 확인
    var checkedLength = $('input:checkbox[name="listCheck"]:checked').length;
    var selectAll = (boxLength == checkedLength);
    console.log(selectAll);

    $checkAll.prop('checked', selectAll);

});
 /* 처음 화면이 출력되면 체크박스의 값이 없음으로 boxes의 랭스가 0으로 변화하지 않는다.. 
  * 이부분을 해결할 방법을 찾아야 됨*/ 

$(document.body).bind('loaded-list', () => {
$('#messageForm-btn').click((e) => {
$('#recv_id').val("");
$('#message_contents').val("");
$('#title').val("");
$('#sendNo').val(6);

$('.sspctForm-Format').removeClass('std-invisible');
  });

$('.sspctForm-btn').click((e) => {
$('#message_contents').val("");
$('#title').val("");
$('.sspctForm-Format').removeClass('std-invisible');
$('#recv_id').val($(e.target).attr('data-content'));
$('#sendNo').val(6);
});

});

$('#messageAdd-btn').click((e) => {
$.ajax({
url:'../../app/json/message/add',
type: 'post',
dataType: 'text',
data: {
nickName : $(recv_id).val(),
sendNo: $(sendNo).val(),
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


$('#msg-Delete-btn').click((e) => {
  var test = [];
  $("input[name=listCheck]:checked").each(function() {
    test.push($(this).val());
  });
  
  $.getJSON('../../app/json/message/delete2?test=' + test,
      function(obj) {
  location.reload();
})
});















