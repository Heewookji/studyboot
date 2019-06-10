var param = location.href.split('?')[1],
pageNo = 1,
pageSize = 16,
addressNo,
clsNo = [],
rateValue = 3,
largeClsNo,
mediumClsNo,
clsTitle,
dayNo,
dayCheckList = $('.day-checkbox input'),
keyword,
tbody = $('#card-div'),
//card 리스트 출력 - 스터디 목록
cardTemplateSrc = $('#card-template').html(),
cardGenerator = Handlebars.compile(cardTemplateSrc),
//script 태그에서 템플릿 데이터를 꺼낸다. - 카테고리 대,중분류
templateSrcMediumCls = $('#tr-template-mcls').html(),
trGeneratorMediumCls = Handlebars.compile(templateSrcMediumCls),
//script 태그에서 템플릿 데이터를 꺼낸다. - 카테고리 중,소분류
templateSrcSmallCls = $('#tr-template-scls').html(),
trGeneratorSmallCls = Handlebars.compile(templateSrcSmallCls),
//script 태그에서 템플릿 데이터를 꺼낸다. - 지역 대분류
templateSrcLargeAddress = $('#tr-template-ladr').html(),
trGeneratorLargeAddress = Handlebars.compile(templateSrcLargeAddress),
//script 태그에서 템플릿 데이터를 꺼낸다. - 지역 중분류
templateSrcMediumAddress = $('#tr-template-madr').html(),
trGeneratorMediumAddress = Handlebars.compile(templateSrcMediumAddress),
//script 태그에서 템플릿 데이터를 꺼낸다. - 지역 소분류
templateSrcSmallAddress = $('#tr-template-sadr').html(),
trGeneratorSmallAddress = Handlebars.compile(templateSrcSmallAddress); 






//JSON 형식의 데이터 목록 가져오기
function searchList(pageNo, clsNo, addressNo, rateValue, keyword, dayNo) {

  $.getJSON('../../app/json/study/search?pageNo=' + pageNo
          + '&pageSize=' + pageSize
          + '&clsNo=' + clsNo
          + '&addressNo=' + addressNo 
          + '&rateValue=' + rateValue
          + '&keyword=' + keyword
          + '&dayNo=' + dayNo,

          function(obj) {

    console.log('rowCount='+ obj.rowCount,'pageNo=' + obj.pageNo,'pageSize=' + obj.pageSize,
            'totalPage=' + obj.totalPage, 'clsNo=' + clsNo, 'addressNo=' + addressNo,
            'rateValue=' + rateValue, 'keyword=' + keyword, 'dayNo=' + dayNo);

    // keyword 검색된 스터디 개수 알려준다.(기존 분류제목에)

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

    if(keyword != undefined){
      $('#clsTitle').html(obj.rowCount + "개의 검색결과");
    } 

    $(cardGenerator(obj)).appendTo(tbody);

    // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-list');
  });
};



//카테고리 분류 로딩 함수
function loadCategoryTitle(clsNo) {
  $.getJSON('../../app/json/study/category?clsNo=' + clsNo,
          function(obj) {
    $(trGeneratorMediumCls(obj)).appendTo('#accordion-mcls');

    $(document.body).trigger('loaded-categorytitle');
  });
};

//카테고리 하위 분류 로딩 함수
function loadSmallTitle(clsNo) {
  $.ajax({
    type: 'Get',
    url: '../../app/json/study/category?clsNo=' + clsNo,
    async: false,
    success: function(obj) {
      var mclsNo;
      $(obj.list).each(function(index, element) {
        loadSmallTitleGet(element.clsNo);
      });
      $(document.body).trigger('loaded-smalltitle');
    }
  });
}

function loadSmallTitleGet(mclsNo){
  $.ajax({
    type: 'Get',
    url: '../../app/json/study/category?clsNo=' + mclsNo,
    async: false,
    success: function(obj) {
      $(trGeneratorSmallCls(obj)).appendTo('#smallClsTitle' + mclsNo);
    }
  });
}

//필터 - 지역 로딩
function loadAddress(addressNo) {
  $.getJSON('../../app/json/study/addresscategory?addressNo=' + addressNo,
          function(obj) {

    // addressNo 값이 없을 때(대분류), 2자리(중분류), 4자리(소분류)
    if (addressNo == undefined) {
      $(trGeneratorLargeAddress(obj)).appendTo('.largeAddress');
      $(document.body).trigger('loaded-largeAddress');

    } else if (addressNo.length == 2) {
      $(trGeneratorMediumAddress(obj)).appendTo('.mediumAddress');
      $(document.body).trigger('loaded-mediumAddress');
    } else if (addressNo.length == 4) {
      $(trGeneratorSmallAddress(obj)).appendTo('.smallAddress');
      $(document.body).trigger('loaded-smallAddress');
    }

  });
};


