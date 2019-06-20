var user,
nickCheck,
telCheck,
clsCheck,
addrCheck,
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
                    clsCheck = 1;
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
                    addrCheck = 1;
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
    
    window.user = data;
    console.log(user);
    
    $('#profilePhoto').attr('src', '/studyboot/upload/images/member/thumbnail.' + user.photo + '.jpg');
    $('#inqryName').html(user.name);
    $('#inqryNo').val(user.no);
    
    $('#userName').val(user.name);
    $('#birthday').val(user.birth);
    $('#nickName').val(user.nickName);
    
    $(clsGenerator(user)).appendTo('#myClsList');
    
    if (user.addressName != null) {
      $('#myAddrList').append(
          '<a class="ui label transition visible" data-no="' + user.address
          + '" style="display: inline-block !important;">'+ user.addressName +'<i class="delete icon"></i></a>');
    }
    
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
                  $('#nickName').closest('div').addClass('u-has-error-v1');
                  $('#nickName').focus();
                  nickCheck = 0;
                  
              } else {
                  alert("사용가능한 아이디입니다.");
                  $('#nickCheck-btn').prop('disabled', true);
                  $('#nickName').closest('div').removeClass('u-has-error-v1');
                  $('#nickName').closest('div').addClass('u-has-success-v1-1');
                  nickCheck = 1;
              }
          },
          error : function(error) {
              alert("error : " + error);
          }
      });
  });
});
  

// 개인정보 변경시 아이콘 클릭 이벤트
// nickName
$('#sb-nickname-edit').click(() => {
  initNickCheck();
  $('#nickName').prop('readonly', false);
  $('#nickName').removeClass('form-control-plaintext');
  $('#nickName').removeClass('g-bg-white');
  $('#nickName').addClass('form-control');
  $('#nickCheck-btn').removeClass('std-invisible');
  $('#sb-nickname-edit').addClass('std-invisible');
  $('#sb-nickname-cancel').removeClass('std-invisible');
});

$('#sb-nickname-cancel').click(() => {
  $('#nickName').unbind();
  $('#nickName').val(user.nickName);
  
  $('#nickName').closest('div').removeClass('u-has-error-v1');
  $('#nickName').closest('div').removeClass('u-has-success-v1-1');
  $('#nickName').prop('readonly', true);
  $('#nickName').removeClass('form-control');
  $('#nickName').addClass('g-bg-white');
  $('#nickName').addClass('form-control-plaintext');
  $('#nickCheck-btn').addClass('std-invisible');
  $('#sb-nickname-cancel').addClass('std-invisible');
  $('#sb-nickname-edit').removeClass('std-invisible');
  nickCheck = undefined;
});

// cls
$('#sb-cls-edit').click(() => {
  $('#myClsList a .delete.icon').click(function() {
    clsCheck = 1;
    $(this).parent().remove();
  });
  
  $('#clsDrop div .ui.dropdown').removeClass('invisible');
  $('#sb-cls-edit').addClass('std-invisible');
  $('#sb-cls-cancel').removeClass('std-invisible');
});

$('#sb-cls-cancel').click(() => {
  $('#myClsList a').remove();
  $(clsGenerator(user)).appendTo('#myClsList');
  
  loadModalCategory();
  
  $('#clsDrop div .ui.dropdown').addClass('invisible');
  $('#sb-cls-cancel').addClass('std-invisible');
  $('#sb-cls-edit').removeClass('std-invisible');
  clsCheck = undefined;
});

// addr
$('#sb-addr-edit').click(() => {
  $('#myAddrList a .delete.icon').click(function() {
    addrCheck = 1;
    $(this).parent().remove();
  });
  
  $('#addrDrop div .ui.dropdown').removeClass('invisible');
  $('#sb-addr-edit').addClass('std-invisible');
  $('#sb-addr-cancel').removeClass('std-invisible');
});

$('#sb-addr-cancel').click(() => {
  $('#myAddrList a').remove();
  if (user.addressName != null) {
    $('#myAddrList').append(
        '<a class="ui label transition visible" data-no="' + user.address
        + '" style="display: inline-block !important;">'+ user.addressName +'<i class="delete icon"></i></a>');
  }
  
  loadModalAddress();
  
  $('#addrDrop div .ui.dropdown').addClass('invisible');
  $('#sb-addr-cancel').addClass('std-invisible');
  $('#sb-addr-edit').removeClass('std-invisible');
  addrCheck = undefined;
});


// 닉네임 체크
function initNickCheck() {
  
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
      $('#nickName').attr('title','3~10자의 한글, 영문, 숫자만 사용할 수 있습니다');
      
      $('#nickName').tooltip('enable');
      $('#nickName').tooltip('show');
      $('#nickCheck-btn').prop('disabled',true);
      $('#nickName').closest('div').removeClass('u-has-success-v1-1');
      $('#nickName').closest('div').addClass('u-has-error-v1');
    }
  });
}


// 정보 업데이트 이벤트
$('#sb-info-change').click((e) => {
  e.preventDefault();
  
  if (nickCheck == undefined 
      && clsCheck == undefined && addrCheck == undefined) {
    alert('변경 사항이 없습니다!');
    return false;
  } else if (nickCheck == 0){
    alert('변경할 수 없습니다..\n 수정 사항을 확인하세요!');
    return false;
  } else {
    
    var clsList = new Array();
    $('#myClsList a').each(function() {
      clsList.push($(this).attr('data-no'));
    });
    
    var address = $('#myAddrList a').attr('data-no');
    
    $.ajax({
      url:'../../app/json/member/update',
      type: 'post',
      dataType: 'text',
      data: "nickName=" + encodeURIComponent($("#nickName").val()) +
      "&cls=" + encodeURIComponent(clsList) +
      "&address=" + encodeURIComponent(address),
      contentType: "application/x-www-form-urlencoded",
      success: function() {
        alert("정보 변경 성공!");
        location.href = 'index.html';
      },
      error: function() {
        alert("정보 변경을 실패 했습니다!");
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
          var newPwd = $('#newPassword').val();
          var verifyPwd = $('#verifyPassword').val();
          
          savePassword(newPwd, verifyPwd);
          
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

function savePassword(newPwd, verifyPwd) {
  
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
      type : 'POST',
      dataType: 'text',
      data: {
        password: newPwd
      },
      success: function() {
        alert("비밀번호 변경 성공!")
        location.href = 'index.html';
      },
      error: function() {
        alert("변경 실패!!!")
      }
    });
  }
}

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







