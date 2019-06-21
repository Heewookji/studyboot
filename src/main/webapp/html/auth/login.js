errorTitle = '오! 이런..'
  ;

//초기화 작업이다.
$(document).on('ready', function () {

  //네이버 로그인 초기화
  var naverLogin = new naver.LoginWithNaverId(
          {
            clientId: "SfQg5WbbEwfRelyDmqBo",
            callbackUrl: "http://localhost:8080/studyboot/html/auth/naverlogincallback.html",
            isPopup: true /* 팝업을 통한 연동처리 여부 */
          }
  );
  /* 설정정보를 초기화하고 연동을 준비 */
  naverLogin.init();


//페이스북  로그인 초기화
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '608458479642615',
      cookie     : true,
      xfbml      : true,
      version    : 'v3.3'
    });
    FB.AppEvents.logPageView();   
  };

  //동적 스크립트 생성
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

});

$("#fb-btn").click((e) => {
  e.preventDefault();

  FB.login(function(response) {
    //로그인 과정이 완료되면 실행
    checkLoginState();
  }, {
    scope: 'public_profile',
    auth_type: 'rerequest'
  });
});


if (window.localStorage.getItem('email')) {
  $('#email').val(localStorage.email);
}




document.querySelector('#login-btn').onclick = () => {

  $.ajax({
    url:'/studyboot/app/json/auth/login',
    type: 'post',
    dataType: 'text',
    contentType: 'application/x-www-form-urlencoded',
    data: {
      email: $(email).val(),
      password:$(password).val()
    },
    success: function(data){
      var obj = JSON.parse(data);

      if (obj.status == 'success') {
        location.href = "/studyboot";
      } else {
        Swal.fire({
          type: 'error',
          title: errorTitle,
          text: '로그인 실패입니다!'
        });
      }
    }
  });

  if ($('#saveEmail:checked') != null) {
    window.localStorage.email = $('#email').val();
  } else {
    window.localStorage.removeItem("email");
  }
};



//비번 수정하려고 입력시 이메일 체크
$( "#modalEmail" ).keyup(function(){
  if(checkEmail($( "#modalEmail" ).val()) == true){
    $('#modalEmail').tooltip('disable');
    $('#modalEmail').tooltip('hide');
    $("#modalEmail-btn").prop("disabled", false);
  } else{
    $("#modalEmail").attr("data-toggle","tooltip");
    $("#modalEmail").attr("data-trigger","hover focus");
    $("#modalEmail").attr("data-placement","bottom");
    $("#modalEmail").attr("title","이메일 양식에 맞게 적어주세요");
    $('#modalEmail').tooltip('enable');
    $('#modalEmail').tooltip('show');
    $("#modalEmail-btn").prop("disabled", true);
  }
});


$("#modalEmail-btn").click((e) => {
//이메일 중복체크
  $.getJSON('/studyboot/app/json/member/emailcheck?email='+ $("#modalEmail").val(), function(obj) {
    if(obj.status == "fail"){
      Swal.fire({
        type: 'error',
        title: errorTitle,
        text: '해당 이메일이 없습니다!'
      });
    } else{

      //발송됐다는 것을 알려주자!
      $("#modalEmail-btn").attr("data-toggle","tooltip");
      $("#modalEmail-btn").attr("data-trigger","hover focus");
      $("#modalEmail-btn").attr("data-placement","bottom");
      $("#modalEmail-btn").attr("title","발송되었습니다!");
      $('#modalEmail-btn').tooltip('enable');
      $('#modalEmail-btn').tooltip('show');

      $.getJSON('/studyboot/app/json/mail/sendpasswordmail?email='+ $("#modalEmail").val(), function(obj) {
      });
    }
  });
});



//이메일 체크
function checkEmail(email){
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email == '' || !re.test(email)) {
    return false;
  }
  return true;
}

