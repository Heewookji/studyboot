var param = location.href.split('?')[1],
// 스터디 리스트 출력 - 스터디 목록
doingStudyTemplateSrc = $('#doing-study-template').html(),
doingStudyGenerator = Handlebars.compile(doingStudyTemplateSrc),
appliedStudyTemplateSrc = $('#applied-study-template').html(),
appliedStudyGenerator = Handlebars.compile(appliedStudyTemplateSrc),
pickedStudyTemplateSrc = $('#picked-study-template').html(),
pickedStudyGenerator = Handlebars.compile(pickedStudyTemplateSrc);

// 로그인 유저의 스터디 데이터 가져오기
function loadList() {

  $.getJSON('../../app/json/member/mystudy', function(obj) {
    
    console.log(obj);
    var $empty = $('<div class="js-slide g-flex-centered u-shadow-v39 rounded g-mx-15 g-my-30">'
          + '<article><img class="img-fluid w-100" src="/studyboot/upload/images/test2.jpeg" alt="Image Description">'
          + '<div class="g-bg-white g-pa-20"><h2 class="h5 g-color-black g-font-weight-600 mb-3">'
          + '진행중인 스터디가 없습니다...'
          + '</h2></div></article></div>')
    
    if (obj.doingStudyList == null) {
      $('#doingStudyCarousel').append($empty);
      
    } else {
      $(doingStudyGenerator(obj)).appendTo($('#doingStudyCarousel'));
    }
    
    if (obj.appliedStudyList == null) {
      $('#appliedStudyCarousel').append($empty);
      
    } else {
      $(appliedStudyGenerator(obj)).appendTo($('#appliedStudyCarousel'));
    }
    
    if (obj.pickedStudyList == null) {
      $('#pickedStudyCarousel').append($empty);
      
    } else {
      $(pickedStudyGenerator(obj)).appendTo($('#pickedStudyCarousel'));
    }
    
    // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-loadList');
  });
};

loadList();

// 스터디 리스트 가져온 후
$(document.body).bind('loaded-loadList', () => {
  //initialization of carousel
  $.HSCore.components.HSCarousel.init('.js-carousel');
  
  $()
  
});

//inquiry
$('#inqryForm-btn').click((e) => {
  e.preventDefault();
  $('.sspctForm-Format').addClass('std-invisible');
  $('#inqryName').html("홍길동");
  $('#formTitle').html($('#inqryName').html() +"님  문의"+ " 내용을 적어주세요");
  $('#sspctName').val("");
  $('#inqryNo').val(1);
  $('#sspctNo').val(0);
  $('#inqryClsNo').val(1);
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
      var obj = JSON.parse(data);
      location.reload();
    }
  });

});