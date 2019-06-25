//스터디 리스트 출력 - 스터디 목록
var doingStudyTemplateSrc = $('#doing-study-template').html(),
doingStudyGenerator = Handlebars.compile(doingStudyTemplateSrc),
appliedStudyTemplateSrc = $('#applied-study-template').html(),
appliedStudyGenerator = Handlebars.compile(appliedStudyTemplateSrc),
pickedStudyTemplateSrc = $('#picked-study-template').html(),
pickedStudyGenerator = Handlebars.compile(pickedStudyTemplateSrc),
emptyStudyTemplateSrc = $('#empty-study-template').html(),
emptyStudyGenerator = Handlebars.compile(emptyStudyTemplateSrc),
appliedinit = false,
pickedinit = false,
doingStudyList,
appliedStudyList,
pickedStudyList,
user;


//페이지가 준비되면 평점 정보, 이미지세팅 모달창을 꽂아준다.
$( document ).ready(function() {
  $("#sb-history").load("rateInfo.html");
  $("#sb-imagesetting").load("imagesetting.html");
});


loadData();
loadStudyList();

//로그인 유저의 정보 가져오기
function loadData() {
  $.getJSON('../../app/json/member/detail',
          function(data) {

    if (data.status == 'fail') {
      location.href ='/studyboot/html/auth/login.html';
    }

    console.log(data);
    window.user = data.member;
    $('#profilePhoto').attr('src', '/studyboot/upload/images/member/thumbnail.' + user.photo + '.jpg');
    $('#inqryName').html(user.nickName);
    $('#inqryNo').val(user.no);
  });
};

