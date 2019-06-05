

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
        alert('로그인 실패입니다!');
      }
    }
  });

  if ($('#saveEmail:checked') != null) {
    window.localStorage.email = $('#email').val();
  } else {
    window.localStorage.removeItem("email");
  }
};






