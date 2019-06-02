var emailNo,
emailInit = true,
nickName,
emailCountDownFunction,
email
;

//js와 css 의 초기화 작업이다.
$(document).on('ready', function () {

  //네이버 로그인 초기화
  var naverLogin = new naver.LoginWithNaverId(
          {
            clientId: "SfQg5WbbEwfRelyDmqBo",
            callbackUrl: "http://localhost:8080/studyboot/html/auth/naverregistercallback.html",
            isPopup: true, /* 팝업을 통한 연동처리 여부 */
            loginButton: {color: "green", type: 1, height: 30} /* 로그인 버튼의 타입을 지정 */
          }
  );

  /* 설정정보를 초기화하고 연동을 준비 */
  naverLogin.init();

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

//이메일 버튼을 눌렀을때, 중복확인, 카운트다운 실행, 인증번호 확인 한다.
$("#email-btn").click((e) => {


  //이메일 중복체크
  $.getJSON('/studyboot/app/json/member/emailcheck?email='+ $("#email").val(), function(obj) {
    if(obj.status == "success"){
      alert("해당 이메일이 이미 있습니다.");
    } else{

      //다시 요청하세요 지우기
      $('#emailNo').tooltip('disable');
      $('#emailNo').tooltip('hide');
      $("#emailNo").prop("readonly", false);

      clearInterval(emailCountDownFunction);
      emailCountDown();

      //발송됐다는 것을 알려주자!
      $("#email-btn").attr("data-toggle","tooltip");
      $("#email-btn").attr("data-trigger","hover focus");
      $("#email-btn").attr("data-placement","bottom");
      $("#email-btn").attr("title","발송되었습니다!");
      $('#email-btn').tooltip('enable');
      $('#email-btn').tooltip('show');

      $("#emailNo").removeClass("is-valid");
      $("#emailNo").val("");
      email = $("#email").val();

      $.getJSON('/studyboot/app/json/mail/send?email='+ $("#email").val(), function(obj) {
        emailNo = obj.id;

        //처음에만 한번 등록
        if(emailInit){

          //이메일 인증번호 확인!
          $( "#emailNo" ).change(function() {
            if($("#emailNo").val() == emailNo){
              $("#emailNo").removeClass("is-invalid");
              $("#emailNo").addClass("is-valid");
              $('#email-btn').tooltip('disable');
              $('#email-btn').tooltip('hide');
              $("#emailNo").prop("readonly", true);
              $("#email-btn").prop("disabled", true);
              clearInterval(emailCountDownFunction);
            } else{
              email = undefined;
              $("#emailNo").removeClass("is-valid");
              $("#emailNo").addClass("is-invalid");
            }
          });
        }
        emailInit = false;

      });
    }
  });


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



//닉네임 체크
$( "#nickName" ).keyup(function(){

  if(nickCheck($("#nickName").val()) == true){
    $( "#nickCheck-btn").prop("disabled",false);
    $('#nickName').tooltip('disable');
    $('#nickName').tooltip('hide');
  } else{
    $("#nickName").attr("data-toggle","tooltip");
    $("#nickName").attr("data-trigger","hover focus");
    $("#nickName").attr("data-placement","bottom");
    $("#nickName").attr("title","4~10자의 한글, 영문, 숫자만 사용할 수 있습니다");

    $('#nickName').tooltip('enable');
    $('#nickName').tooltip('show');
    $( "#nickCheck-btn").prop("disabled",true);
  }

});


//닉네임 중복체크
$("#nickCheck-btn").click(function() {


  $.ajax({
    async: true,
    type : 'POST',
    data : $("#nickName").val(),
    url : "/studyboot/app/json/member/nickcheck",
    dataType : "json",
    contentType: "application/json; charset=UTF-8",
    success : function(data) {
      if (data.cnt > 0) {
        alert("닉네임이 존재합니다. 다른 닉네임을 입력해주세요.");
        nickChecked = 0;
      } else {
        alert("사용가능한 닉네임입니다.");
        $( "#nickCheck-btn").prop("disabled",true);
        nickName = $("#nickName").val();
      }
    },
    error : function(error) {
      alert("error : " + error);
    }
  });
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
  if(equalPassword($( "#passwordConfirm" ).val(), $( "#password" ).val()) == true){
    $('#passwordConfirm').tooltip('disable');
    $('#passwordConfirm').tooltip('hide');
  } else{
    $("#passwordConfirm").attr("data-toggle","tooltip");
    $("#passwordConfirm").attr("data-trigger","hover focus");
    $("#passwordConfirm").attr("data-placement","bottom");
    $("#passwordConfirm").attr("title","비밀번호가 일치하지 않습니다");
    $('#passwordConfirm').tooltip('enable');
    $('#passwordConfirm').tooltip('show');
  }
});




//입력시 이름 체크
$( "#name" ).keyup(function(){
  if(checkName($( "#name" ).val()) == true){
    $('#name').tooltip('disable');
    $('#name').tooltip('hide');
  } else{
    $("#name").attr("data-toggle","tooltip");
    $("#name").attr("data-trigger","hover focus");
    $("#name").attr("data-placement","bottom");
    $("#name").attr("title","이름 양식에 맞게 적어주세요");
    $('#name').tooltip('enable');
    $('#name').tooltip('show');
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
    return false;
  }
  if(/(\w)\1\1\1/.test(password)){
    return false;
  }
  return true;
}


//이메일 체크
function checkEmail(email){
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email == '' || !re.test(email)) {
    return false;
  }
  return true;
}


function checkName(name){
  var re = /^[가-힣]{2,4}$/;
  if (name == '' || !re.test(name)) {
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

      $('#email-btn').tooltip('disable');
      $('#email-btn').tooltip('hide');

      $('#emailNo').tooltip('enable');
      $('#emailNo').tooltip('show');
      emailNo = null;
      clearInterval(emailCountDownFunction);
    }
  }, 1000);

}


//제출클릭시 최종 체크
$("#submit-btn").click(function() {

  if(email == undefined ||
          email != $("#email").val()||
          $("#email").val() == null ||
          !$( "#emailNo" ).hasClass( "is-valid" )){
    alert("이메일을 인증해주세요!");
    return;
  }
  if(checkName($( "#name" ).val()) == false){
    alert("이름을 양식에 맞게 입력해주세요!");
    return;
  }
  if(nickCheck($("#nickName").val()) == false){
    alert("닉네임을 양식에 맞게 입력해주세요!");
    return;
  } 
  if(nickName == undefined ||
          nickName != $("#nickName").val()||
          $("#nickName").val() == null){
    alert("닉네임을 중복체크해주세요!");
    return;
  }
  if(checkPassword($( "#password" ).val()) == false){
    alert("비밀번호를 양식에 맞게 입력해주세요!");
    return;
  }
  if(equalPassword($( "#passwordConfirm" ).val(), $( "#password" ).val()) == false){
    alert("비밀번호가 일치하지 않습니다!");
    return;
  }
  if(!$("#agree-btn").prop('checked')){
    alert("이용 약관에 동의해주세요!");
    return;
  }

  $.ajax({
    url: '/studyboot/app/json/auth/register',
    type: 'post',
    dataType: 'text',
    data: {
      email: email,
      name: $( "#name" ).val(),
      nickName: $("#nickName").val(),
      password: $( "#password" ).val()
    },

    success: function(data) {
      var data = JSON.parse(data);
      if (data.status == "success") {
        $.ajax({
          url: '/studyboot/app/json/auth/login',
          type: 'post',
          dataType: 'text',
          data: {
            email: email,
            password: $( "#password" ).val()
          },
          success: function(data) {
            location.href = "/studyboot;";
          }
        });
      } else {
        alert("등록에 실패했습니다");
      }
    }


  });

});


/** 
////핸드폰인증 버튼을 눌렀을때 api 인증 한다.
$("#phone-btn").click((e) => {

//다시 요청하세요 지우기
$('#phoneNo').tooltip('disable');
$('#phoneNo').tooltip('hide');

$("#phoneNo").prop("readonly", false);


clearInterval(phoneCountDownFunction);
phoneCountDown();

$.getJSON('/studyboot/app/json/sms/send?no=' + $("#phone").val(), function(obj) {

phoneNo = obj.id;
});

//발송됐다는 것을 알려주자!
$("#phone-btn").attr("data-toggle","tooltip");
$("#phone-btn").attr("data-trigger","hover focus");
$("#phone-btn").attr("data-placement","bottom");
$("#phone-btn").attr("title","발송되었습니다!");
$('#phone-btn').tooltip('enable');
$('#phone-btn').tooltip('show');



//처음에만 한번 등록
if(phoneInit){
$( "#phoneNo" ).change(function() {
  if($("#phoneNo").val() == phoneNo){
    $("#phoneNo").removeClass("is-invalid");
    $("#phoneNo").addClass("is-valid");
    $('#phone-btn').tooltip('disable');
    $('#phone-btn').tooltip('hide');
    $("#phoneNo").prop("readonly", true);
    $("#phone-btn").prop("disabled", true);
    clearInterval(phoneCountDownFunction);
  } else{
    $("#phoneNo").removeClass("is-valid");
    $("#phoneNo").addClass("is-invalid");
  }
});
}
phoneInit = false;
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

function checkPhone(phone){
var re = /^\d{3}-\d{3,4}-\d{4}$/;
if (phone == '' || !re.test(phone)) {
return false;
}
return true;
}

function phoneCountDown(){
var future = new Date();
//future.setMinutes(future.getMinutes()+3);
future.setSeconds(future.getSeconds()+15);
var countDownDate = future.getTime();
// Update the count down every 1 second

phoneCountDownFunction = setInterval(function() {
// Get today's date and time
var now = new Date().getTime();
// Find the distance between now and the count down date
var distance = countDownDate - now;
// Time calculations for days, hours, minutes and seconds
var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((distance % (1000 * 60)) / 1000);
if(seconds < 10){
  $("#phoneNo").attr("placeholder", "0" +minutes + " : " + "0" + seconds);
} else{
  $("#phoneNo").attr("placeholder", "0" +minutes + " : " + seconds);
}

if (distance < 0) {
  $("#phoneNo").attr("placeholder", "시간초과!");

  $('#phone-btn').tooltip('disable');
  $('#phone-btn').tooltip('hide');

  $('#phoneNo').tooltip('enable');
  $('#phoneNo').tooltip('show');

  phoneNo = null;
  clearInterval(phoneCountDownFunction);
}
}, 1000);

}

입력시 생년월일 체크
$( "#birth" ).keyup(function(){
if(checkBirth($( "#birth" ).val()) == true){
$('#birth').tooltip('disable');
$('#birth').tooltip('hide');
} else{
$("#birth").attr("data-toggle","tooltip");
$("#birth").attr("data-trigger","hover focus");
$("#birth").attr("data-placement","bottom");
$("#birth").attr("title","생년월일 양식에 맞게 적어주세요");
$('#birth').tooltip('enable');
$('#birth').tooltip('show');
}
});
function checkBirth(birth){
var re = /^(\d+)[/|\-|\s]+[0|1](\d)[/|\-|\s]+([0|1|2|3]\d)$/;
if (birth == '' || !re.test(birth)) {
return false;
}
return true;
}
 **/




