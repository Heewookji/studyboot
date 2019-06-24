var pageNo = 1,
pageSize = 8,
prevPageLi = $('#recv-prevPage'),
nextPageLi = $('#recv-nextPage'),
currSpan = $('#recv-currPage > span'),
prevPageLiSend = $('#send-prevPage'),
nextPageLiSend = $('#send-nextPage'),
currSpanSend = $('#send-currPage > span'),
recvKeyword,
sendKeyword,
templateSrc = $('#tr-template').html(),
user;
templateSrcSend = $('#ms-template').html();


// 페이지가 준비되면 평점 정보, 이미지세팅 모달창을 꽂아준다.
$( document ).ready(function() {
  $("#sb-history").load("../mypage/rateInfo.html");
  $("#sb-imagesetting").load("../mypage/imagesetting.html");
});


loadData();

function loadData() {
  $.getJSON('../../app/json/member/detail',
      function(data) {
    
    window.user = data.member;
    console.log(user);
    
    $('#profilePhoto').attr('src', '/studyboot/upload/images/member/thumbnail.' + user.photo + '.jpg');
    $('#inqryName').html(user.name);
    $('#inqryNo').val(user.no);
  });
};


var trGenerator = Handlebars.compile(templateSrc);
var trGeneratorSend = Handlebars.compile(templateSrcSend);

function loadList(pn, keyword) {

  $.getJSON('../../app/json/message/receiveList?pageNo=' + pn + '&pageSize=' + pageSize
      + "&keyword=" + keyword,
      function(obj) {
    
    if (obj.status == 'fail') {
      location.href = '/studyboot/';
    }
    
    $('#recvList-data').html('');

    if(obj.pageNo != 0){
      
      $('#none-recv-message').addClass('std-invisible');
      pageNo = obj.pageNo;

      // 템플릿 엔진을 실행하여 tr 태그 목록을 생성한다. 그리고 바로 tbody에 붙인다.
      $(trGenerator(obj)).appendTo('#recvList-data');

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
      $('#none-recv-message').removeClass('std-invisible');
      currSpan.html(obj.pageNo);
      prevPageLi.addClass('disabled');
      nextPageLi.addClass('disabled');
    } 
    // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-list');

  }); // Bitcamp.getJSON()

} // loadList()



function loadList2(pn, keyword) {

  $.getJSON('../../app/json/message/sendList?pageNo=' + pn + '&pageSize=' + pageSize
      + "&keyword=" + keyword,
      function(obj) {
    
    if (obj.status == 'fail') {
      location.href = '/studyboot/';
    }
    
    $('#sendList-data').html('');

    if(obj.pageNo != 0){

      $('#none-send-message').addClass('std-invisible');
      pageNo = obj.pageNo;

      // 템플릿 엔진을 실행하여 tr 태그 목록을 생성한다. 그리고 바로 tbody에 붙인다.
      $(trGeneratorSend(obj)).appendTo('#sendList-data');

      // 현재 페이지의 번호를 갱신한다.
      currSpanSend.html(String(pageNo));

      // 1페이지일 경우 버튼을 비활성화 한다.
      if (pageNo == 1) {
        prevPageLiSend.addClass('disabled');
      } else {
        prevPageLiSend.removeClass('disabled');
      }

      // 마지막 페이지일 경우 버튼을 비활성화 한다.
      if (pageNo == obj.totalPage) {
        nextPageLiSend.addClass('disabled');
      } else {
        nextPageLiSend.removeClass('disabled');
      }

    } else{
      $('#none-send-message').removeClass('std-invisible');
      currSpanSend.html(obj.pageNo);
      prevPageLiSend.addClass('disabled');
      nextPageLiSend.addClass('disabled');
    } 
    // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-list');

  }); // Bitcamp.getJSON()

} // loadList()


$('#recv-prevPage > a').click((e) => {
  e.preventDefault();
  $('#recv-checkAll').prop('checked', false);
    loadList(pageNo - 1, recvKeyword);
});

$('#recv-nextPage > a').click((e) => {
  e.preventDefault();
  $('#recv-checkAll').prop('checked', false);
    loadList(pageNo + 1, recvKeyword);
});

$('#send-prevPage > a').click((e) => {
  e.preventDefault();
  $('#send-checkAll').prop('checked', false);
    loadList2(pageNo - 1, sendKeyword);
});

$('#send-nextPage > a').click((e) => {
  e.preventDefault();
  $('#send-checkAll').prop('checked', false);
    loadList2(pageNo + 1, sendKeyword);
});


// 검색 클릭이벤트 발생
$('#recv-search-btn').click((e) => {
  recvKeyword = $("#recv-search").val();
  loadList(1, recvKeyword);
});

$('#send-search-btn').click((e) => {
  sendKeyword = $("#send-search").val();
  loadList2(1, sendKeyword);
});

loadList(1);
loadList2(1);

