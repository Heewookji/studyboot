var param = location.href.split('?')[1],
no,
user,
nickCheck,
telCheck,
pwdCheck = 0;


$(document.body).bind('loaded-data', () => {
  // 닉네임 중복체크
  $(function() {
    // nickCheck 버튼을 클릭했을 때
    $("#nickCheck-btn").click(function() {
        
        // nickName 을 param으로 보내기 위한 변수
        var nickName =  $("#nickName").val();
        
        $.ajax({
            async: true,
            type : 'POST',
            data : nickName,
            url : "../../app/json/member/nickcheck",
            dataType : "json",
            contentType: "application/json; charset=UTF-8",
            success : function(data) {
                if (data.cnt > 0) {
                    
                    alert("아이디가 존재합니다. 다른 아이디를 입력해주세요.");
                    // 아이디가 존재할 경우 빨강으로 , 아니면 파랑으로 처리하는 디자인
                    $('#nickName').closest('div').addClass('u-has-error-v1');
                    $('#nickName').focus();
                    nickCheck = 0;
                    
                } else {
                    alert("사용가능한 아이디입니다.");
                    // 아이디가 존제할 경우 빨깡으로 , 아니면 파랑으로 처리하는 디자인
                    $('#nickName').closest('div').removeClass('u-has-error-v1');
                    $('#nickName').closest('div').addClass('u-has-success-v1-1');
                    $('#nickCheck-btn').addClass('std-invisible')
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
  });
});

// JSON 형식의 데이터 가져오기
function loadData() {
  $.getJSON('../../app/json/member/detail',
      function(data) {
    
    user = data;
    console.log(data);
    $('#userName').val(user.name);
    $('#nickName').val(user.nickName);
    $('#email').val(user.email);
    $('#tel').val(user.tel);
// $('#cls').val(data.cls);
// $('#sdt').val(data.startDate);
// $('#edt').val(data.endDate);
// $('#prsn').val(data.personnel);
// $('#rate').val(data.rate);
// $('#age').val(data.memberAge);
// $('#attendance').val(data.attendance);
// $('#endrate').val(data.endrate);
    
    $(document.body).trigger('loaded-data');
  });
};

loadData();

// inquiry
$('#inqryForm-btn').click((e) => {
  e.preventDefault();
  $('.sspctForm-Format').addClass('std-invisible');
  $('#inqryName').html(user.name);
  $('#formTitle').html($('#inqryName').html() +"님  문의"+ " 내용을 적어주세요");
  $('#sspctName').val("");
  $('#inqryNo').val(user.no);
  $('#sspctNo').val(0);
  $('#inqryClsNo').val(1);
});

// inquiry add
$('#inqryAdd-btn').click((e) => {
  $.ajax({
    url:'../../app/json/inquiry/add',
    type: 'post',
    dataType: 'text',
    data: {
      clsNo: $(inqryClsNo).val(),
      contents:$(inqryContents).val(),
      inquiryPersonNo: $(inqryNo).val(),
      suspectPersonNo: $(sspctNo).val()
    },
    success: function(data){
      var obj = JSON.parse(data);
      location.reload();
    }
  });
});

// 닉네임 체크
function nickNameCheck() {
  var str = $("#nickName").val();
  if(str.length < 4 || str.length > 10) {
    return false;
  }
  var chk = /[0-9]|[a-z]|[A-Z]|[가-힣]/;

  for(var i = 0; i <= str.length -1 ; i++ ) {
    if(chk.test(str.charAt(i))) {
    } else {
      return false;
    }
  }
  return true;
}

$(document).ready(() => {
  
  // nickName
  $('#sb-nickname-edit').click(() => {
    $('#nickName').prop('readonly', false);
    $('#nickCheck-btn').removeClass('std-invisible');
    $('#sb-nickname-edit').addClass('std-invisible');
    $('#sb-nickname-cancel').removeClass('std-invisible');
  });
  
  $('#sb-nickname-cancel').click(() => {
    $('#nickName').val(user.nickName);
  
    $('#nickName').closest('div').removeClass('u-has-error-v1');
    $('#nickName').closest('div').removeClass('u-has-success-v1-1');
    $('#nickName').prop('readonly', true);
    $('#nickCheck-btn').addClass('std-invisible');
    $('#sb-nickname-cancel').addClass('std-invisible');
    $('#sb-nickname-edit').removeClass('std-invisible');
    nickCheck = undefined;
  });
  
  // 닉네임 체크
  $( '#nickName' ).keyup(function(){
    var init;

    if(nickNameCheck() == true){
      $('#nickCheck-btn').prop('disabled',false);
      $('#nickName').tooltip('disable');
      $('#nickName').tooltip('hide');
    } else{
      if(init != 1){
        $('#nickName').attr('data-toggle','tooltip');
        $('#nickName').attr('data-trigger','hover focus');
        $('#nickName').attr('data-placement','bottom');
        $('#nickName').attr('title','4~10자의 한글, 영문, 숫자만 사용할 수 있습니다');
      }
      $('#nickName').tooltip('enable');
      $('#nickName').tooltip('show');
      $('#nickCheck-btn').prop('disabled',true);
    }
  });

  // tel
  $('#sb-tel-edit').click(() => {
    $('#tel').prop('readonly', false);
    $('#sb-tel-edit').addClass('std-invisible');
    $('#sb-tel-cancel').removeClass('std-invisible');
  });
  
  $('#sb-tel-cancel').click(() => {
    $('#tel').val(user.tel);
  
    $('#tel').closest('div').removeClass('u-has-success-v1-1');
    $('#tel').prop('readonly', true);
    $('#sb-tel-cancel').addClass('std-invisible');
    $('#sb-tel-edit').removeClass('std-invisible');
    telCheck = undefined;
  });
  
  // change
  $('#tel').change(function() {
    
    var telRule = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    
    if(!telRule.test($("input[id='tel']").val())) {
      // 경고
      telCheck = 0;
      $('#tel').closest('div').addClass('u-has-error-v1');
      return false;
      
    } else {
      telCheck = 1;
      $('#tel').closest('div').removeClass('u-has-error-v1');
      $('#tel').closest('div').addClass('u-has-success-v1-1');
      $('#tel').prop('readonly', true);
    }
  });
  
});

// 정보 업데이트 이벤트
$('#sb-info-change').click((e) => {
  e.preventDefault();
  
  if (nickCheck == undefined && telCheck == undefined) {
    alert('변경 사항이 없습니다!');
    return false;
  } else if (nickCheck == 0 || telCheck == 0){
    alert('변경할 수 없습니다..\n 수정 사항을 확인하세요!');
    return false;
  } else {
    
    $.ajax({
      url:'../../app/json/member/update',
      type: 'post',
      dataType: 'text',
      data: {
        nickName: $(nickName).val(),
        tel: $(tel).val()
      },
      success: function() {
        location.reload();
      }
    });
  }
  
});

// 정보 업데이트 취소 이벤트
$('#sb-info-cancel').click((e) => {
  e.preventDefault();
  location.href = 'index.html';
});


// 비밀번호 확인
$("#password").keyup(function() {
  
  var init;
  var password = $("#password").val();
  
  if (password.length == 0 || password == undefined) {
    $('#password').tooltip('disable');
    $('#password').tooltip('hide');
    $('#password').closest('div').removeClass('u-has-error-v1');
    $('#password').closest('div').removeClass('u-has-success-v1-1');
    $('#password').removeAttr('title');
    return false;
  }
  
  $.ajax({
      async: true,
      type : 'POST',
      data : password,
      url : "../../app/json/member/passwordcheck",
      dataType : "json",
      contentType: "application/json; charset=UTF-8",
      success : function(data) {
        
        if(data.result == true){
          $('#password').tooltip('disable');
          $('#password').tooltip('hide');
          $('#password').closest('div').removeClass('u-has-error-v1');
          $('#password').closest('div').addClass('u-has-success-v1-1');
          $('#password').removeAttr('title');
          pwdCheck = 1;
          
        } else{
          
          if(init != 1){
            $('#password').attr('data-toggle','tooltip');
            $('#password').attr('data-trigger','hover focus');
            $('#password').attr('data-placement','bottom');
            $('#password').attr('title','비밀번호가 틀렸습니다!');
          }
          $('#password').tooltip('enable');
          $('#password').tooltip('show');
          $('#password').closest('div').removeClass('u-has-success-v1-1');
          $('#password').closest('div').addClass('u-has-error-v1');
          pwdCheck = 0;
        }
      },
      error : function(error) {
          alert("error : " + error);
      }
  });
});

// 비밀번호 유효성 검사
$("#newPassword").keyup(function(){
  
  var password = $("#newPassword").val();
  
  if (password.length == 0 || password == undefined) {
    $('#newPassword').tooltip('disable');
    $('#newPassword').tooltip('hide');
    $('#newPassword').closest('div').removeClass('u-has-error-v1');
    $('#newPassword').closest('div').removeClass('u-has-success-v1-1');
    $('#newPassword').removeAttr('title');
    return false;
  }
  
  if(checkPassword(password)){
    $('#newPassword').tooltip('disable');
    $('#newPassword').tooltip('hide');
    $('#newPassword').closest('div').removeClass('u-has-error-v1');
    $('#newPassword').closest('div').addClass('u-has-success-v1-1');
    $('#newPassword').removeAttr('title');
    
  } else{
    
    $('#newPassword').attr('data-toggle','tooltip');
    $('#newPassword').attr('data-trigger','hover focus');
    $('#newPassword').attr('data-placement','bottom');
    $('#newPassword').attr('title','숫자+영문자+특수문자 조합으로 6자리 이상 사용해야 합니다.');
    
    $('#newPassword').tooltip('enable');
    $('#newPassword').tooltip('show');
    $('#newPassword').closest('div').removeClass('u-has-success-v1-1');
    $('#newPassword').closest('div').addClass('u-has-error-v1');
  }
  
});

// 비밀번호 재확인
$("#verifyPassword").keyup(function(){
  
  var password = $("#newPassword").val();
  
  if (password.length == 0 || password == undefined) {
    alert('먼저 새로운 비밀번호를 입력하세요!!')
    $('#verifyPassword').val('')
    $('#newPassword').focus();
    return false;
  }
  
  if (password == $('#verifyPassword').val()) {
    $('#verifyPassword').tooltip('disable');
    $('#verifyPassword').tooltip('hide');
    $('#verifyPassword').closest('div').removeClass('u-has-error-v1');
    $('#verifyPassword').closest('div').addClass('u-has-success-v1-1');
    $('#verifyPassword').removeAttr('title');
    
  } else{
    
    $('#verifyPassword').attr('data-toggle','tooltip');
    $('#verifyPassword').attr('data-trigger','hover focus');
    $('#verifyPassword').attr('data-placement','bottom');
    $('#verifyPassword').attr('title','비밀번호를 다시 확인하세요!!');
    
    $('#verifyPassword').tooltip('enable');
    $('#verifyPassword').tooltip('show');
    $('#verifyPassword').closest('div').removeClass('u-has-success-v1-1');
    $('#verifyPassword').closest('div').addClass('u-has-error-v1');
  }
});

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

// 암호 업데이트 이벤트
$('#sb-password-change').click((e) => {
  e.preventDefault();
  
  newPwd = $('#newPassword').val();
  verifyPwd = $('#verifyPassword').val();
  
  if (newPwd != verifyPwd || pwdCheck == 0) {
    alert('변경할 수 없습니다..\n 비밀번호를 확인하세요!');
    return false;
  } else {
    
    $.ajax({
      url:'../../app/json/member/update',
      type: 'post',
      dataType: 'text',
      data: {
        password: newPwd
      },
      success: function() {
        location.reload();
      }
    });
  }
  
});

// 정보 업데이트 취소 이벤트
$('#sb-password-cancel').click((e) => {
  e.preventDefault();
  location.href = 'index.html';
});



