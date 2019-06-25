var param = location.href.split('?')[1],
nosss = param.split('=')[1],
approvalTemplateSrc = $('#approval-list').html();

var approvalGenerator = Handlebars.compile(approvalTemplateSrc);


//alert(nosss);
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
    $('#std-management').addClass('list-group-item justify-content-between active minee');
    $('.minee').attr('style', "cursor: pointer; color: white;");
  });

  // 위쪽 빵 부스러기 적용할 때 기존껄 span 태그에서 리스트 태그로 바꿔서 적용시키기
  var $mystudy = $("<a class='u-link-v5 g-color-main g-color-primary--hover' " +
      "href='/studyboot/html/mystudy/index.html?no=" + nosss + "'>"
      + "마이 스터디" + "</a><i class='fa fa-angle-right g-ml-7'></i>");
  $('#std-main').html($mystudy);

  // study board 빵부스러기 생성하기
  if($('#std-main2').val() == undefined){
    var $stdBoard = $("<li class='list-inline-item g-color-primary' id='std-main2'>"
        + "<span>스터디 관리</span></li>");
    $('#conts-list').append($stdBoard);
  };

  // 평점 모달을 준비한다.
  $("#sb-history").load("rateInfo.html", function(e){
    $('.apply-modal-btn').click((e) => {
      $('#userNo').attr('data-no',$(e.target).parents('.refuse-mem').find('a').attr('data-no'));
      $('#historyModal').modal('show');
    });
  });


});


function loadStudyDetail(nosss) {
  $.getJSON('../../app/json/study/detail?no=' + nosss,
      function(obj){

    $('#std-name').val(obj.name);
    $('#prsn-count').text(obj.personnel + "명");
    $('#prsn-input').val(obj.personnel);
    $('#std-goal').val(obj.goal);

    for(var a of obj.dayStrList){
      for(var b of $('.modalday-checkbox span')){
        if(a == $(b).text()){
          $(b).prev('input').prop('checked', true);
        }
      }
    }
    $('#startDate').val(obj.startDate);
    $('#endDate').val(obj.endDate);
    $('#std-cls-L').val(obj.clsList[0].name);
    $('#std-cls-M').val(obj.clsList[1].name);
    $('#std-cls-S').val(obj.clsList[2].name);
    $('#std-area-L').val(obj.addressName.split(" ")[0]);
    $('#std-area-M').val(obj.addressName.split(" ")[1]);
    $('#std-area-S').val(obj.addressName.split(" ")[2]);
    $('#std-contents').html(obj.contents);

    $(document.body).trigger('loaded-saveData');
  });
}

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
      
      if (obj.status === "notleader") {
        Swal.fire({
          type: 'error',
          title: errorTitle,
          text: "스터디 장만 가입 거절이 가능 합니다.",
          showConfirmButton: false,
          timer: 1500
        });

      } else {
        location.reload();
      }
    });
  });

  // 가입승인시 스터디 맴버에 insert시키고 apl_std에 등록된 신청서 삭제 시키고 스터디 테이블에 현재인원을 하나 카운트 시킨다.
  $('.approval-btn').click((e) => {
    console.log($(e.target).parents('.refuse').find('a').attr('data-no'));
    $.getJSON("../../app/json/MyStudy/register?stdNo=" + nosss + "&memberNo="
        + $(e.target).parents('.refuse').find('a').attr('data-no'),
        function(obj){
      
      if (obj.status === "notleader") {
        Swal.fire({
          type: 'error',
          title: errorTitle,
          text: "스터디 장만 가입 승인이 가능 합니다.",
          showConfirmButton: false,
          timer: 1500
        });

      } else {
        location.reload();
      }
    });
  });
});



//스터디 업데이트 유효성 검사
//목표체크
$( "#std-goal" ).keyup(function(){
  if($( "#std-goal" ).val().length > 80 ||
          $( "#std-goal" ).val().length < 30 ){
    $("#std-goal").attr("data-toggle","tooltip");
    $("#std-goal").attr("data-trigger","hover focus");
    $("#std-goal").attr("data-placement","bottom");
    $("#std-goal").attr("data-html", true);
    $("#std-goal").attr("title","30자 이상 80자 이하의<br>목표를 입력해주세요!");
    $('#std-goal').tooltip('enable');
    $('#std-goal').tooltip('show');
  } else{
    if($("#std-goal").attr("data-toggle")){
      $('#std-goal').tooltip('disable');
      $('#std-goal').tooltip('hide');
    }
  }
});

//설명 체크
$('#std-contents').keyup(function(){
  if($( "#std-contents" ).val().length < 50 ){
    $("#std-contents").attr("data-toggle","tooltip");
    $("#std-contents").attr("data-trigger","hover focus");
    $("#std-contents").attr("data-placement","bottom");
    $("#std-contents").attr("data-html", true);
    $("#std-contents").attr("title","50자 이상의<br>상세설명을 적어주세요");
    $('#std-contents').tooltip('enable');
    $('#std-contents').tooltip('show');
  } else{
    if($("#std-contents").attr("data-toggle")){
      $('#std-contents').tooltip('disable');
      $('#std-contents').tooltip('hide');
    }
  }
});


$(document.body).bind('loaded-saveData', () => {

  $('#sb-info-change').click((e) => {
    // 요일 유효성 검사
    var addDayNo = 0;
    for(var a of $('.modalday-checkbox input')){
      if($(a).prop("checked")){
        addDayNo += parseInt($(a).val());
      }
    }
    if(addDayNo == 0){
      Swal.fire({
        type: 'error',
        title: errorTitle,
        text: '최소 한개의 요일을 입력해주세요!'
      });
      return;
    }

    //목표 체크
    if($( "#std-goal" ).val().length > 80 ||
            $( "#std-goal" ).val().length < 30 ){
      Swal.fire({
        type: 'error',
        title: errorTitle,
        text: '30자 이상 80자 이하의 목표를 입력해주세요!'
      });
      return;
    }

    //내용
    if($( "#std-contents" ).val().length < 50 ){
      Swal.fire({
        type: 'error',
        title: errorTitle,
        text: '50자 이상의 스터디 설명을 입력해주세요!'
      });
      return;
    }

    //모두 통과한다면, URI인코딩 방식으로 전송
    jQuery.ajax({
      url:"../../app/json/MyStudy/stdUpdate",
      type:"POST",
      data: "no=" + nosss +
      "&personnel=" + encodeURIComponent($('#prsn-input').val()) +
      "&goal=" + encodeURIComponent($("#std-goal").val()) +
      "&day=" + encodeURIComponent(addDayNo) +
      "&endDate=" + encodeURIComponent($("#endDate").val()) +
      "&contents=" + encodeURIComponent($("#std-contents").val()),
      contentType: "application/x-www-form-urlencoded",
      success: function(data) {
        if (data.status == 'success') {
          Swal.fire({
            type: 'success',
            title: '스터디를 수정했습니다!',
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
            location.reload();
          })
        } else {
          Swal.fire({
            type: 'error',
            title: errorTitle,
            text: '스터디 수정을 실패했습니다!' + data.message
          });
        }
      }
    });
  });


});




















