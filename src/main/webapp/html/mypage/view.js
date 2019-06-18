var userData,
nickCheck,
telCheck,
clsCheck,
pwdCheck = 0,
clsTemplateSrc = $('#cls-template').html(),
clsGenerator = Handlebars.compile(clsTemplateSrc);


//페이지가 준비되면 평점 정보, 이미지세팅 모달창을 꽂아준다.
$( document ).ready(function() {
  $("#sb-history").load("rateInfo.html");
  $("#sb-imagesetting").load("imagesetting.html");
});


// 카테고리 분류 로딩 함수
function loadModalCategory() {

  $.getJSON('../../app/json/study/category?clsNo=',
          function(obj) {


    for(var e of obj.list){
      e.value = e.clsNo;
    }

    //분류 드롭다운
    $('.ui.dropdown.lcls')
    .dropdown({
      placeholder: '관심분야(대)',
      on: 'hover',
      values: obj.list,
      onChange: function(value, text, $selectedItem) {

        $('.ui.dropdown.mcls')
        .dropdown({
          placeholder: '관심분야(중)',
          on: 'hover',
          values: [
            ]
        })
        ;

        $('.ui.dropdown.scls')
        .dropdown({
          placeholder: '관심분야(소)',
          on: 'hover',
          values: [
            ]
        })
        ;

        if(value.length != 2){
          return;
        }
        $.getJSON('../../app/json/study/category?clsNo=' + value,
                function(objm) {
          for(var e of objm.list){
            e.value = e.clsNo;
          }
          $('.ui.dropdown.mcls')
          .dropdown({
            placeholder: '관심분야(중)',
            on: 'hover',
            values: objm.list,
            onChange: function(value, text, $selectedItem) {
              if(value.length != 4){
                return;
              }
              $.getJSON('../../app/json/study/category?clsNo=' + value,
                      function(objs) {
                for(var e of objs.list){
                  e.value = e.clsNo;
                }
                $('.ui.dropdown.scls')
                .dropdown({
                  placeholder: '관심분야(소)',
                  on: 'hover',
                  values: objs.list,
                  onChange: function(value, text) {
                    
                    if (text == undefined) {
                      return false;
                    }
                    if ($('#myClsList a').length > 2) {
                      alert('갯수 초과!!');
                      return false;
                    }
                    
                    $('#myClsList').append(
                        '<a class="ui label transition visible" data-no="' + value
                        + '" style="display: inline-block !important;">'+text+'<i class="delete icon"></i></a>');
                    
                    $('#myClsList a .delete.icon').click(function() {
                      $(this).parent().remove();
                    });
                  }
                });

              });
            }
          });
        });
      }
    });
  });
};

// 지역 분류 로딩 함수
function loadModalAddress() {

  $.getJSON('../../app/json/study/addresscategory?addressNo=',
          function(obj) {
    
    var laddrName,
        maddrName;

    for(var e of obj.list){
      e.value = e.addressNo;
    }

    //분류 드롭다운
    $('.ui.dropdown.laddr')
    .dropdown({
      placeholder: '활동지역(대)',
      on: 'hover',
      values: obj.list,
      onChange: function(value, text, $selectedItem) {

        laddrName = text; // 활동지역(대) 이름
        
        $('.ui.dropdown.maddr')
        .dropdown({
          placeholder: '활동지역(중)',
          on: 'hover',
          values: [
            ]
        })
        ;

        $('.ui.dropdown.saddr')
        .dropdown({
          placeholder: '활동지역(소)',
          on: 'hover',
          values: [
            ]
        })
        ;

        if(value.length != 2){
          return;
        }

        $.getJSON('../../app/json/study/addresscategory?addressNo=' + value,
                function(objm) {
          for(var e of objm.list){
            e.value = e.addressNo;
          }
          $('.ui.dropdown.maddr')
          .dropdown({
            placeholder: '활동지역(중)',
            on: 'hover',
            values: objm.list,
            onChange: function(value, text, $selectedItem) {
              
              maddrName = text; // 활동지역(중) 이름
              
              if(value.length != 4){
                return;
              }
              $.getJSON('../../app/json/study/addresscategory?addressNo=' + value,
                      function(objs) {
                for(var e of objs.list){
                  e.value = e.addressNo;
                }
                $('.ui.dropdown.saddr')
                .dropdown({
                  placeholder: '활동지역(소)',
                  on: 'hover',
                  values: objs.list,
                  onChange: function(value, text, $selectedItem) {
                    
                    if (text == undefined) {
                      return false;
                    }
                    if ($('#myAddrList a').length > 0) {
                      alert('갯수 초과!!');
                      return false;
                    }
                  
                    $('#myAddrList').append(
                        '<a class="ui label transition visible" data-no="' + value
                        + '" style="display: inline-block !important;">'
                        + laddrName + ' ' + maddrName + ' ' + text +'<i class="delete icon"></i></a>');
                    
                    $('#myAddrList a .delete.icon').click(function() {
                      $(this).parent().remove();
                    });
                  }
                });

              });
            }
          });
        });
      }
    });
  });
};

