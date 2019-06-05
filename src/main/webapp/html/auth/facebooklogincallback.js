
//로그인 뒤, 액세스 토큰으로 사용자 정보를 가져온다.
function checkLoginState() {
  
  FB.getLoginStatus(function(response) {
    
    if (response.status === 'connected') { // 로그인이 정상적으로 되었을 때,
      var token = response.authResponse.accessToken;
      
      $.ajax({
        url:'/studyboot/app/json/auth/sociallogin',
        type: 'post',
        dataType: 'text',
        contentType: 'application/x-www-form-urlencoded',
        data: {
          token: token,
          social: 'facebook'
        },
        success: function(data){
          var data = JSON.parse(data);
          
          if(data.status == "success"){
            close();
            location.href = "/studyboot"
          }
          
        }
      });
      
          
    } else { // 로그인이 되지 않았을 때,
      console.log("로그인 되지 않았음");
    }
  });
}