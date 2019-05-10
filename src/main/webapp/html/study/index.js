var tbody = $('tbody'),
  templateSrc = $('#tr-template').html(), // script 태그에서 템플릿 데이터를 꺼낸다.
  trGenerator = Handlebars.compile(templateSrc); 

// JSON 형식의 데이터 목록 가져오기
function loadList() {

  $.getJSON('../../app/json/study/list', function(obj) {

    
    // 템플릿 엔진을 실행하여 tr 태그 목록을 생성한다. 그리고 바로 tbody에 붙인다.
    $(trGenerator(obj)).appendTo(tbody);
  });
};
// 페이지를 출력한 후 1페이지를 로딩한다.
loadList();

$(document.body).bind('loaded-list', () => {
  $('.study-view-link').click((e) => {
    e.preventDefault();
    window.location.href = 'view.html?no=' +
      $(e.target).attr('data-no');
  });
});