// 체크박스 설정
var $recvCheckAll = $('#recv-checkAll');
$recvCheckAll.change(function () {
    var $this = $(this);
    var checked = $this.prop('checked'); // checked 문자열 참조(true, false)
    
    $('#recvList-data input:checkbox[name="listCheck"]').prop('checked', checked);
    
    var boxes = $('#recvList-data input:checkbox[name="listCheck"]');
    
    var $checklist = $('#recv-chk');
    $checklist.change(function () {
        var boxLength = boxes.length;
        var checkedLength = $('#recvList-data input:checkbox[name="listCheck"]:checked').length;
        var selectAll = (boxLength == checkedLength);
        console.log(selectAll);
        $recvCheckAll.prop('checked', selectAll);
    });
});

//체크박스 설정
var $sendCheckAll = $('#send-checkAll');
$sendCheckAll.change(function () {
    var $this = $(this);
    var checked = $this.prop('checked'); // checked 문자열 참조(true, false)
    
    $('#sendList-data input:checkbox[name="listCheck"]').prop('checked', checked);
    
    var boxes = $('#sendList-data input:checkbox[name="listCheck"]');
    
    var $checklist = $('#send-chk');
    $checklist.change(function () {
        var boxLength = boxes.length;
        var checkedLength = $('#recvList-data input:checkbox[name="listCheck"]:checked').length;
        var selectAll = (boxLength == checkedLength);
        console.log(selectAll);
        $sendCheckAll.prop('checked', selectAll);
    });
});

$(document.body).bind('loaded-list', () => {
  
$('#messageForm-btn').click((e) => {
$('#recv_id').val("");
$('#message_contents').val("");
$('#title').val("");
$('.sspctForm-Format').removeClass('std-invisible');
});

$('.sspctForm-btn').click((e) => {
$('#message_contents').val("");
$('#title').val("");
$('.sspctForm-Format').removeClass('std-invisible');
$('#recv_id').val($(e.target).attr('data-content'));
});

$('#msg-response').click((e) => {
  $('#message_contents').val("");
  $('#title').val("");
  $('.sspctForm-Format').removeClass('std-invisible');
  $('#recv_id').val($('#nickName').html());
});

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
      Swal.fire({
        type: 'success',
        title: '전송 완료',
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        location.reload();
      });
    },
    error: function(){
      Swal.fire({
        type: 'error',
        title: '닉네임을 확인 하세요!',
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        $(recv_id).val("");
      });
      
    }
  });
});


$('#recv-delete-btn').click((e) => {
  var list = [];
  $("#recvList-data input[name=listCheck]:checked").each(function() {
    list.push($(this).val());
  });
  
  if (list.length < 1) {
    Swal.fire({
      type: 'info',
      title: '삭제할 쪽지를 선택하세요.',
      showConfirmButton: false,
      timer: 1500
    });
    return false;
  }
  
  $.getJSON('../../app/json/message/delete2?list=' + list,
      function(obj) {
    
    console.log(obj.status);
    if (obj.status == 'success') {
      Swal.fire({
        type: 'success',
        title: '선택한 쪽지를 삭제 했습니다!',
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        location.reload();
      });
    } else {
      Swal.fire({
        type: 'error',
        title: '쪽지 삭제 실패!',
        showConfirmButton: false,
        timer: 1500
      });
    }
  })
});

$('#send-delete-btn').click((e) => {
  var list = [];
  $("#sendList-data input[name=listCheck]:checked").each(function() {
    list.push($(this).val());
  });
  
  if (list.length < 1) {
    Swal.fire({
      type: 'info',
      title: '삭제할 쪽지를 선택하세요.',
      showConfirmButton: false,
      timer: 1500
    });
    return false;
  }
  
  $.getJSON('../../app/json/message/delete2?list=' + list,
      function(obj) {
    
    if (obj.status == 'success') {
      Swal.fire({
        type: 'success',
        title: '선택한 쪽지를 삭제 했습니다.',
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        location.reload();
      });
    } else {
      Swal.fire({
        type: 'error',
        title: '쪽지 삭제 실패!',
        showConfirmButton: false,
        timer: 1500
      });
    }
})
});




// inquiry
$('#inqryForm-btn').click((e) => {
  e.preventDefault();
  $('.sspctForm-Format').addClass('std-invisible');
  $('#formTitle').html($('#inqryName').html() +"님  문의"+ " 내용을 적어주세요");
  $('#sspctName').val("");
  $('#sspctNo').val(0);
  $('#inqryClsNo').val(1);
});

$('#inqryModal').on('hidden.bs.modal', () => {
  $('#inqryContents').val('');
});

// inquiry add
$('#inqryAdd-btn').click((e) => {
  $.ajax({
    url:'../../app/json/inquiry/add',
    type: 'post',
    dataType: 'text',
    data: {
      clsNo: $(inqryClsNo).val(),
      contents:$(inqryContents).val(),
      inquiryPersonNo: $(inqryNo).val(),
      suspectPersonNo: $(sspctNo).val()
    },
    success: function(data){
      alert('문의 글 등록 성공!!');
      $('#inqryModal').modal('hide');
    }
  });
});








