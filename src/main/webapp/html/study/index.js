var pageNo = 1,
pageSize = 3,
tbody = $('tbody'),
templateSrc = $('#tr-template').html(), // script 태그에서 템플릿 데이터를 꺼낸다.
trGenerator = Handlebars.compile(templateSrc); 

//JSON 형식의 데이터 목록 가져오기
function loadList(pn) {

  $.getJSON('../../app/json/study/list?pageNo=' + pn + '&pageSize=' + pageSize,
      function(obj) {
    
    if (pageNo == obj.totalPage) {
      return;
    }
    // 서버에 받은 데이터 중에서 페이지 번호를 글로벌 변수에 저장한다.
    pageNo = obj.pageNo;

    $(trGenerator(obj)).appendTo(tbody);

    // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-list');

  });
};


//페이지를 출력한 후 1페이지를 로딩한다.
loadList(1);

$(window).scroll(function(obj) {
  if ($(window).scrollTop() == $(document).height() - $(window).height()) {

    loadList(pageNo + 1);

  }
});


$(document.body).bind('loaded-list', () => {
  $('.study-view-link').click((e) => {
    e.preventDefault();
    window.location.href = 'view.html?no=' +
    $(e.target).attr('data-no');
  });
});










