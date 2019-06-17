var param = location.href.split('?')[1],
nosss = param.split('=')[1],
approvalTemplateSrc = $('#approval-list').html();

var approvalGenerator = Handlebars.compile(approvalTemplateSrc);

var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
$('#startDate').datepicker({
  uiLibrary: 'bootstrap4',
  iconsLibrary: 'fontawesome',
  minDate: today,
  format: 'yyyy-mm-dd',
  maxDate: function () {
    return $('#endDate').val();
  }
});
$('#endDate').datepicker({
  uiLibrary: 'bootstrap4',
  iconsLibrary: 'fontawesome',
  minDate: today,
  format: 'yyyy-mm-dd',
  minDate: function () {
    return $('#startDate').val();
  }
});
$('.ui.dropdown').dropdown();
$.HSCore.components.HSCountQty.init('.js-quantity');


$(document).ready(function() {
  // 게시판으로 진입했을 때 탭 색깔 활성화
  $(document.body).bind('loaded-nav', () => {
    $('#std-management').removeClass('list-group-item list-group-item-action justify-content-between');
    $('#std-management').addClass('list-group-item justify-content-between active');

  });

  // 위쪽 빵 부스러기 적용할 때 기존껄 span 태그에서 리스트 태그로 바꿔서 적용시키기
  var $mystudy = $("<a class='u-link-v5 g-color-main g-color-primary--hover' " +
      "href='/studyboot/html/mystudy/index.html?no=" + nosss + "'>"
      + "My study" + "</a><i class='fa fa-angle-right g-ml-7'></i>");
  $('#std-main').html($mystudy);

  // study board 빵부스러기 생성하기
  if($('#std-main2').val() == undefined){
    var $stdBoard = $("<li class='list-inline-item g-color-primary' id='std-main2'>"
        + "<span>Study Management</span></li>");
    $('#conts-list').append($stdBoard);
  };

  // 평점 모달을 준비한다.
  $("#sb-history").load("../mypage/rateInfo.html")
});


function loadStudyDetail(nosss) {
  $.getJSON('../../app/json/MyStudy/mmntUpdate?no=' + nosss,
      function(obj){

    console.log(obj);
    $('#std-name').val(obj.name);
    $('#std-goal').val(obj.goal);

//  var $per = "<option value=" + '"' + obj.personnel + '"' + ">" + obj.personnel + "명" + 
//  "</option>"
//  console.log($per);
    // 드롭다운과 날짜 형식 / 요일 라이브러리 사용법 알아야함
    //$('#quantity').append($per);
    $('#startDate').val(obj.startDate);
    $('#endDate').val(obj.endDate);
    $('#std-contents').html(obj.contents);


  });
};
loadStudyDetail(nosss);


function loadStudyApl(nosss) {
  $.getJSON('../../app/json/MyStudy/mmntApl?no=' + nosss,
      function(obj){
    console.log(obj);
    $(approvalGenerator(obj)).appendTo('#approval-row');

    //트리거 발생
    $(document.body).trigger('loaded-approval');
  });
};
loadStudyApl(nosss);


//가입 승인 관리 버튼기능들
$(document.body).bind('loaded-approval', () => {

  // 거절시 테이블 데이터를 삭제 (가입 거절)
  $('.refusal-btn').click((e) => {
    $.getJSON("../../app/json/MyStudy/registerDelete?stdNo=" + nosss + "&memberNo="
        + $(e.target).parents('.refuse').find('a').attr('data-no'),
        function(obj){
      location.reload();
    });
  });


  $('.approval-btn').click((e) => {
    console.log($(e.target).parents('.refuse').find('a').attr('data-no'));
    $.getJSON("../../app/json/MyStudy/register?stdNo=" + nosss + "&memberNo="
        + $(e.target).parents('.refuse').find('a').attr('data-no'),
        function(obj){
      console.log("박상민 가입승인 확인 겟제이슨 콜백 함수");
      location.reload();
    });
  });

  
  
  
  
});
