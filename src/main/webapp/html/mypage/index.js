// 스터디 리스트 출력 - 스터디 목록
var doingStudyTemplateSrc = $('#doing-study-template').html(),
doingStudyGenerator = Handlebars.compile(doingStudyTemplateSrc),
appliedStudyTemplateSrc = $('#applied-study-template').html(),
appliedStudyGenerator = Handlebars.compile(appliedStudyTemplateSrc),
pickedStudyTemplateSrc = $('#picked-study-template').html(),
pickedStudyGenerator = Handlebars.compile(pickedStudyTemplateSrc),
appliedinit = false,
pickedinit = false,
doingStudyList,
appliedStudyList,
pickedStudyList,
user;


// 페이지가 준비되면 평점 정보, 이미지세팅 모달창을 꽂아준다.
$( document ).ready(function() {
  $("#sb-history").load("rateInfo.html");
  $("#sb-imagesetting").load("imagesetting.html");
});


loadData();
loadStudyList();

// 로그인 유저의 정보 가져오기
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

// 별점 렌더링 함수
function initStar(list) {
  for(var e of list){
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
}

// 로그인 유저의 스터디 데이터 가져오기
function loadStudyList() {

  $.getJSON('../../app/json/member/mystudy', function(obj) {
    
    console.log(obj);
    doingStudyList = obj.doingStudyList;
    appliedStudyList = obj.appliedStudyList;
    pickedStudyList = obj.pickedStudyList;
    
    if (doingStudyList == null || doingStudyList == undefined) {
      studyIsEmpty('doingStudy');
      
    } else {
      $(doingStudyGenerator(obj)).appendTo($('#doingStudy .js-carousel'));
      initStar(window.doingStudyList);
    }
    
    if (appliedStudyList == null || appliedStudyList == undefined) {
      studyIsEmpty('appliedStudy');
      
    } else {
      $(appliedStudyGenerator(obj)).appendTo($('#appliedStudy .js-carousel'));
      initStar(window.appliedStudyList);
    }
    
    if (pickedStudyList == null || pickedStudyList == undefined) {
      studyIsEmpty('pickedStudy');
      
    } else {
      $(pickedStudyGenerator(obj)).appendTo($('#pickedStudy .js-carousel'));
      initStar(window.pickedStudyList);
    }
    
    // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-loadStudyList');
  });
};


// 스터디가 없을 때 사용할 함수
function studyIsEmpty(study) {
  
  var $empty = $('<div class="js-slide g-flex-centered u-shadow-v39 rounded g-mx-15 g-my-30">'
      + '<article><img class="img-fluid w-100" src="/studyboot/upload/images/test3.jpg" alt="Image Description">'
      + '<div class="g-bg-white g-pa-20"><h2 class="h5 g-color-black g-font-weight-600 mb-3">'
      + '새로운 스터디를 시작해 보세요!</h2>'
      + '<a href="/studyboot/">스터디 보러 가기</a></div></article></div>');
  
  if (study == 'doingStudy') {
    $('#doingStudy .js-carousel').append($empty);
    
  } else if (study == 'appliedStudy') {
    $('#appliedStudy .js-carousel').append($empty);
    
  } else {
    $('#pickedStudy .js-carousel').append($empty);
  }
}

// 스터디 리스트 가져온 후
$(document.body).bind('loaded-loadStudyList', () => {
  
  $('.myStudy-view-link').click((e) => {
    location.href = '../mystudy/index.html?no=' + $(e.target).parents('.card-div').find('a').attr("data-no");
  });
  
  $('.study-view-link').click((e) => {
    location.href = '../study/view.html?studyno=' + $(e.target).parents('.card-div').find('a').attr("data-no")
    + '&name=' + $(e.target).parents('.card-div').find('a').html();
  });

  $( ".study-view-link" ).hover(
          function(e) {
          }, function(e) {
          }
  );
  
  // initialization of carousel
  $.HSCore.components.HSCarousel.init('#doingStudy .js-carousel');
});

// 진행중인 스터디 탭 이벤트 발생 시
$('#doingStudyTab').on('shown.bs.tab', () => {
  $('#doingStudy .js-carousel').slick('unslick');
  $.HSCore.components.HSCarousel.init('#doingStudy .js-carousel');
  
  if (window.doingStudyList != undefined && window.doingStudyList != null) {
    initStar(window.doingStudyList);
  }
});

// 신청한 스터디 탭 이벤트 발생 시
$('#appliedStudyTab').on('shown.bs.tab', () => {
  
  if (appliedinit) {
    $('#appliedStudy .js-carousel').slick('unslick');
  }
  $.HSCore.components.HSCarousel.init('#appliedStudy .js-carousel');
  
  if (window.appliedStudyList != undefined && window.appliedStudyList != null) {
    initStar(window.appliedStudyList);
  }
  appliedinit = true;
});

// 찜한 스터디 탭 이벤트 발생 시
$('#pickedStudyTab').on('shown.bs.tab', () => {
  
  if (pickedinit) {
    $('#pickedStudy .js-carousel').slick('unslick');
  }
  $.HSCore.components.HSCarousel.init('#pickedStudy .js-carousel');
  
  if (window.pickedStudyList != undefined && window.pickedStudyList != null) {
    initStar(window.pickedStudyList);
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








