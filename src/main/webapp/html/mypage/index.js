var param = location.href.split('?')[1],
// 스터디 리스트 출력 - 스터디 목록
doingStudyTemplateSrc = $('#doing-study-template').html(),
doingStudyGenerator = Handlebars.compile(doingStudyTemplateSrc),
appliedStudyTemplateSrc = $('#applied-study-template').html(),
appliedStudyGenerator = Handlebars.compile(appliedStudyTemplateSrc),
pickedStudyTemplateSrc = $('#picked-study-template').html(),
pickedStudyGenerator = Handlebars.compile(pickedStudyTemplateSrc),
appliedinit = false,
pickedinit = false,
user,
ratingForm = $("#rating-form");


// 페이지가 준비되면 평점 정보, 이미지세팅 모달창을 꽂아준다.
$( document ).ready(function() {
  $("#sb-history").load("rateInfo.html");
  $("#sb-imagesetting").load("imagesetting.html");
});


loadData();
loadList();

// 로그인 유저의 정보 가져오기
function loadData() {
  $.getJSON('../../app/json/member/detail',
      function(data) {
    
    console.log(data);
    user = data;
    $('#profilePhoto').attr('src', '/studyboot/upload/images/member/thumbnail.' + user.photo + '.jpg');
    $('#inqryName').html(user.name);
    $('#inqryNo').val(user.no);
  });
};



// 로그인 유저의 스터디 데이터 가져오기
function loadList() {

  $.getJSON('../../app/json/member/mystudy', function(obj) {
    
    console.log(obj);
    
    if (obj.doingStudyList == null) {
      studyIsEmpty('doingStudy');
      
    } else {
      $(doingStudyGenerator(obj)).appendTo($('#doingStudy .js-carousel'));
    }
    
    if (obj.appliedStudyList == null) {
      studyIsEmpty('appliedStudy');
      
    } else {
      $(appliedStudyGenerator(obj)).appendTo($('#appliedStudy .js-carousel'));
    }
    
    if (obj.pickedStudyList == null) {
      studyIsEmpty('pickedStudy');
      
    } else {
      $(pickedStudyGenerator(obj)).appendTo($('#pickedStudy .js-carousel'));
    }
    
    // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-loadList');
  });
};


// 스터디가 없을 때 사용할 함수
function studyIsEmpty(study) {
  
  var $empty = $('<div class="js-slide g-flex-centered u-shadow-v39 rounded g-mx-15 g-my-30">'
      + '<article><img class="img-fluid w-100" src="/studyboot/upload/images/test2.jpeg" alt="Image Description">'
      + '<div class="g-bg-white g-pa-20"><h2 class="h5 g-color-black g-font-weight-600 mb-3">'
      + '스터디가 없습니다...'
      + '</h2></div></article></div>');
  
  if (study == 'doingStudy') {
    $('#doingStudy .js-carousel').append($empty);
    
  } else if (study == 'appliedStudy') {
    $('#appliedStudy .js-carousel').append($empty);
    
  } else {
    $('#pickedStudy .js-carousel').append($empty);
  }
}

// 스터디 리스트 가져온 후
$(document.body).bind('loaded-loadList', () => {
  // initialization of carousel
  $.HSCore.components.HSCarousel.init('#doingStudy .js-carousel');
});

// 신청한 스터디 탭 이벤트 발생 시
$('#appliedStudyTab').on('shown.bs.tab', () => {
  if(!appliedinit) {
    // initialization of carousel
    $.HSCore.components.HSCarousel.init('#appliedStudy .js-carousel');
  }
  appliedinit = true;
});
// 찜한 스터디 탭 이벤트 발생 시
$('#pickedStudyTab').on('shown.bs.tab', () => {
  if(!pickedinit) {
    // initialization of carousel
    $.HSCore.components.HSCarousel.init('#pickedStudy .js-carousel');
  }
  pickedinit = true;
});


// inquiry
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

// inquiry add
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








