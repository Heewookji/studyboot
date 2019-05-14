var param = location.href.split('?')[1],
section = $('section'),
i = 0;

if (param) {
  loadDetail(param.split('=')[1])
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
