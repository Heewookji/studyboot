var param = location.href.split('?')[1],
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
      console.log(data.detail);
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

$('#add-btn').click = () => {
  $.ajax({
    url : "../../app/json/space/add/review",
    type : "POST",
    dataType : "text",
    data : {
      memberNo: 3,
      spaceNo: spaceNo,
      rating: $(rating-form).val(),
      review: $(review-form).val()
    },
    success : function(data) {
      $('#name').append(data.detail.name)
    },
    error : function(request, status, error) {
      alert("에러가 발생했습니다.");
    }
  });
};