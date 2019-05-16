var param = location.href.split('?')[1],
      ratingForm = document.getElementById("rating-form"),
      reviewForm = document.getElementById("review-form"),
      section = $('section'),
      i = 0,
      spaceNo;

if (param) {
  spaceNo = param.split('=')[1];
  loadDetail(spaceNo)
}

function loadDetail(no) {

  $.ajax({
    url : "../../app/json/space/detail?no=" + no,
    data : {name:'name', intro:'intro'},
    success : function(data) {
      console.log(data.detail); // detail은 controller에서 키값으로 보낸 것.
      $('#name').append(data.detail.name),
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
  });
}



$('#add-btn').click(function() {
  $.ajax({
    url : "../../app/json/space/add/review",
    type : "POST",
    data : {
      memberNo: 3,
      spaceNo: spaceNo,
      rating: $(ratingForm).val(),
      review: $(reviewForm).val()
    },
    success : function(data) {
      alert("후기가 등록 되었습니다.");
      location.href = 'view.html?no=' + spaceNo;
    },
    error : function(request, status, error) {
      alert("등록에 실패 했습니다.");
    }
  });
});