// JSON 형식의 데이터 가져오기
function loadData() {
  $.getJSON('../../app/json/member/detail',
      function(data) {
    
    userData = data;
    console.log(userData);
    
    $('#profilePhoto').attr('src', '/studyboot/upload/images/member/thumbnail.' + userData.photo + '.jpg');
    $('#inqryName').html(userData.name);
    $('#inqryNo').val(userData.no);
    
    $('#userName').val(userData.name);
    $('#nickName').val(userData.nickName);
    $('#email').val(userData.email);
    $('#tel').val(userData.tel);
    
    $(clsGenerator(userData)).appendTo('#myClsList');
    
    $('#myAddrList').append(
        '<a class="ui label transition visible" data-no="' + userData.address
        + '" style="display: inline-block !important;">'+ userData.addressName +'<i class="delete icon"></i></a>');
    
    $(document.body).trigger('loaded-data');
  });
};

// 데이터 불러오기 실행
loadModalCategory();
loadModalAddress();
loadData();

// 닉네임 체크
function nickNameCheck() {
  var str = $("#nickName").val();
  if (str.length < 3 || str.length > 10) {
    return false;
  }
  var chk = /[0-9]|[a-z]|[A-Z]|[가-힣]/;

  for (var i = 0; i <= str.length -1 ; i++ ) {
    if (chk.test(str.charAt(i))) {
    } else {
      return false;
    }
  }
  return true;
}

