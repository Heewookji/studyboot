var param = location.href.split('?')[1],
pageNo = 1,
pageSize = 3,
init = false,
addressNo,
clsNo,
clsTitle,
tbody = $('tbody'),
// script 태그에서 템플릿 데이터를 꺼낸다. - 스터디 목록
templateSrc = $('#tr-template').html(),
trGenerator = Handlebars.compile(templateSrc),
// script 태그에서 템플릿 데이터를 꺼낸다. - 카테고리 중분류
templateSrcMediumCls = $('#tr-template-mcls').html(),
trGeneratorMediumCls = Handlebars.compile(templateSrcMediumCls),
// script 태그에서 템플릿 데이터를 꺼낸다. - 카테고리 소분류
templateSrcSmallCls = $('#tr-template-scls').html(),
trGeneratorSmallCls = Handlebars.compile(templateSrcSmallCls); 

// JSON 형식의 데이터 목록 가져오기
function loadList(pageNo, clsNo, addressNo) {

  $.getJSON('../../app/json/study/list?pageNo=' + pageNo
      + '&pageSize=' + pageSize
      + '&clsNo=' + clsNo
      + '&addressNo=' + addressNo,
      function(obj) {

    console.log(pageNo, obj.totalPage, addressNo);

    // 현재 끝페이지까지 왔고, 처음 출력이 아니라면
    // (이 조건이 없을 경우, 처음 들어왔는데도 출력이 안되는 경우 발생)출력하지않는다.
    if (pageNo > obj.totalPage) {
      return;
    }
    // 서버에서 넘겨준 데이터 중에서 페이지 번호를 글로벌 변수에 저장한다.
    pageNo = obj.pageNo;

    if (pageNo == 0){
      return;
    }

    $(trGenerator(obj)).appendTo(tbody);

    // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-list');
  });
};

function loadMediumTitle(clsNo) {
  $.getJSON('../../app/json/study/category?clsNo=' + clsNo,
      function(obj) {

    $(trGeneratorMediumCls(obj)).appendTo('#mediumTitle');

    $(document.body).trigger('loaded-mediumtitle');
  });
};

function loadSmallTitle(clsNo) {
  $.getJSON('../../app/json/study/category?clsNo=' + clsNo,
      function(obj) {
    $(trGeneratorSmallCls(obj)).appendTo('#smallClsTitle' + clsNo);
    $(document.body).trigger('loaded-smalltitle');
  });
};

// 페이지를 출력한 후 pageNo 와 clsNo를 넘겨주고 로딩한다.
if (param) {
  clsNo = param.split('&')[0].split('=')[1];
  clsTitle = param.split('&')[1].split('=')[1];
  clsTitle = decodeURIComponent(clsTitle);
  $('#clsTitle').html(clsTitle);
  loadList(pageNo, clsNo);
  loadMediumTitle(clsNo);
}

// 스크롤이 끝에 닿으면 감지해서 자동으로 게시물을 출력하도록 했음 -무한스크롤-
$(window).scroll(function(obj) {
  if ($(window).scrollTop() == $(document).height() - $(window).height()) {
    loadList(++pageNo, clsNo);
  }
});

// 스터디 목록 로딩 완료 후 실행될 수 있는 스터디 상세 클릭 이벤트 함수
$(document.body).bind('loaded-list', () => {
  $('.study-view-link').click((e) => {
    e.preventDefault();
    window.location.href = 'view.html?no=' +
    $(e.target).attr('data-no');
  });
});

// 카테고리 중분류 로딩 완료 후 실행 될 수 있는 클릭 이벤트 함수
$(document.body).bind('loaded-mediumtitle', () => {
  $('.mcls-btn').click(function(e) {
    pageNo = 1; // 페이지 초기화
    tbody.html(''); // 스터디 목록 초기화
    $('.smallTitle').html(''); // 카테고리 소분류 목록 초기화
    clsNo = $(e.target).attr('data-no'); // 카테고리 중분류 분류번호
    loadList(pageNo, clsNo);
    loadSmallTitle(clsNo); // 카테고리 소분류 목록 불러오기
  });
});

// 카테고리 소분류 로딩 완료 후 실행 될 수 있는 클릭 이벤트 함수
$(document.body).bind('loaded-smalltitle', () => {
  $('.scls-btn').click(function(e) {
    e.preventDefault();
    pageNo = 1;
    tbody.html('');
    clsNo = $(e.target).attr('data-no');
    loadList(pageNo, clsNo);
  });
});

$('#add-btn').click(function() {
  jQuery.ajax({
    url:"../../app/json/study/add",
    type:"POST",
    data:  "name=" + encodeURIComponent($("#name").val()) +
    "&cls=" + encodeURIComponent($("#cls").val()) +  
    "&address=" + encodeURIComponent($("#address").val()) +
    "&goal=" + encodeURIComponent($("#goal").val()) +
    "&photo=" + encodeURIComponent($("#photo").val()) +
    "&day=" + encodeURIComponent($("#day").val()) +
    "&personnel=" + encodeURIComponent($("#personnel").val()) +
    "&startDate=" + encodeURIComponent($("#startDate").val()) +
    "&endDate=" + encodeURIComponent($("#endDate").val()) +
    "&contents=" + encodeURIComponent($("#contents").val()),
    contentType: "application/x-www-form-urlencoded",
    success: function(data) {
      if (data.status == 'success') {
        alert("저장되었습니다.");
        location.href = 'index.html';
      } else {
        alert("잠시 후에 시도해주세요.");
      }
    }
  });
}); 
// add-btn URI인코딩 방식으로 보냈음



//뒤로가기 -진행중
//생성 폼에서 입력받는 도중에 페이지 이동이 감지되면 작성중인 글이 있다는 알터창을 띄우고 싶은데
//if 문에서 해당 폼을 잡았는데 알터창이 뜨지 않음 -보류-
//$(window).on('beforeunload', function() {
////alert('okok')
//var el = $('.study-add-form input[type=text]');
//for (var e of el) {
//if ($(e).val().length > 0)
//return '작성 중인 글이 있습니다.';
//}
//});
