var param = location.href.split('?')[1],
//no = param.split('=')[1];
// 위에 코드가 맞는 거!! 임시로 no 값 1 넣어놨습니다.
// 원래 클릭하면 스터디 번호 받아와서 값에 넣어줘야함!
no = 1,
memberTemplateSrc = $('#study-member').html();

var memberGenerator = Handlebars.compile(memberTemplateSrc);

//JSON 형식의 데이터 목록 가져오기
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





