$(document.body).bind('loaded-data', () => {
  
  $('#myClsList a .delete.icon').click(function() {
    $(this).parent().remove();
  });
  
  $('#myAddrList a .delete.icon').click(function() {
    $(this).parent().remove();
  });
  
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

// 개인정보 변경시 아이콘 클릭 이벤트
// nickName
$('#sb-nickname-edit').click(() => {
  $('#nickName').prop('readonly', false);
  $('#sb-nickname-edit').addClass('std-invisible');
  $('#sb-nickname-cancel').removeClass('std-invisible');
});

$('#sb-nickname-cancel').click(() => {
  $('#nickName').val(userData.nickName);
  
  $('#nickName').closest('div').removeClass('u-has-error-v1');
  $('#nickName').closest('div').removeClass('u-has-success-v1-1');
  $('#nickName').prop('readonly', true);
  $('#sb-nickname-cancel').addClass('std-invisible');
  $('#sb-nickname-edit').removeClass('std-invisible');
  nickCheck = undefined;
});


// tel
$('#sb-tel-edit').click(() => {
  $('#tel').prop('readonly', false);
  $('#sb-tel-edit').addClass('std-invisible');
  $('#sb-tel-cancel').removeClass('std-invisible');
});

$('#sb-tel-cancel').click(() => {
  $('#tel').val(userData.tel);
  
  $('#tel').closest('div').removeClass('u-has-success-v1-1');
  $('#tel').closest('div').removeClass('u-has-error-v1');
  $('#tel').prop('readonly', true);
  $('#sb-tel-cancel').addClass('std-invisible');
  $('#sb-tel-edit').removeClass('std-invisible');
  telCheck = undefined;
});

// cls
$('#sb-cls-edit').click(() => {
  $('#myClsList .ui.dropdown').removeClass('disabled');
  $('#sb-cls-edit').addClass('std-invisible');
  $('#sb-cls-cancel').removeClass('std-invisible');
});

$('#sb-cls-cancel').click(() => {
  $('#myClsList a').remove();
  $(clsGenerator(userData)).appendTo('#myClsList');
  
  $('#myClsList a .delete.icon').click(function() {
    $(this).parent().remove();
  });
  loadModalCategory();
  
  $('#myClsList .ui.dropdown').addClass('disabled');
  $('#sb-cls-cancel').addClass('std-invisible');
  $('#sb-cls-edit').removeClass('std-invisible');
  telCheck = undefined;
});

// addr
$('#sb-addr-edit').click(() => {
  $('#myAddrList .ui.dropdown').removeClass('disabled');
  $('#sb-addr-edit').addClass('std-invisible');
  $('#sb-addr-cancel').removeClass('std-invisible');
});

$('#sb-addr-cancel').click(() => {
  $('#myAddrList a').remove();
  $('#myAddrList').append(
      '<a class="ui label transition visible" data-no="' + userData.address
      + '" style="display: inline-block !important;">'+ userData.addressName +'<i class="delete icon"></i></a>');
  
  $('#myAddrList a .delete.icon').click(function() {
    $(this).parent().remove();
  });
  loadModalAddress();
  
  $('#myAddrList .ui.dropdown').addClass('disabled');
  $('#sb-addr-cancel').addClass('std-invisible');
  $('#sb-addr-edit').removeClass('std-invisible');
  telCheck = undefined;
});


// 닉네임 체크
$( '#nickName' ).keyup(function(){
  
  if(nickNameCheck() == true){
    $('#nickCheck-btn').prop('disabled',false);
    $('#nickName').tooltip('disable');
    $('#nickName').tooltip('hide');
    $('#nickName').closest('div').removeClass('u-has-error-v1');
    $('#nickName').closest('div').addClass('u-has-success-v1-1');
  } else{
    
    $('#nickName').attr('data-toggle','tooltip');
    $('#nickName').attr('data-trigger','hover focus');
    $('#nickName').attr('data-placement','bottom');
    $('#nickName').attr('title','4~10자의 한글, 영문, 숫자만 사용할 수 있습니다');
    
    $('#nickName').tooltip('enable');
    $('#nickName').tooltip('show');
    $('#nickCheck-btn').prop('disabled',true);
    $('#nickName').closest('div').removeClass('u-has-success-v1-1');
    $('#nickName').closest('div').addClass('u-has-error-v1');
  }
});

// 전화번호 체크
$('#tel').keyup(function() {
  
  var telRule = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
  
  if(telRule.test($("input[id='tel']").val())) {
    
    $('#tel').closest('div').removeClass('u-has-error-v1');
    $('#tel').closest('div').addClass('u-has-success-v1-1');
    telCheck = 1;
    
  } else {
    $('#tel').attr('data-toggle','tooltip');
    $('#tel').attr('data-trigger','hover focus');
    $('#tel').attr('data-placement','bottom');
    $('#tel').attr('title','010-xxxx-xxxx');
    
    $('#tel').tooltip('enable');
    $('#tel').tooltip('show');
    $('#tel').closest('div').removeClass('u-has-success-v1-1');
    $('#tel').closest('div').addClass('u-has-error-v1');
    telCheck = 0;
  }
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
    
    var clsList = new Array();
    
    $('#myClsList a').each(function() {
      clsList.push($(this).attr('data-no'));
    });
    alert(clsList);
    
    $.ajax({
      url:'../../app/json/member/update',
      type: 'post',
      dataType: 'text',
      data: {
        nickName: $(nickName).val(),
        tel: $(tel).val(),
        //cls: clsList
      },
      success: function() {
        alert("정보 변경 성공!")
        location.href = 'index.html';
      }
    });
  }
  
});

// 정보 업데이트 취소 이벤트
$('#sb-info-cancel').click((e) => {
  e.preventDefault();
  location.href = 'index.html';
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
    $('#newPassword').attr('title','숫자,영문자,특수문자 조합으로\n중복문자 4개 이하\n6자리 이상 사용해야 합니다');
    
    $('#newPassword').tooltip('enable');
    $('#newPassword').tooltip('show');
    $('#newPassword').closest('div').removeClass('u-has-success-v1-1');
    $('#newPassword').closest('div').addClass('u-has-error-v1');
  }
  
  if ($('#verifyPassword').val().length != 0) {
    
    if (checkPassword(password) && password == $('#verifyPassword').val()) {
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
  }
  
});

// 비밀번호 재확인
$("#verifyPassword").keyup(function(){
  
  var password = $("#newPassword").val();
  
  if (password.length == 0 || password == undefined) {
    alert('먼저 새로운 비밀번호를 입력하세요!!')
    $('#verifyPassword').val('')
    $('#verifyPassword').closest('div').removeClass('u-has-error-v1');
    $('#verifyPassword').closest('div').removeClass('u-has-success-v1-1');
    $('#newPassword').focus();
    return false;
  }
  
  if (checkPassword(password) && password == $('#verifyPassword').val()) {
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

// 비밀번호 업데이트 이벤트
$('#sb-password-change').click((e) => {
  e.preventDefault();
  
  var password = $("#password").val();
  
  // 비밀번호 확인
  if (password.length == 0 || password == undefined) {
    alert('비밀번호를 입력하세요!!!');
    $("#password").focus();
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
          
          pwdCheck = 1;
          $(document.body).trigger('checked-password');
          
        } else{
          alert('비밀번호가 틀렸습니다!!');
          $('#password').focus();
          
          pwdCheck = 0;
        }
      },
      error : function(error) {
          alert("error : " + error);
      }
  });
});

$(document.body).bind('checked-password', () => {
  
  var newPwd = $('#newPassword').val();
  var verifyPwd = $('#verifyPassword').val();
  
  if (newPwd.length == 0 || verifyPwd.length == 0) {
    alert('변경할 비밀번호를 입력하세요!!');
    return false;
  }
  
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
        alert("비밀번호 변경 성공!")
        location.href = 'index.html';
      }
    });
  }
});

// 정보 업데이트 취소 이벤트
$('#sb-password-cancel').click((e) => {
  e.preventDefault();
  location.href = 'index.html';
});



//inquiry
$('#inqryForm-btn').click((e) => {
  e.preventDefault();
  $('.sspctForm-Format').addClass('std-invisible');
  $('#formTitle').html($('#inqryName').html() +"님  문의"+ " 내용을 적어주세요");
  $('#sspctName').val("");
  $('#sspctNo').val(0);
  $('#inqryClsNo').val(1);
});

$('#inqryModal').on('hidden.bs.modal', () => {
  $('#inqryContents').val('');
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
      alert('문의 글 등록 성공!!');
      $('#inqryModal').modal('hide');
    }
  });
});







