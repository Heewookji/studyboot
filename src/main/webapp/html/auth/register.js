var emailNo,
emailInit;
;

$(document).on('ready', function () {
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


$("#email-btn").click((e) => {

    $("#email-btn").prop("hidden", true);
    $("#emailNo").prop("type", "text");

    $.getJSON('/studyboot/app/json/mail/send?email='+ $("#email").val(), function(obj) {
	emailNo = obj.id;
    }
    );
    //처음에만 한번 등록
    if(emailInit){
	$( "#emailNo" ).change(function() {
	    if($("#emailNo").val() == emailNo){
		alert("일치합니다!");
	    }
	});
    }
    emailInit = false;
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
    var init;

    if(checkPassword($( "#password" ).val()) == true){
	$('#password').tooltip('disable');
	$('#password').tooltip('hide');
    } else{
	if(init != 1){
	    $("#password").attr("data-toggle","tooltip");
	    $("#password").attr("data-trigger","hover focus");
	    $("#password").attr("data-placement","bottom");
	    $("#password").attr("title","숫자,영문자,특수문자 조합 중복문자 없이 6자리 이상 사용해야 합니다");
	}
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
	$('#newPassword').val('').focus();
	return false;
    }
    if(/(\w)\1\1\1/.test(password)){
	$('#newPassword').val('').focus();
	return false;
    }
    return true;
}

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
		alert("아이디가 존재합니다. 다른 아이디를 입력해주세요.");
		// 아이디가 존재할 경우 빨강으로 , 아니면 파랑으로 처리하는 디자인
		$('#nickName').closest('div').addClass('u-has-error-v1');
		$('#nickName').siblings('small').removeClass('std-invisible');
		$('#nickName').focus();
		nickCheck = 0;
	    } else {
		alert("사용가능한 아이디입니다.");
		// 아이디가 존제할 경우 빨깡으로 , 아니면 파랑으로 처리하는 디자인
		$('#nickName').closest('div').removeClass('u-has-error-v1');
		$('#nickName').closest('div').addClass('u-has-success-v1-1');
		$('#nickName').siblings('small').addClass('std-invisible');
		$('#nickCheck').addClass('std-invisible')
		$('#nickName').prop('readonly', true);
		// 아이디가 중복하지 않으면 idck = 1
		nickCheck = 1;
	    }
	},
	error : function(error) {
	    alert("error : " + error);
	}
    });
});