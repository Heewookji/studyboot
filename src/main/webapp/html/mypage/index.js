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


// 페이지가 준비되면 평점 정보 모달창을 꽂아준다.
$( document ).ready(function() {
  $("#sb-history").load("rateInfo.html")
  $(document.body).trigger('loaded-history');
});


loadData();
loadList();

// 로그인 유저의 정보 가져오기
function loadData() {
  $.getJSON('../../app/json/member/detail',
      function(data) {
    
    console.log(data);
    user = data;
// $('#nickName').val(data.nickName);
    $('#profilePhoto').attr('src', '/studyboot/upload/images/member/' + user.photo);
    $('#updateImage').attr('src', '/studyboot/upload/images/member/' + user.photo);
    
// $('#cls').val(data.cls);
// $('#sdt').val(data.startDate);
// $('#edt').val(data.endDate);
// $('#prsn').val(data.personnel);
// $('#rate').val(data.rate);
// $('#age').val(data.memberAge);
// $('#attendance').val(data.attendance);
// $('#endrate').val(data.endrate);
    
    $(document.body).trigger('loaded-data');
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
  $('#inqryName').html("홍길동");
  $('#formTitle').html($('#inqryName').html() +"님  문의"+ " 내용을 적어주세요");
  $('#sspctName').val("");
  $('#inqryNo').val(1);
  $('#sspctNo').val(0);
  $('#inqryClsNo').val(1);
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
      var obj = JSON.parse(data);
      location.reload();
    }
  });
});


// 사진 파일 업로드
// $('#imageInput').fileupload({
// url: '../../app/json/member/photo', // 서버에 요청할 URL
// dataType: 'json', // 서버가 보낸 응답이 JSON임을 지정하기
// sequentialUploads: true,
// singleFileUploads: false,
// autoUpload: false,
// replaceFileInput : true,
// processalways: function (e, data) {
//    
// console.log('add()...');
// console.log(data);
//    
// if (!checkImageType(data.files[0].name)) {
// alert('사진 파일만 선택 할 수 있습니다!')
// return false;
// }
//    
// if (data.files && data.files[0]) {
//      
// var reader = new FileReader();
// reader.onload = (e) => {
// $('#prevImage').attr('src', e.target.result);
// }
// reader.readAsDataURL(data.files[0]);
//      
// imgUdt = false;
// $('#imageUpdate-btn').prop('disabled', false);
// $('#imageUpdate-btn').unbind("click");
// $('#imageUpdate-btn').click(function() {
// data.submit();
// });
// }
// },
// done: function (e, data) {
// $('#profilePhoto').attr('src', '/studyboot/upload/images/member/' +
// data.result.loginUser.photo);
// $('#history-profilePhoto').attr('src', '/studyboot/upload/images/member/' +
// data.result.loginUser.photo);
// $('#hd-thumbnail').attr('src', '/studyboot/upload/images/member/thumbnail.' +
// data.result.loginUser.photo + '.jpg');
// user.photo = data.result.loginUser.photo;
// imgUdt = true;
// $('#imageModal').modal('hide');
// $('#imageUpdate-btn').prop('disabled', true);
// }
// });


// cropper var
var image = document.getElementById('updateImage'),
imageInput = $('#imageInput'),
avatar = $('#profilePhoto'),
cropBoxData,
canvasData,
cropper,
URL = window.URL || window.webkitURL,
originalImageURL,
uploadedImageType = 'image/jpeg',
uploadedImageURL,
imageChanged = null,
$alert = $('.alert'),
// cropper options
options = {
    viewMode: 3,
    dragMode: 'move',
    aspectRatio: 1/1,
    guides: false,
    background: false,
    ready: function () {
        cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
      }
  };


// Import image
if (URL) {
  imageInput.change(function() {
    
    var files = this.files;
    var file;

    if (files && files.length) {
      file = files[0];

      if (/^image\/\w+/.test(file.type)) {
        uploadedImageType = file.type;
        imageChanged = false;

        if (originalImageURL) {
          URL.revokeObjectURL(originalImageURL);
        }
        
        if (uploadedImageURL) {
          URL.revokeObjectURL(uploadedImageURL);
        }
        
        originalImageURL = image.src;
        image.src = uploadedImageURL = URL.createObjectURL(file);
        
        if (cropper) {
          cropper.destroy();
        }
        cropper = new Cropper(image, options);
        imageInput.value = null;
        $(document.body).trigger('import-new-image');
        
      } else {
        window.alert('Please choose an image file.');
      }
    }
  });
  
} else {
  imageInput.attr('disabled', true);
  imageInput.parent()[0].className += ' disabled';
}

$(document.body).bind('import-new-image', () => {
  
  $('#imageUpload-btn').prop('disabled', false);
  
  // 프사 모달 닫힐 때
  $('#imageModal').on('hidden.bs.modal', () => {
    if (cropper) {
      if (!imageChanged) {
        image.src = originalImageURL;
      }
      cropper.destroy();
      $('#imageUpload-btn').prop('disabled', true);
    }
  });

});

$('#imageUpload-btn').click(() => {
  
  var initialAvatarURL;
  var canvas;
  
  $('#imageModal').modal('hide');
  
  if (cropper) {
    // 캔버스 변수에 크랍박스 데이터를 넣는다.
    canvas = cropper.getCroppedCanvas();
    // 기존의 이미지 소스를 저장
    initialAvatarURL = avatar.attr('src');
    avatar.attr('src', canvas.toDataURL());
    image.src = canvas.toDataURL();
    // 앨럿 요소의 클래스를 초기화
    $alert.removeClass('alert-success alert-warning');
    // 캔버스의 데이터를 Blob 형식으로 출력하는 함수 호출
    // anonymous 함수에 파라미터로 blob을 넘기고 실행
    canvas.toBlob(function (blob) {
      var formData = new FormData();
      // formdata 객체에 blob 데이터를 꼽아준다.
      formData.append('avatar', blob, 'avatar.jpg');
      
      // 비동기 요청 실행
      $.ajax({
        url: '../../app/json/member/photo',
        method: 'POST',
        data: formData,
        enctype: "multipart/form-data",
        processData: false,
        contentType: false,
        success: function (data) {
          $('#history-profilePhoto').attr('src', '/studyboot/upload/images/member/thumbnail.' + data.loginUser.photo + '.jpg');
          $('#hd-thumbnail').attr('src', '/studyboot/upload/images/member/thumbnail.' + data.loginUser.photo + '.jpg');
          imageChanged = true;
          $alert.show().addClass('alert-success').text('Upload success');
        },
        error: function () {
          avatar.attr('src', initialAvatarURL);
          image.src = originalImageURL;
          imageChanged = false;
          $alert.show().addClass('alert-warning').text('Upload error');
        }
      });
    });
  }
});







