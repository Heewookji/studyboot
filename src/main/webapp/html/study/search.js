var param = location.href.split('?')[1],
pageNo = 1,
pageSize = 12,
addressNo,
clsNo = [],
rateValue = 3,
largeClsNo,
mediumClsNo,
clsTitle,
errorTitle = '오! 이런..',
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

    $('#clsTitle').text(obj.rowCount + "개의 검색결과");
    $('#clsTitle').next('div').find('small').html('<small class="form-text g-opacity-0_8 g-font-size-default">지금 바로 해당 분야의 마음 맞는 사람들을 찾아보세요!</small>');

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

    $(cardGenerator(obj)).appendTo(tbody);

    for(var e of obj.list){
      $('#std-rate-'+ e.no).rateit({
        // min value
        min: 0, 
        // max value
        max: 5, 
        // 'bg', 'font'
        mode: 'font', 
        // size of star
        starwidth: 50, 
        // is readonly?
        readonly: true, 
        // is resetable?
        resetable: false,
        value: e.rate
      });
    }


    // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-list');
  });
};



//생성 모달의 카테고리 분류 로딩 함수
function loadModalCategory() {


  $.getJSON('../../app/json/study/category?clsNo=',
          function(obj) {


    for(var e of obj.list){
      e.value = e.clsNo;
    }

    //분류 드롭다운
    $('.ui.dropdown.lcls')
    .dropdown({
      placeholder: '대분류',
      on: 'hover',
      values: obj.list,
      onChange: function(value, text, $selectedItem) {

        $('.ui.dropdown.mcls')
        .dropdown({
          placeholder: '중분류',
          on: 'hover',
          values: [
            ]
        })
        ;

        $('.ui.dropdown.scls')
        .dropdown({
          placeholder: '소분류',
          on: 'hover',
          values: [
            ]
        })
        ;

        if(value.length != 2){
          return;
        }
        $.getJSON('../../app/json/study/category?clsNo=' + value,
                function(objm) {
          for(var e of objm.list){
            e.value = e.clsNo;
          }
          $('.ui.dropdown.mcls')
          .dropdown({
            placeholder: '중분류',
            on: 'hover',
            values: objm.list,
            onChange: function(value, text, $selectedItem) {
              if(value.length != 4){
                return;
              }
              $.getJSON('../../app/json/study/category?clsNo=' + value,
                      function(objs) {
                for(var e of objs.list){
                  e.value = e.clsNo;
                }
                $('.ui.dropdown.scls')
                .dropdown({
                  placeholder: '소분류',
                  on: 'hover',
                  values: objs.list
                });

              });
            }
          });
        });
      }
    });
  });
};


