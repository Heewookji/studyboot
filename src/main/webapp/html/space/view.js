var param = location.href.split('?')[1],
ratingForm = $("#rating-form"),
reviewForm = $("#review-form"),
reviewUpdateForm = $("#review-update-form"),
ratingUpdateForm = $("#rating-update-form"),
spaceName = $('#space-name'),
//section = $('section'),
i = 0,
updateNo, // 리뷰 수정 시 모달 폼에게 key값 전달하기 위한 변수
spaceNo;

if (param) {
  spaceNo = param.split('=')[1];
  loadDetail(spaceNo)
}

//겟 방식은 getJson으로 처리하고
//post 방식은 get방식과 post방식 모두 처리 할 수 있다. (보통 post로 씀)
function loadDetail(no) {

  $.ajax({
    // json/space/detail이 붙은 controller로 이동하고 ?(물음표) 뒤에 값은 파라미터 값으로 보내준다. 
    // + 이후에 있는 no는 controller의 파라미터 명이다.
    url : "../../app/json/space/detail?no=" + no,
    data : {name:'name', intro:'intro'},
    success : function(data) {
      console.log(data.detail); // detail은 controller에서 키값으로 보낸 것.
      $(spaceName).append(data.detail.name),
      $('#intro').append(data.detail.intro)
    },
    error : function(request, status, error) {
      alert("에러가 발생했습니다.");
    }
  });

  $.getJSON('../../app/json/space/detail?no=' + no, 
      function(obj) {
    var templateTag = $('#div-tag').html();
    var trTagGenerator = Handlebars.compile(templateTag);
    $(trTagGenerator(obj)).appendTo($(tag));

    var templateConvName = $('#div-convName').html();
    var trConvNameGenerator = Handlebars.compile(templateConvName);
    $(trConvNameGenerator(obj)).appendTo($(convName));

    var templateSpacePhoto = $('#div-spacePhoto').html();
    var trSpacePhotoGenerator = Handlebars.compile(templateSpacePhoto);
    $(trSpacePhotoGenerator(obj)).appendTo($(filePath));

    var templateRoomInfo = $('#div-roomInfo').html();
    var trRoomInfoGenerator = Handlebars.compile(templateRoomInfo);
    $(trRoomInfoGenerator(obj)).appendTo($(roomInfo));

    var templateSpaceReview = $('#div-spaceReview').html();
    var trSpaceReviewGenerator = Handlebars.compile(templateSpaceReview);
    $(trSpaceReviewGenerator(obj)).appendTo($(spaceReview));

    $(document.body).trigger('loaded-detail'); // trigger가 'loaded-detail'을 실행 시킨다.
    // tirgger와 bind는 세트!!
  });
}

//$('#add-btn').click( function() {
$('#add-btn').click( () => {
	
  $.ajax({
    url : "../../app/json/space/add/review",
    type : "POST",
    data : {
      memberNo: 3, // 좌항은 프러퍼티명 , 우항은 프러퍼티에 담을 값
      spaceNo: spaceNo,
      rating: $(ratingForm).val(), // rating-form 태그의 값을 가져와서 담는다.
      review: $(reviewForm).val()
    },
    success : function(data) {
      location.reload();
    },
    error : function(request, status, error) {
      alert("등록에 실패 했습니다.");
    }
  });
});

//handlebars가 비동기 방식이라 trigger, bind 사용
$(document.body).bind('loaded-detail', () => { // trigger가 loaded-detail이라는 이름을 갖는 bind를 실행시킨다.
 
  $('.delete-review').click((e) => {
    if ( confirm('정말 삭제하시겠습니까?') ) {
      $.ajax({
        url : "../../app/json/space/delete/review",
        type : "GET",
        data : {
          // $(e.target).attr('review-no')는 review-no의 값을 가져온다.
          no : $(e.target).attr('review-no')
        },
        success : function() {
          location.reload();
        },
        error : function(request, status, error) {
          alert('삭제 실패');
        }
      })
    }
  });
});


$(document.body).bind('loaded-detail', () => {

  $('.updateBtn').click((e) => {
    updateNo = $(e.target).attr('review-no');
  });
});


$(document.body).bind('loaded-detail', () => {

  $('#update-btn').click((e) => {
    //alert($(e.target).attr('data-no'));
    $.ajax({
      url : "../../app/json/space/update/review",
      type : "POST",
      data : {
        no : updateNo,
        rating: $(ratingUpdateForm).val(),
        review: $(reviewUpdateForm).val()
      },
      success : function() {
        alert('수정 되었습니다.');
        location.reload();
      },
      error : function(request, status, error) {
        alert('수정 실패');
      }
    })
  });
});