if (param) {
  keyword = decodeURIComponent(param.split('=')[1]);
  pageNo = 1;
  searchList(pageNo, clsNo, addressNo, rateValue, keyword, dayNo);
  loadCategoryTitle(clsNo);
  loadAddress();
}

//스크롤이 끝에 닿으면 감지해서 자동으로 게시물을 출력하도록 했음 -무한스크롤-
$(window).scroll(function(obj) {
  if ($(window).scrollTop() == $(document).height() - $(window).height()) {
    searchList(++pageNo, clsNo, addressNo, rateValue, keyword, dayNo);
  }
});

//스터디 목록 로딩 완료 후 실행될 수 있는 스터디 상세 클릭 이벤트 함수
$(document.body).bind('loaded-list', () => {

  $('.study-view-link').click((e) => {
    e.preventDefault();
    window.location.href = 'view.html?no=' +
    $(e.target).attr('data-no');
  });

  $( ".study-view-link" ).hover(
          function(e) {
          }, function(e) {
          }
  );
});


//카테고리 분류 로딩 완료 후 실행 될 수 있는 클릭 이벤트 함수
$(document.body).bind('loaded-categorytitle', () => {

  loadSmallTitle(clsNo);
  
  $('.lcls-checkbox input').change(function(e) {

    pageNo = 1; // 페이지 초기화
    tbody.html(''); // 스터디 목록 초기화

    if($('.lcheck' + $(this).val()).is(":checked")){
      clsNo.push($(this).val());
    } else {
      var index = clsNo.indexOf($(this).val());
      clsNo.splice(index,1);
    }
    console.log(clsNo);
    searchList(pageNo, clsNo, addressNo, rateValue, keyword, dayNo);
  });

});

//카테고리 하위 분류 로딩 완료 후 실행 될 수 있는 클릭 이벤트 함수
$(document.body).bind('loaded-smalltitle', () => {
  
  $('.smallTitle input').change(function(e) {

    pageNo = 1; // 페이지 초기화
    tbody.html(''); // 스터디 목록 초기화

    if($('.mcheck' + $(this).val()).is(":checked")){
      clsNo.push($(this).val());
    } else {
      var index = clsNo.indexOf($(this).val());
      clsNo.splice(index,1);
    }
    console.log(clsNo);
    searchList(pageNo, clsNo, addressNo, rateValue, keyword, dayNo);
  });
  
});

//필터 - 지역 로딩 완료 후 실행 될 수 있는 클릭 이벤트 함수
$(document.body).bind('loaded-largeAddress', () => {
  $('.ladr-btn').click(function(e) {

    e.preventDefault();
    pageNo = 1;
    tbody.html('');
    $('.mediumAddress').html(''); // 지역 중분류 목록 초기화
    $('.smallAddress').html(''); // 지역 소분류 목록 초기화
    $('#mediumAddressButton').html('시군구<i class="g-right-0 g-pos-abs g-pr-10 fa fa-angle-down"></i>'); // 지역 중분류 이름 초기화
    $('#mediumAddressButton').removeClass('g-color-primary');
    $('#mediumAddressButton').addClass('g-color-main');
    $('#smallAddressButton').html('동읍면'); // 지역 소분류 이름 초기화
    $('#smallAddressButton').removeClass('g-color-primary');
    $('#smallAddressButton').addClass('g-color-main');
    $('#largeAddressButton').html($(e.target).text()+'<i class="g-right-0 g-pos-abs g-pr-10 fa fa-angle-down"></i>'); // 지역 대분류 버튼 이름 변경
    $('#largeAddressButton').removeClass('g-color-main');
    $('#largeAddressButton').addClass('g-color-primary');
    addressNo = $(e.target).attr('data-no');
    searchList(pageNo, clsNo, addressNo, rateValue, keyword, dayNo);
    loadAddress(addressNo);
  });
});

$(document.body).bind('loaded-mediumAddress', () => {
  $('.madr-btn').click(function(e) {
    e.preventDefault();
    pageNo = 1;
    tbody.html('');
    $('.smallAddress').html(''); // 지역 소분류 목록 초기화
    $('#smallAddressButton').html('동읍면<i class="g-right-0 g-pos-abs g-pr-10 fa fa-angle-down"></i>'); // 지역 소분류 이름 초기화
    $('#smallAddressButton').removeClass('g-color-primary');
    $('#smallAddressButton').addClass('g-color-main');
    $('#mediumAddressButton').html($(e.target).text()+'<i class="g-right-0 g-pos-abs g-pr-10 fa fa-angle-down"></i>'); // 지역 중분류 버튼 이름 변경
    $('#mediumAddressButton').removeClass('g-color-main');
    $('#mediumAddressButton').addClass('g-color-primary');
    addressNo = $(e.target).attr('data-no');
    searchList(pageNo, clsNo, addressNo, rateValue, keyword, dayNo);
    loadAddress(addressNo);
  });
});

