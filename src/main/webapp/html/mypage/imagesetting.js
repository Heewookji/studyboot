// cropper var
var image = document.getElementById('updateImage'),
imageInput,
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
$modal = $('#imageModal'),
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

var page = location.href.split('/')[5],
      studyNo;

if (page === "mystudy") { // 현재 페이지가 mystudy 이면..
  imageInput = document.getElementById('mystudyImageInput');
  studyNo =  location.href.split('?')[1].split('=')[1];
  
  (function (myStudyNo) { // 스터디 장 판단
    $.getJSON('../../app/json/MyStudy/leader?no=' + studyNo,
        function(obj) {
      window.leader = obj.leader;
      console.log(window.leader);
    });
  }(myStudyNo));
  
  if(window.leader === false){ // 로그인 한 유저가 스터디 장이 아니면 스터디 프로필 사진 변경 못함
    $("#study-profile-image").removeClass();
  } 
  
} else {
  imageInput = document.getElementById('imageInput');
}

// mystudy 페이지 인지 mypage인지 구분하여 모달의 변경 버튼을 바꾼다.
if (page === "mystudy") {
  $('#myStudy-imageUpload-btn').show();
  $('#imageUpload-btn').hide();
} else {
  $('#imageUpload-btn').show();
  $('#myStudy-imageUpload-btn').hide();
}


// Import image
if (URL) {
  
  imageInput.addEventListener('change', function() {
    
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
        $modal.modal('show');
        
      } else {
        window.alert('Please choose an image file.');
      }
    }
  });
  
} else {
  imageInput.attr('disabled', true);
  imageInput.parent()[0].className += ' disabled';
}

$('#imageModal').on('shown.bs.modal', () => {
  cropper = new Cropper(image, options);
  
}).on('hidden.bs.modal', () => {
  imageInput.value = '';
  cropper.destroy();
  cropper = null;
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
          avatar.attr('src', '/studyboot/upload/images/member/thumbnail.' + data.loginUser.photo + '.jpg');
          $('#history-profilePhoto').attr('src', '/studyboot/upload/images/member/thumbnail.' + data.loginUser.photo + '.jpg');
          $('#hd-thumbnail').attr('src', '/studyboot/upload/images/member/thumbnail.' + data.loginUser.photo + '.jpg');
          imageChanged = true;
          $alert.show().addClass('alert-success').text('Upload success');
        },
        error: function () {
          avatar.attr('src', initialAvatarURL);
          imageChanged = false;
          $alert.show().addClass('alert-warning').text('Upload error');
        }
      });
    });
  }
});


$('#myStudy-imageUpload-btn').click(() => {
  
  var initialAvatarURL;
  var canvas;
  
  $('#imageModal').modal('hide');
  
  if (cropper) {
    // 캔버스 변수에 크랍박스 데이터를 넣는다.
    canvas = cropper.getCroppedCanvas();
    // 기존의 이미지 소스를 저장
    initialAvatarURL = avatar.attr('src');
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
          avatar.attr('src', '/studyboot/upload/images/member/thumbnail.' + data.loginUser.photo + '.jpg');
          $('#history-profilePhoto').attr('src', '/studyboot/upload/images/member/thumbnail.' + data.loginUser.photo + '.jpg');
          $('#hd-thumbnail').attr('src', '/studyboot/upload/images/member/thumbnail.' + data.loginUser.photo + '.jpg');
          imageChanged = true;
          $alert.show().addClass('alert-success').text('Upload success');
        },
        error: function () {
          avatar.attr('src', initialAvatarURL);
          imageChanged = false;
          $alert.show().addClass('alert-warning').text('Upload error');
        }
      });
    });
  }
});




