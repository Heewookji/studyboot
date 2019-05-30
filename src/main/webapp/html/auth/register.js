var emailNo,
phoneNo,
emailInit = true,
phoneInit = true,
nickChecked,
emailCountDownFunction
;

//js와 css 의 초기화 작업이다.
$(document).on('ready', function () {

    //핸드폰 인증 api
    IMP.init("imp46277948"); // "imp00000000" 대신 발급받은 "가맹점 식별코드"를 사용합니다.

    // initialization of tabs
    $.HSCore.components.HSTabs.init('[role="tablist"]');
    // initialization of counters
    var counters = $.HSCore.components.HSCounter.init('[class*="js-counter"]');
});
$(window).on('load', function () {
    // initialization of HSMegaMenu component
    $('.js-mega-menu').HSMegaMenu({
	event: 'hover',
	pageContainer: $('.container'),
	breakpoint: 991
    });
    // initialization of custom select
    setTimeout(function() { // important in this case
	$.HSCore.components.HSSelect.init('.js-custom-select');
    }, 1);


});
$(window).on('resize', function () {
    setTimeout(function () {
	$.HSCore.components.HSTabs.init('[role="tablist"]');
    }, 200);
});

//이메일 버튼을 눌렀을때, 카운트다운 실행, 인증번호 확인 한다.
$("#email-btn").click((e) => {

    clearInterval(emailCountDownFunction);
    emailCountDown();

    $.getJSON('/studyboot/app/json/mail/send?email='+ $("#email").val(), function(obj) {

	emailNo = obj.id;

    });
    //처음에만 한번 등록
    if(emailInit){
	$( "#emailNo" ).change(function() {
	    if($("#emailNo").val() == emailNo){
		$("#emailNo").removeClass("is-invalid");
		$("#emailNo").addClass("is-valid");
	    } else{
		$("#emailNo").removeClass("is-valid");
		$("#emailNo").addClass("is-invalid");
	    }
	});
    }
    emailInit = false;
});

//핸드폰인증 버튼을 눌렀을때 api 인증 한다.
$("#phone-btn").click((e) => {

    IMP.request_pay({
	    pg : 'danal', // version 1.1.0부터 지원.
	    pay_method : 'phone',
	    merchant_uid : 'merchant_' + new Date().getTime(),
	    name : '주문명:결제테스트',
	    amount : 1400,
	    buyer_email : 'iamport@siot.do',
	    buyer_name : '구매자이름',
	    buyer_tel : '010-1234-5678',
	    buyer_addr : '서울특별시 강남구 삼성동',
	    buyer_postcode : '123-456',
	    m_redirect_url : 'http://localhost:8080/studyboot/html/auth/register.html'
	}, function(rsp) {
	    if ( rsp.success ) {
	        var msg = '결제가 완료되었습니다.';
	        msg += '고유ID : ' + rsp.imp_uid;
	        msg += '상점 거래ID : ' + rsp.merchant_uid;
	        msg += '결제 금액 : ' + rsp.paid_amount;
	        msg += '카드 승인번호 : ' + rsp.apply_num;
	    } else {
	        var msg = '결제에 실패하였습니다.';
	        msg += '에러내용 : ' + rsp.error_msg;
	    }
	    alert(msg);
	});

});


//닉네임 체크
$( "#nickName" ).keyup(function(){
    var init;

    if(nickCheck($("#nickName").val()) == true){
	$( "#nickCheck-btn").prop("disabled",false);
	$('#nickName').tooltip('disable');
	$('#nickName').tooltip('hide');
    } else{
	if(init != 1){
	    $("#nickName").attr("data-toggle","tooltip");
	    $("#nickName").attr("data-trigger","hover focus");
	    $("#nickName").attr("data-placement","bottom");
	    $("#nickName").attr("title","4~10자의 한글, 영문, 숫자만 사용할 수 있습니다");
	}
	$('#nickName').tooltip('enable');
	$('#nickName').tooltip('show');
	$( "#nickCheck-btn").prop("disabled",true);
    }

});

//비번체크
$( "#password" ).keyup(function(){

    if(checkPassword($( "#password" ).val()) == true){
	$('#password').tooltip('disable');
	$('#password').tooltip('hide');
    } else{
	$("#password").attr("data-toggle","tooltip");
	$("#password").attr("data-trigger","hover focus");
	$("#password").attr("data-placement","bottom");
	$("#password").attr("title","숫자,영문자,특수문자 조합으로 \n중복문자 없이 6자리 이상 사용해야 합니다");
	$('#password').tooltip('enable');
	$('#password').tooltip('show');
    }

    if($('#passwordConfirm').val().length != 0){
	if(equalPassword($( "#passwordConfirm" ).val(), $( "#password" ).val()) == true){
	    $('#passwordConfirm').tooltip('disable');
	    $('#passwordConfirm').tooltip('hide');
	} else {
	    $("#passwordConfirm").attr("data-toggle","tooltip");
	    $("#passwordConfirm").attr("data-trigger","hover focus");
	    $("#passwordConfirm").attr("data-placement","bottom");
	    $("#passwordConfirm").attr("title","비밀번호가 일치하지 않습니다");
	    $('#passwordConfirm').tooltip('enable');
	}
    }
});