$(document.body).bind('loaded-smallAddress', () => {
  $('.sadr-btn').click(function(e) {
    e.preventDefault();
    pageNo = 1;
    tbody.html('');
    $('#smallAddressButton').html($(e.target).text()+'<i class="g-right-0 g-pos-abs g-pr-10 fa fa-angle-down"></i>'); // 지역 소분류 버튼 이름 변경
    $('#smallAddressButton').removeClass('g-color-main');
    $('#smallAddressButton').addClass('g-color-primary');
    addressNo = $(e.target).attr('data-no');
    searchList(pageNo, clsNo, addressNo, rateValue, keyword, dayNo);
  });
});

$(document.body).bind('loaded-medium-tag', () => {
  $('#medium-tag').click(function(e) {
    $('#medium-tag i').remove();
    $('.scls-btn').removeClass('g-color-primary');
    $('.scls-btn').addClass("g-color-main");
    e.preventDefault();
    pageNo = 1;
    tbody.html('');
    clsNo = $(e.target).attr('data-no');
    searchList(pageNo, clsNo, addressNo, rateValue, keyword, dayNo);
    $('#small-tag').remove();
    $('#medium-tag a').removeClass('g-color-primary--hover');
    $('#medium-tag a').removeAttr('href');
  });
});
//새로고침 아이콘
$('#clearAddr').hover(function(e){
  $(e.target).addClass('fa-spin');
}, function(e){
  $(e.target).removeClass('fa-spin');
}
);
$('#clearDay').hover(function(e){
  $(e.target).addClass('fa-spin');
}, function(e){
  $(e.target).removeClass('fa-spin');
}
);
//주소 새로고침
$('#clearAddr').click(function(e){
  $('#accordion-addr .collapse').removeClass('show');
  
  $('.mediumAddress').html(''); // 지역 중분류 목록 초기화
  $('.smallAddress').html(''); // 지역 소분류 목록 초기화
  $('#largeAddressButton').html('시도<i class="g-right-0 g-pos-abs g-pr-10 fa fa-angle-down"></i>');
  $('#largeAddressButton').removeClass('g-color-primary');
  $('#largeAddressButton').addClass('g-color-main');
  $('#mediumAddressButton').html('시군구'); // 지역 중분류 이름 초기화
  $('#mediumAddressButton').removeClass('g-color-primary');
  $('#mediumAddressButton').addClass('g-color-main');
  $('#smallAddressButton').html('동읍면'); // 지역 소분류 이름 초기화
  $('#smallAddressButton').removeClass('g-color-primary');
  $('#smallAddressButton').addClass('g-color-main');
  pageNo = 1;
  tbody.html('');
  addressNo = undefined;
  searchList(pageNo, clsNo, addressNo, rateValue, keyword, dayNo);
});

//요일 새로고침
$('#clearDay').click(function(e){
  
  $('.day-checkbox input').prop('checked',false);
  pageNo = 1;
  tbody.html('');
  dayNo = undefined;
  searchList(pageNo, clsNo, addressNo, rateValue, keyword, dayNo);
});

//평점 필터
$('#rateRange').on('DOMSubtreeModified', function() {
  if($('#rateRange').html().length >= 1){
    console.log($('#rateRange').html());
    pageNo = 1;
    tbody.html('');
    rateValue = $('#rateRange').html();
    $.ajaxSetup({ async:false });
    searchList(pageNo, clsNo, addressNo, rateValue, keyword, dayNo);
    $.ajaxSetup({ async:true });
  }
});

//검색 필터
$('#search-btn').click((e) => {
  pageNo = 1;
  keyword = $("#study-search").val();
  window.location.href = './search.html?keyword=' + keyword;
});


//요일 필터
$('.day-checkbox input').change(function(e) {

  var sum = 0;

  for(var a of dayCheckList){
    if($(a).prop("checked")){
      sum += parseInt($(a).val());
    }
  }
  dayNo = sum;

  pageNo = 1; // 페이지 초기화
  tbody.html(''); // 스터디 목록 초기화

  searchList(pageNo, clsNo, addressNo, rateValue, keyword, dayNo);
});


//add-btn URI인코딩 방식으로 보냈음
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