//생성 모달의 카테고리 분류 로딩 함수
function loadModalAddress() {


  $.getJSON('../../app/json/study/addresscategory?addressNo=',
          function(obj) {


    for(var e of obj.list){
      e.value = e.addressNo;
    }

    //분류 드롭다운
    $('.ui.dropdown.laddr')
    .dropdown({
      placeholder: '시도',
      on: 'hover',
      values: obj.list,
      onChange: function(value, text, $selectedItem) {

        $('.ui.dropdown.maddr')
        .dropdown({
          placeholder: '시군구',
          on: 'hover',
          values: [
            ]
        })
        ;

        $('.ui.dropdown.saddr')
        .dropdown({
          placeholder: '동읍면',
          on: 'hover',
          values: [
            ]
        })
        ;

        if(value.length != 2){
          return;
        }

        $.getJSON('../../app/json/study/addresscategory?addressNo=' + value,
                function(objm) {
          for(var e of objm.list){
            e.value = e.addressNo;
          }
          $('.ui.dropdown.maddr')
          .dropdown({
            placeholder: '시군구',
            on: 'hover',
            values: objm.list,
            onChange: function(value, text, $selectedItem) {
              if(value.length != 4){
                return;
              }
              $.getJSON('../../app/json/study/addresscategory?addressNo=' + value,
                      function(objs) {
                for(var e of objs.list){
                  e.value = e.addressNo;
                }
                $('.ui.dropdown.saddr')
                .dropdown({
                  placeholder: '동읍면',
                  on: 'hover',
                  values: objs.list
                });

              });
            }
          });
        });
      }
    });
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
  loadModalCategory();
  loadModalAddress();

  $('.ui.dropdown.quantity')
  .dropdown({
    on: 'hover'
  });
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


    location.href = 'view.html?studyno=' + $(e.target).parents('.card-div').find('a').attr("data-no")
    + '&name=' + $(e.target).parents('.card-div').find('a').html();

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
      $(this).closest('div').next().find('input').prop('checked',true);

      for(var c of $(this).closest('div').next().find('input')){
        clsNo = jQuery.grep(clsNo, function(value) { return value != $(c).val(); });
      }      
      for(var c of $(this).closest('div').next().find('input')){
        clsNo.push($(c).val());
      }

    } else {
      $(this).closest('div').next().find('input').prop('checked',false);

      for(var c of $(this).closest('div').next().find('input')){
        clsNo = jQuery.grep(clsNo, function(value) { return value != $(c).val(); });
      }
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

      if($(this).parent().parent().find('input:checked').length == $(this).parent().parent().find('input').length ){
        $(this).closest('div').parent().prev().find('input').prop('checked',true);
      }

    } else {
      var index = clsNo.indexOf($(this).val());
      clsNo.splice(index,1);
      $(this).closest('div').parent().prev().find('input').prop('checked',false);
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


//add modal-----
//이름 체크
$( "#name" ).keyup(function(){
  if(nickCheck($("#name").val()) == true){
    if($("#name").attr("data-toggle")){
      $('#name').tooltip('disable');
      $('#name').tooltip('hide');
    }
  } else{
    $("#name").attr("data-toggle","tooltip");
    $("#name").attr("data-trigger","hover focus");
    $("#name").attr("data-placement","bottom");
    $("#name").attr("data-html", true);
    $("#name").attr("title","3~12자의 한글, 영문, 숫자만 <br>사용할 수 있습니다");
    $('#name').tooltip('enable');
    $('#name').tooltip('show');
  }
});

//이름 체크
function nickCheck(str) {
  if(str.length < 3 || str.length > 12) {
    return false;
  }
  var chk = /[0-9]|[a-z]|[A-Z]|[가-힣]|\s/;
  for( var i = 0; i <= str.length -1 ; i++ )    {
    if(chk.test(str.charAt(i))) {
    }
    else  {
      return false;
    }
  }
  return true;
}


//목표체크
$( "#goal" ).keyup(function(){
  if($( "#goal" ).val().length > 80 ||
          $( "#goal" ).val().length < 30 ){
    $("#goal").attr("data-toggle","tooltip");
    $("#goal").attr("data-trigger","hover focus");
    $("#goal").attr("data-placement","bottom");
    $("#goal").attr("data-html", true);
    $("#goal").attr("title","30자 이상 80자 이하의<br>목표를 입력해주세요!");
    $('#goal').tooltip('enable');
    $('#goal').tooltip('show');
  } else{
    if($("#goal").attr("data-toggle")){
      $('#goal').tooltip('disable');
      $('#goal').tooltip('hide');
    }
  }
});

//설명 체크
$('#contents').keyup(function(){
  if($( "#contents" ).val().length < 50 ){
    $("#contents").attr("data-toggle","tooltip");
    $("#contents").attr("data-trigger","hover focus");
    $("#contents").attr("data-placement","bottom");
    $("#contents").attr("data-html", true);
    $("#contents").attr("title","50자 이상의<br>상세설명을 적어주세요");
    $('#contents').tooltip('enable');
    $('#contents').tooltip('show');
  } else{
    if($("#contents").attr("data-toggle")){
      $('#contents').tooltip('disable');
      $('#contents').tooltip('hide');
    }
  }
});





//시작하기 눌렀을 경우
$('#init-btn').click(function(e) {

//이름 체크
  if(!nickCheck($("#name").val())){
    Swal.fire({
      type: 'error',
      title: errorTitle,
      text: '올바른 이름을 입력해주세요!'
    });
    return;
  }

//목표 체크
  if($( "#goal" ).val().length > 80 ||
          $( "#goal" ).val().length < 30 ){
    Swal.fire({
      type: 'error',
      title: errorTitle,
      text: '30자 이상 80자 이하의 목표를 입력해주세요!'
    });
    return;
  }

//활동 요일
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

//시작 날짜와 종료 날짜
  if($('#startDate').val()== null ||
          $('#startDate').val()== undefined ||
          $('#startDate').val().length == 0){
    Swal.fire({
      type: 'error',
      title: errorTitle,
      text: '활동 기간을 입력해주세요!'
    });
    return;
  }
  if($('#endDate').val()== null ||
          $('#endDate').val()== undefined ||
          $('#endDate').val().length == 0){
    Swal.fire({
      type: 'error',
      title: errorTitle,
      text: '활동 기간을 입력해주세요!'
    });
    return;
  }

//활동 분류
  if($('.scls').find(".selected").attr('data-value')== null ||
          $('.scls').find(".selected").attr('data-value')== undefined){
    Swal.fire({
      type: 'error',
      title: errorTitle,
      text: '스터디 분류를 입력해주세요!'
    });
    return;
  }

//활동 지역
  if($('.saddr').find(".selected").attr('data-value') == null ||
          $('.saddr').find(".selected").attr('data-value') == undefined){
    Swal.fire({
      type: 'error',
      title: errorTitle,
      text: '스터디 활동 지역을 입력해주세요!'
    });
    return;
  }

//내용
  if($( "#contents" ).val().length < 50 ){
    Swal.fire({
      type: 'error',
      title: errorTitle,
      text: '50자 이상의 스터디 설명을 입력해주세요!'
    });
    return;
  }

//모두 통과한다면, URI인코딩 방식으로 전송
  jQuery.ajax({
    url:"../../app/json/study/add",
    type:"POST",
    data:  "name=" + encodeURIComponent($("#name").val()) +
    "&cls=" + encodeURIComponent($('.scls').find(".selected").attr('data-value')) +  
    "&address=" + encodeURIComponent($('.saddr').find(".selected").attr('data-value')) +
    "&goal=" + encodeURIComponent($("#goal").val()) +
    "&photo=" + encodeURIComponent($("#photo").val()) +
    "&day=" + encodeURIComponent(addDayNo) +
    "&personnel=" + encodeURIComponent($('#quantity').dropdown('get value')) +
    "&startDate=" + encodeURIComponent($("#startDate").val()) +
    "&endDate=" + encodeURIComponent($("#endDate").val()) +
    "&contents=" + encodeURIComponent($("#contents").val()),
    contentType: "application/x-www-form-urlencoded",
    success: function(data) {
      if (data.status == 'success') {
        Swal.fire({
          type: 'success',
          title: '스터디를 생성했습니다!',
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          location.href = '../mystudy/index.html?no=' + data.studyNo;
        }
        );
      } else {
        Swal.fire({
          type: 'error',
          title: errorTitle,
          text: '스터디 생성을 실패했습니다!'
        });
      }
    }
  });


});

