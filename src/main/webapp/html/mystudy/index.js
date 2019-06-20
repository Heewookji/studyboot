var pageNo = 1,
pageSize = 6,
tbody,
prevPageLi,
nextPageLi,
param = location.href.split('?')[1],
no = param.split('=')[1],
currSpan, 
currCls,
ntcTemplateSrc = $('#ntc-list').html();

var ntcGenerator = Handlebars.compile(ntcTemplateSrc);
var ntcNo,
memNo;

$('#ntc-board').attr("href", "/studyboot/html/mystudy/board.html?no=" + no);

function loadList(no) {
  $.getJSON('../../app/json/MyStudy/studyNtc?no=' + no,
      function(obj){

    if (obj.ntcList.length === 0) {
      var ntcTag0 =
        "<li class='media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-blue-left rounded g-pa-20 g-mb-10' style='height:90px;'>" +
        " <div class='d-flex g-mt-2 g-mr-15'>" +
        " </div>" +
        " <div class='media-body'>" +
        " <div class='d-flex justify-content-between'>" +
        " <h5 class='h5 g-font-weight-600 g-color-black'  style='margin-top:12px;'>스터디 개설을 축하 드립니다. 게시글을 작성 해 보세요!</h5>" +
        " </div>" +
        " </div>" +
        " </li>" +

        "<li class='media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-blue-left rounded g-pa-20 g-mb-10' style='height:90px;'>" +
        " <div class='d-flex g-mt-2 g-mr-15'>" +
        " </div>" +
        " <div class='media-body'>" +
        " <div class='d-flex justify-content-between'>" +
        " </div>" +
        " </div>" +
        " </li>" +
       
        "<li class='media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-blue-left rounded g-pa-20 g-mb-10' style='height:90px;'>" +
        " <div class='d-flex g-mt-2 g-mr-15'>" +
        " </div>" +
        " <div class='media-body'>" +
        " <div class='d-flex justify-content-between'>" +
        " </div>" +
        " </div>" +
        " </li>" +
      
        "<li class='media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-blue-left rounded g-pa-20 g-mb-10' style='height:90px;'>" +
        " <div class='d-flex g-mt-2 g-mr-15'>" +
        " </div>" +
        " <div class='media-body'>" +
        " <div class='d-flex justify-content-between'>" +
        " </div>" +
        " </div>" +
        " </li>";
      
      $("#ntc-board-list").html(ntcTag0);
      
    } else if (obj.ntcList.length === 1) {
      
      $(ntcGenerator(obj)).appendTo('#ntc-board-list');
      
      var ntcTag1 =
        "<li class='media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-blue-left rounded g-pa-20 g-mb-10' style='height:90px;'>" +
        " <div class='d-flex g-mt-2 g-mr-15'>" +
        " </div>" +
        " <div class='media-body'>" +
        " <div class='d-flex justify-content-between'>" +
        " </div>" +
        " </div>" +
        " </li>" +

        "<li class='media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-blue-left rounded g-pa-20 g-mb-10' style='height:90px;'>" +
        " <div class='d-flex g-mt-2 g-mr-15'>" +
        " </div>" +
        " <div class='media-body'>" +
        " <div class='d-flex justify-content-between'>" +
        " </div>" +
        " </div>" +
        " </li>" +
       
        "<li class='media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-blue-left rounded g-pa-20 g-mb-10' style='height:90px;'>" +
        " <div class='d-flex g-mt-2 g-mr-15'>" +
        " </div>" +
        " <div class='media-body'>" +
        " <div class='d-flex justify-content-between'>" +
        " </div>" +
        " </div>" +
        " </li>" ;
      
      $("#ntc-board-list").append(ntcTag1);
      
    } else if (obj.ntcList.length === 2) {
      
      $(ntcGenerator(obj)).appendTo('#ntc-board-list');
      
      var ntcTag2 =
        "<li class='media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-blue-left rounded g-pa-20 g-mb-10' style='height:90px;'>" +
        " <div class='d-flex g-mt-2 g-mr-15'>" +
        " </div>" +
        " <div class='media-body'>" +
        " <div class='d-flex justify-content-between'>" +
        " </div>" +
        " </div>" +
        " </li>" +

        "<li class='media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-blue-left rounded g-pa-20 g-mb-10' style='height:90px;'>" +
        " <div class='d-flex g-mt-2 g-mr-15'>" +
        " </div>" +
        " <div class='media-body'>" +
        " <div class='d-flex justify-content-between'>" +
        " </div>" +
        " </div>" +
        " </li>";
      
      $("#ntc-board-list").append(ntcTag2);
      
    } else if (obj.ntcList.length === 3) {
      
      $(ntcGenerator(obj)).appendTo('#ntc-board-list');
      
      var ntcTag3 =
        "<li class='media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-blue-left rounded g-pa-20 g-mb-10' style='height:90px;'>" +
        " <div class='d-flex g-mt-2 g-mr-15'>" +
        " </div>" +
        " <div class='media-body'>" +
        " <div class='d-flex justify-content-between'>" +
        " </div>" +
        " </div>" +
        " </li>";
      
      $("#ntc-board-list").append(ntcTag3);
      
    } else {
      
      $(ntcGenerator(obj)).appendTo('#ntc-board-list');
    } 

    // 공지사항 클릭시 디테일 부분으로 넘어가기
    $('.ntcList-btn').click((e) => {
      e.preventDefault();
      ntcNo = $(e.target).attr('data-no');
      memNo = $(e.target).attr('data-mem');
      $("#contents").load("/studyboot/html/mystudy/view.html", function(e) {
        $('#ntc-no').attr('data-no', ntcNo);
        $('#mem-no').attr('data-mem', memNo);
      });
      
    });

  });
};

loadList(no);




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











