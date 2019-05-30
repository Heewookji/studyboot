var pageNo = 1,
pageSize = 6,
tbody,
prevPageLi,
nextPageLi,
param = location.href.split('?')[1],
no = param.split('=')[1],
currSpan, 
currCls,
keyword,
boardTemplateSrc = $('#study-board').html(),
memberTemplateSrc = $('#study-member').html();

var memberGenerator = Handlebars.compile(memberTemplateSrc),
boardGenerator = Handlebars.compile(boardTemplateSrc);

//JSON 형식의 데이터 목록 가져오기 (이미지 사진 + 맴버 리스트)
function loadList(no) {
  $.getJSON('../../app/json/study/studyphoto?no=' + no,
      function(obj) {

    console.log(no);
    $('#study_img').attr("src", "/studyboot/upload/images/" + obj.study.photo);

    $(memberGenerator(obj)).appendTo('#study-list');
    
    // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-list');
      });

};

loadList(no);




// JSON 형식으로 데이터 목록 가져오기 (게시판 리스트 )
function boardList(pn, cls, keyword) {
  $.getJSON('../../app/json/MyStudy/list?pageNo=' + pn + '&pageSize=' + pageSize
      + '&pageCls=' + cls + "&keyword=" + keyword,
      function(obj) {

    tbody.html('');
    
    if(obj.pageNo != 0){
        
    pageNo = obj.pageNo;

    // 템플릿 엔진을 실행하여 tr 태그 목록을 생성한다. 그리고 바로 tbody에 붙인다.
    $(boardGenerator(obj)).appendTo('#board-list-hb');

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


      }); //getJSON()
} // boardList()




$(document).on('ready', function () {

  // initialization of tabs
  $.HSCore.components.HSTabs.init('[role="tablist"]');

  // initialization of rating
  $.HSCore.components.HSRating.init($('.js-rating'), {
    spacing: 2
  });

  // initialization of HSMegaMenu component
  $('.js-mega-menu').HSMegaMenu({
    event: 'hover',
    pageContainer: $('.container'),
    breakpoint: 991
  });

  // initialization of horizontal progress bars
  setTimeout(function() { // important in this case
    var horizontalProgressBars = $.HSCore.components.HSProgressBar.init('.js-hr-progress-bar', {
      direction: 'horizontal',
      indicatorSelector: '.js-hr-progress-bar-indicator'
    });
  }, 1);
});

$(window).on('resize', function () {
  setTimeout(function () {
    $.HSCore.components.HSTabs.init('[role="tablist"]');
  }, 200);
});

$('#std-board').click(function() {
  
  // 클릭 했을때 해당 게시물 초록배경 씌우기
  $('#std-board').removeClass('list-group-item list-group-item-action justify-content-between');
  $('#std-board').addClass('list-group-item justify-content-between active');
  
  // 인덱스 페이지의 가운데 컨텐츠 부분만 바꿔서 끼워 넣어주기
  $('#contents').load("/studyboot/html/mystudy/board.html #study-board", () => {
    
    $(document.body).trigger('loaded-board');
    
    currSpan = $('#currPage > span');
    tbody = $('tbody');
    prevPageLi = $('#prevPage');
    nextPageLi = $('#nextPage');
    
  // 클릭이벤트를 전부 완료한 후 게시판 리스트를 호출한다.
    boardList(1, );
    
  });
  
  // 위쪽 빵 부스러기 적용할 때 기존껄 span 태그에서 리스트 태그로 바꿔서 적용시키기
  var $mystudy = $("<a class='u-link-v5 g-color-main g-color-primary--hover' href='/studyboot/html/mystudy/'>"
      + "My study" + "</a><i class='fa fa-angle-right g-ml-7'></i>");
  $('#std-main').html($mystudy);
  
  // study board 빵부스러기 생성하기
  if($('#std-main2').val() == undefined){
    var $stdBoard = $("<li class='list-inline-item g-color-primary' id='std-main2'>"
            + "<span>Study Board</span></li>");
    $('#conts-list').append($stdBoard);
  }
  
  
  
});

$('#board-ntc').click((e) => {
  e.preventDefault();
  boardList(pageNo + 1, $("#currCls").html(), $("#board-search").val());
});


// 스터디 게시판
$(document.body).bind('loaded-board', () => {
  
  $('#prevPage > a').click((e) => {
      e.preventDefault();
      boardList(pageNo - 1, $("#currCls").html(), $("#board-search").val());
  });

  $('#nextPage > a').click((e) => {
      e.preventDefault();
      boardList(pageNo + 1, $("#currCls").html(), $("#board-search").val());
  });
  
  $('#bothClsPage').click((e) => {
    e.preventDefault();
    $("#currCls").html("전체");
    boardList(1);
  });
    
  $('#titlePage').click((e) => {
    e.preventDefault();
    $("#currCls").html("제목");
  });
  
  $('#nickPage').click((e) => {
    e.preventDefault();
    $("#currCls").html("닉네임");
  });
  
  $('#board-search-btn').click((e) => {
    keyword = $("#board-search").val();
    boardList(1, $("#currCls").html(), $("#board-search").val());
  });

});










