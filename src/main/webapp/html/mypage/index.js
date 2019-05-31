var param = location.href.split('?')[1],
// 스터디 리스트 출력 - 스터디 목록
myStudyTemplateSrc = $('#myStudy-template').html(),
myStudyGenerator = Handlebars.compile(myStudyTemplateSrc),
appliedStudyTemplateSrc = $('#applied-study-template').html(),
appliedStudyGenerator = Handlebars.compile(appliedStudyTemplateSrc);

// 로그인 유저의 마이스터디 리스트 데이터 가져오기
function loadList() {

  $.getJSON('../../app/json/member/studylist', function(obj) {
    
    console.log(obj);
    
    if (obj.myStudyList == null) {
      $('#myStudyCarousel').append('<div class="js-slide g-flex-centered u-shadow-v39 rounded g-mx-15 g-my-30">'
          + '<article><img class="img-fluid w-100" src="/studyboot/upload/images/test2.jpeg" alt="Image Description">'
          + '<div class="g-bg-white g-pa-20"><h2 class="h5 g-color-black g-font-weight-600 mb-3">'
          + '진행중인 스터디가 없습니다...'
          + '</h2></div></article></div>');
      
    } else {
      $(myStudyGenerator(obj)).appendTo($('#myStudyCarousel'));
    }
    
    if (obj.appliedStudyList == null) {
      $('#appliedStudyCarousel').append('<div class="js-slide g-flex-centered u-shadow-v39 rounded g-mx-15 g-my-30">'
          + '<article><img class="img-fluid w-100" src="/studyboot/upload/images/test3.jpg" alt="Image Description">'
          + '<div class="g-bg-white g-pa-20"><h2 class="h5 g-color-black g-font-weight-600 mb-3">'
          + '신청한 스터디가 없습니다...'
          + '</h2></div></article></div>');
    
    } else {
      $(appliedStudyGenerator(obj)).appendTo($('#appliedStudyCarousel'));
    }

    // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-loadList');
  });
};

loadList();

// 스터디 리스트 가져온 후
$(document.body).bind('loaded-loadList', () => {
  $('').click()
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