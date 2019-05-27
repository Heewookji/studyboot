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
		location.href = "/studyboot"
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