//별점 렌더링 함수
function initStar(list, cls) {

  if(cls == "do"){
    for(var e of list){
      $('#std-rate-do'+ e.no).rateit({
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
  }
  if(cls == "ap"){
    for(var e of list){
      $('#std-rate-ap'+ e.no).rateit({
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
  }

  if(cls == "pi"){
    for(var e of list){
      $('#std-rate-pi'+ e.no).rateit({
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
  }
}

//로그인 유저의 스터디 데이터 가져오기
function loadStudyList() {

  $.getJSON('../../app/json/member/mystudy', function(obj) {

    console.log(obj);
    doingStudyList = obj.doingStudyList;
    appliedStudyList = obj.appliedStudyList;
    pickedStudyList = obj.pickedStudyList;

    if (doingStudyList == null || doingStudyList == undefined) {
      studyIsEmpty('doingStudy', 4);
      $('#doingStudy > .message').html('');
      $('#doingStudy > .message').html(
              '<div class="text-center">'
              + '진행중인 스터디가 없습니다!  '
              + '<a href="/studyboot/" class="g-color-primary">보러가기</a>'
              + '</div>');

    } else {
      $(doingStudyGenerator(obj)).appendTo($('#doingStudy .js-carousel'));
      for (var i = doingStudyList.length; i < 4; i++) {
        studyIsEmpty('doingStudy', 1);
      }
      $('#doingStudy > .message').html('');
      $('#doingStudy > .message').html(
              '<div class="text-center">'
              + '스터디를 총 '
              + '<span class="g-color-primary">"' + doingStudyList.length + '개"</span>'
              + ' 진행하고 있습니다.'
              + '</div>');

      initStar(window.doingStudyList, "do");
    }

    if (appliedStudyList == null || appliedStudyList == undefined) {
      studyIsEmpty('appliedStudy', 4);
      $('#appliedStudy > .message').html('');
      $('#appliedStudy > .message').html(
              '<div class="text-center">'
              + '신청하신 스터디가 없습니다!  '
              + '<a href="/studyboot/" class="g-color-primary">보러가기</a>'
              + '</div>');

    } else {
      $(appliedStudyGenerator(obj)).appendTo($('#appliedStudy .js-carousel'));
      for (var i = appliedStudyList.length; i < 4; i++) {
        studyIsEmpty('appliedStudy', 1);
      }
      $('#appliedStudy > .message').html('');
      $('#appliedStudy > .message').html(
              '<div class="text-center">'
              + '스터디를 총 '
              + '<span class="g-color-primary">"' + appliedStudyList.length + '개"</span>'
              + ' 신청했습니다.'
              + '</div>');

      initStar(window.appliedStudyList, "ap");
    }

    if (pickedStudyList == null || pickedStudyList == undefined) {
      studyIsEmpty('pickedStudy', 4);
      $('#pickedStudy > .message').html('');
      $('#pickedStudy > .message').html(
              '<div class="text-center">'
              + '찜한 스터디가 없습니다!  '
              + '<a href="/studyboot/" class="g-color-primary">보러가기</a>'
              + '</div>');

    } else {
      $(pickedStudyGenerator(obj)).appendTo($('#pickedStudy .js-carousel'));
      for (var i = pickedStudyList.length; i < 4; i++) {
        studyIsEmpty('pickedStudy', 1);
      }
      $('#pickedStudy > .message').html('');
      $('#pickedStudy > .message').html(
              '<div class="text-center">'
              + '스터디를 총 '
              + '<span class="g-color-primary">"' + pickedStudyList.length + '개"</span>'
              + ' 찜했습니다.'
              + '</div>');

      initStar(window.pickedStudyList,"pi");
    }

    // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-loadStudyList');
  });
};


//스터디가 없을 때 사용할 함수
function studyIsEmpty(study, size) {



//'<div class="js-slide g-flex-centered u-shadow-v39 rounded g-mx-15 g-my-30">'
//+ '<article><img class="img-fluid w-100" src="/studyboot/upload/images/test3.jpg" alt="Image Description">'
//+ '<div class="g-bg-white g-pa-20"><h2 class="h5 g-color-black g-font-weight-600 mb-3">'
//+ '새로운 스터디를 시작해 보세요!</h2>'
//+ '<a href="/studyboot/">스터디 보러 가기</a></div></article></div>'

  if (study == 'doingStudy') {
    for (var i = 0; i < size; i++) {
      $('#doingStudy .js-carousel').append(emptyStudyGenerator());
    }

  } else if (study == 'appliedStudy') {
    for (var i = 0; i < size; i++) {
      $('#appliedStudy .js-carousel').append(emptyStudyGenerator());
    }

  } else {
    for (var i = 0; i < size; i++) {
      $('#pickedStudy .js-carousel').append(emptyStudyGenerator());
    }
  }

}

//스터디 리스트 가져온 후
$(document.body).bind('loaded-loadStudyList', () => {


  $(".rateit").rateit();

  $('.myStudy-view-link').click((e) => {
    location.href = '../mystudy/index.html?no=' + $(e.target).parents('.card-div').find('a').attr("data-no");
  });

  $('.study-view-link').click((e) => {
    location.href = '../study/view.html?studyno=' + $(e.target).parents('.card-div').find('a').attr("data-no")
    + '&name=' + $(e.target).parents('.card-div').find('a').html();
  });

  // initialization of carousel
  $.HSCore.components.HSCarousel.init('#doingStudy .js-carousel');
});

//진행중인 스터디 탭 이벤트 발생 시
$('#doingStudyTab').on('shown.bs.tab', () => {
  $('#doingStudy .js-carousel').slick('unslick');
  $.HSCore.components.HSCarousel.init('#doingStudy .js-carousel');

  if (window.doingStudyList == undefined && window.doingStudyList == null) {

  } else {
    initStar(window.doingStudyList,"do");
  }
});

//신청한 스터디 탭 이벤트 발생 시
$('#appliedStudyTab').on('shown.bs.tab', () => {

  if (appliedinit) {
    $('#appliedStudy .js-carousel').slick('unslick');
  }
  $.HSCore.components.HSCarousel.init('#appliedStudy .js-carousel');

  if (window.appliedStudyList == undefined && window.appliedStudyList == null) {

  } else {
    initStar(window.appliedStudyList,"ap");
  }
  appliedinit = true;
});

//찜한 스터디 탭 이벤트 발생 시
$('#pickedStudyTab').on('shown.bs.tab', () => {

  if (pickedinit) {
    $('#pickedStudy .js-carousel').slick('unslick');
  }
  $.HSCore.components.HSCarousel.init('#pickedStudy .js-carousel');

  if (window.pickedStudyList == undefined && window.pickedStudyList == null) {

  } else {
    initStar(window.pickedStudyList,"pi");
  }
  pickedinit = true;
});



//inquiry
$('#inqryForm-btn').click((e) => {
  e.preventDefault();
  $('.sspctForm-Format').addClass('std-invisible');
  $('#formTitle').html($('#inqryName').html() +"님  문의"+ " 내용을 적어주세요");
  $('#sspctName').val("");
  $('#sspctNo').val(0);
  $('#inqryClsNo').val(1);
});

$('#inqryModal').on('hidden.bs.modal', () => {
  $('#inqryContents').val('');
});

//inquiry add
$('#inqryAdd-btn').click((e) => {
  $.ajax({
    url:'../../app/json/inquiry/add',
    type: 'post',
    dataType: 'text',
    data: {
      clsNo: $(inqryClsNo).val(),
      contents:$(inqryContents).val(),
      inquiryPersonNo: $(inqryNo).val(),
      suspectPersonNo: $(sspctNo).val()
    },
    success: function(data){
      alert('문의 글 등록 성공!!');
      $('#inqryModal').modal('hide');
    }
  });
});



