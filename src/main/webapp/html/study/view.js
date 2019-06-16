// 현재 URL을 ?로 나누어 파라미터를 구한다.
var param = location.href.split('?')[1];
// param 변수는 값이 있으면 true를 리턴한다.
if (param) {
  // loadData 함수를 호출한다. param 변수를 =로 나누어 파라미터의 값을 구한다.
  var no = param.split('&')[0];
  var name = param.split('&')[1];
  loadData(no.split('=')[1]);
  
  //이름 타이틀에 넣어준다.
  $('#studyNameHead').html(decodeURIComponent(name.split('=')[1]));
}
  

// 스터디 상세 데이터를 불러오는 함수
function loadData(no) {
  
  $.getJSON('../../app/json/study/detail?no=' + no,
      function(data) {
    
    console.log(data);
    $('#name').text(data.name);
    $('#goal').html('<span class=" g-font-size-30 ">"  </span>' + data.goal 
            + '<span class="g-font-size-30 ">  "</span>');
    $('#contents').append(data.contents);
    
    for(var day of data.dayStrList){
      $('#day').append("<li class=\"list-inline-item g-mb-10\"><a class=\"u-tags-v1 g-color-main g-brd-around g-brd-gray-light-v3 g-bg-gray-dark-v2--hover g-brd-gray-dark-v2--hover g-color-white--hover g-rounded-50 g-py-4 g-px-15\">"
              + day+"</a></li>");
    }
    
    
    
    
    $('#cls').val(data.cls);
    $('#sdt').text(data.startDate);
    $('#edt').text(data.endDate);
    $('#prsn').val(data.personnel);
    $('#age').val(data.memberAge);
    $('#attendance').val(data.attendance);
    $('#endrate').val(data.endrate);
    //rate
    $('#rate').rateit();
    $('#rate').rateit('value', data.rate);
    $('#leftDay').text(data.currentDateDiff);
    
    $('#dayProgress').css("width", Math.round((data.totalDateDiff - data.currentDateDiff)/data.totalDateDiff * 100) + '%'); 
    $('#dayProgressText').html(Math.round((data.totalDateDiff - data.currentDateDiff)/data.totalDateDiff * 100) + '%');
  
    // 값을 넣어준 뒤, 프로그래스 바를 초기화해야 실행이 원활하게 된다.
    var horizontalProgressBars = $.HSCore.components.HSProgressBar.init('.js-hr-progress-bar', {
      direction: 'horizontal',
      indicatorSelector: '.js-hr-progress-bar-indicator'
    });
  
  });
  
};

// 목록으로 돌아가기
// 무한스크롤 하고 상세보기 클릭했을 때 기존에 무한 스크롤한 리스트를 그대로 보여주고 싶은데
// 기존 리스트를 그대로 유지 하지 않고 리프래시 한 것처럼 출력됨.
$('#goback-btn').click(function() {
  window.history.go(-1);
});









