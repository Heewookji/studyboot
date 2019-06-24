var pageNo = 1,
pageSize = 20,
tbody = $('tbody'),
prevPageLi = $('#prevPage'),
nextPageLi = $('#nextPage'),
param = location.href.split('?')[1],
noss = param.split('=')[1],
currSpan = $('#currPage > span'), 
currCls,
keyword = $("#board-search").val(),
stdBoardListTemplateSrc = $('#std-BoardList').html();

var stdBoardListGenerator = Handlebars.compile(stdBoardListTemplateSrc);

$(document).ready(function() {

  // 게시판으로 진입했을 때 탭 색깔 활성화
  $(document.body).bind('loaded-nav', () => {
    $('#std-board').removeClass('list-group-item list-group-item-action justify-content-between');
    $('#std-board').addClass('list-group-item justify-content-between active');

  });

  // 위쪽 빵 부스러기 적용할 때 기존껄 span 태그에서 리스트 태그로 바꿔서 적용시키기
  var $mystudy = $("<a class='u-link-v5 g-color-main g-color-primary--hover' " +
  		"href='/studyboot/html/mystudy/index.html?no=" + noss + "'>"
      + "마이 스터디" + "</a><i class='fa fa-angle-right g-ml-7'></i>");
  $('#std-main').html($mystudy);

  // study board 빵부스러기 생성하기
  if($('#std-main2').val() == undefined){
    var $stdBoard = $("<li class='list-inline-item g-color-primary' id='std-main2'>"
        + "<span>게시판</span></li>");
    $('#conts-list').append($stdBoard);
  }

  $(document.body).trigger('loaded-board');
  boardList(1, "undefined", "undefined", noss);
});


//JSON 형식으로 데이터 목록 가져오기 (게시판 리스트 )
function boardList(pn, cls, keyword, noss) {
  $.getJSON('../../app/json/MyStudy/list?pageNo=' + pn + '&pageSize=' + pageSize
      + '&pageCls=' + cls + "&keyword=" + keyword + "&no=" + noss,
      function(obj) {

    tbody.html('');

    if(obj.pageNo != 0){

      pageNo = obj.pageNo;

      // 템플릿 엔진을 실행하여 tr 태그 목록을 생성한다. 그리고 바로 tbody에 붙인다.
      $(stdBoardListGenerator(obj)).appendTo('#board-list-hb');

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
   //  데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-list');


  }); //getJSON()
} // boardList()

//스터디 게시판
$(document.body).bind('loaded-board', () => {
  
  $('#prevPage > a').click((e) => {
    e.preventDefault();
    boardList(pageNo - 1, $("#currCls").html(), keyword, noss);
  });

  $('#nextPage > a').click((e) => {
    e.preventDefault();
    boardList(pageNo + 1, $("#currCls").html(), keyword, noss);
  });

  $('#bothClsPage').click((e) => {
    keyword = "";
    e.preventDefault();
    $("#currCls").html("전체");
    $("#board-search").val("");
    boardList(1, "undefined", "undefined", noss);
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
    boardList(1, $("#currCls").html(), keyword, noss);
    $("#board-search").val("");
  });


});