//입력시 비번일치 체크
$( "#passwordConfirm" ).keyup(function(){
    var init;
    if(equalPassword($( "#passwordConfirm" ).val(), $( "#password" ).val()) == true){
	$('#passwordConfirm').tooltip('disable');
	$('#passwordConfirm').tooltip('hide');
    } else{
	if(init != 1){
	    $("#passwordConfirm").attr("data-toggle","tooltip");
	    $("#passwordConfirm").attr("data-trigger","hover focus");
	    $("#passwordConfirm").attr("data-placement","bottom");
	    $("#passwordConfirm").attr("title","비밀번호가 일치하지 않습니다");
	}
	$('#passwordConfirm').tooltip('enable');
	$('#passwordConfirm').tooltip('show');
    }
});

//입력시 이메일 체크
$( "#email" ).keyup(function(){
    if(checkEmail($( "#email" ).val()) == true){
	$('#email').tooltip('disable');
	$('#email').tooltip('hide');
	$("#email-btn").prop("disabled", false);
    } else{
	$("#email").attr("data-toggle","tooltip");
	$("#email").attr("data-trigger","hover focus");
	$("#email").attr("data-placement","bottom");
	$("#email").attr("title","이메일 양식에 맞게 적어주세요");
	$('#email').tooltip('enable');
	$('#email').tooltip('show');
	$("#email-btn").prop("disabled", true);
    }
});

//입력시 핸드폰번호 체크
$( "#phone" ).keyup(function(){
    if(checkPhone($( "#phone" ).val()) == true){
	$('#phone').tooltip('disable');
	$('#phone').tooltip('hide');
	$("#phone-btn").prop("disabled", false);
    } else{
	$("#phone").attr("data-toggle","tooltip");
	$("#phone").attr("data-trigger","hover focus");
	$("#phone").attr("data-placement","bottom");
	$("#phone").attr("title","휴대폰 번호 양식에 맞게 적어주세요");
	$('#phone').tooltip('enable');
	$('#phone').tooltip('show');
	$("#phone-btn").prop("disabled", true);
    }
});





//닉네임 중복체크
$("#nickCheck-btn").click(function() {

    // nickName 을 param으로 보내기 위한 변수
    var nickName =  $("#nickName").val();
    console.log(nickName);

    $.ajax({
	async: true,
	type : 'POST',
	data : nickName,
	url : "/studyboot/app/json/member/nickcheck",
	dataType : "json",
	contentType: "application/json; charset=UTF-8",
	success : function(data) {
	    if (data.cnt > 0) {
		alert("닉네임이 존재합니다. 다른 닉네임을 입력해주세요.");
		nickChecked = 0;
	    } else {
		alert("사용가능한 아이디입니다.");
		nickChecked = 1;
	    }
	},
	error : function(error) {
	    alert("error : " + error);
	}
    });
});


//닉네임 체크
function nickCheck(str) {

    if(str.length < 4 || str.length > 10) {
	return false;
    }
    var chk = /[0-9]|[a-z]|[A-Z]|[가-힣]/;

    for( var i = 0; i <= str.length -1 ; i++ )    {

	if(chk.test(str.charAt(i)))	{
	}
	else	{
	    return false;
	}
    }
    return true;
}

//비번 일치체크
function equalPassword(confirmPassword, password){
    return confirmPassword == password;
}


//패스워드 체크
function checkPassword(password){
    if(!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,25}$/.test(password)){
	return false;
    }    
    var checkNumber = password.search(/[0-9]/g);
    var checkEnglish = password.search(/[a-z]/ig);
    if(checkNumber <0 || checkEnglish <0){
	return false;
    }
    if(/(\w)\1\1\1/.test(password)){
	return false;
    }
    return true;
}

function checkEmail(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email == '' || !re.test(email)) {
	return false;
    }
    return true;
}


function checkPhone(phone){
    var re = /^\d{3}-\d{3,4}-\d{4}$/;

    if (phone == '' || !re.test(phone)) {
	return false;
    }
    return true;
}

function emailCountDown(){
    var future = new Date();
    future.setMinutes(future.getMinutes()+3);
    var countDownDate = future.getTime();
    // Update the count down every 1 second
    emailCountDownFunction = setInterval(function() {
	// Get today's date and time
	var now = new Date().getTime();
	// Find the distance between now and the count down date
	var distance = countDownDate - now;
	// Time calculations for days, hours, minutes and seconds
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	if(seconds < 10){
	    $("#emailNo").attr("placeholder", "0" +minutes + " : " + "0" + seconds);
	} else{
	    $("#emailNo").attr("placeholder", "0" +minutes + " : " + seconds);
	}

	if (distance < 0) {
	    $("#emailNo").attr("placeholder", "시간초과!");
	    emailNo = null;
	    clearInterval(emailCountDownFunction);
	}
    }, 1000);

}



