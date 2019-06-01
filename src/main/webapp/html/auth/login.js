

//초기화 작업이다.
$(document).on('ready', function () {

    //네이버 로그인 초기화
    var naverLogin = new naver.LoginWithNaverId(
	    {
		clientId: "SfQg5WbbEwfRelyDmqBo",
		callbackUrl: "http://localhost:8080/studyboot/html/auth/naverlogincallback.html",
		isPopup: true, /* 팝업을 통한 연동처리 여부 */
		loginButton: {color: "green", type: 1, height: 30} /* 로그인 버튼의 타입을 지정 */
	    }
    );
    /* 설정정보를 초기화하고 연동을 준비 */
    naverLogin.init();

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






