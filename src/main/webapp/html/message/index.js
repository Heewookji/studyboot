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




//$('#sspctPage').click((e) => {
//e.preventDefault();
//currCls.html("신고");
//keyword = '';
//loadList(1, "신고");
//});






//$(document.body).bind('loaded-list', () => {

//$('#inqryForm-btn').click((e) => {
//$('.sspctForm-Format').addClass('std-invisible');
//$('#inqryName').html("홍길동");
//$('#formTitle').html($('#inqryName').html() +"님  문의"+ " 내용을 적어주세요");
//$('#sspctName').val("");
//$('#inqryNo').val(1);
//$('#sspctNo').val(0);
//$('#inqryClsNo').val(1);
//});

//$('.sspctForm-btn').click((e) => {
//$('.sspctForm-Format').removeClass('std-invisible');
//$('#inqryName').html("홍길동");
//$('#formTitle').html($('#inqryName').html() +"님  신고"+ " 내용을 적어주세요");
//$('#sspctName').html($(e.target).attr('data-content'));
//$('#inqryNo').val(1);
//$('#sspctNo').val($(e.target).attr('data-no'));
//$('#inqryClsNo').val(2);
//});
//});



//$('#inqryAdd-btn').click((e) => {
//$.ajax({
//url:'../../app/json/message/add',
//type: 'post',
//dataType: 'text',
//data: {
//clsNo: $(inqryClsNo).val(),
//contents:$(inqryContents).val(),
//inquiryPersonNo: $(inqryNo).val(),
//suspectPersonNo: $(sspctNo).val()
//},
//success: function(data){
//var obj = JSON.parse(data);
//location.reload();
//}
//});

//});








