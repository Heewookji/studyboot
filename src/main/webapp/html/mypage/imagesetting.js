
// cropper var
var image = document.getElementById('updateImage'),
imageInput = document.getElementById('imageInput'),
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







