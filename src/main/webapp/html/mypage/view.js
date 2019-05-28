var param = location.href.split('?')[1],
no,
user,
nickCheck,
telCheck;


// var passRule = /^[A-Za-z0-9]{6,12}$/; //숫자와 문자 포함 형태의 6~12자리 이내의 암호 정규식

$(document.body).bind('loaded-data', () => {
  // 닉네임 중복체크
  $(function() {
    // nickCheck 버튼을 클릭했을 때
    $("#nickCheck").click(function() {
        
        // nickName 을 param으로 보내기 위한 변수
        var nickName =  $("#nickName").val();
        console.log(nickName);
        
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
  });
});

// JSON 형식의 데이터 가져오기
function loadData() {
  $.getJSON('../../app/json/auth/user',
      function(data) {
    
    user = data.user;
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

$(document).ready(() => {
  
  // nickName
  $('#sb-nickname-edit').click(() => {
    $('#nickName').prop('readonly', false);
    $('#nickCheck').removeClass('std-invisible');
    $('#sb-nickname-edit').addClass('std-invisible');
    $('#sb-nickname-cancel').removeClass('std-invisible');
  });
  
  $('#sb-nickname-cancel').click(() => {
    $('#nickName').val(user.nickName);
  
    $('#nickName').closest('div').removeClass('u-has-error-v1');
    $('#nickName').closest('div').removeClass('u-has-success-v1-1');
    $('#nickName').siblings('small').addClass('std-invisible');
    $('#nickName').prop('readonly', true);
    $('#nickCheck').addClass('std-invisible');
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
  

  
// if(!passRule.test($("input[id='PASS']").val())) {
// //경고
//   
// //return false;
// }


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
      success: function(data) {
        var obj = JSON.parse(data);
        location.reload();
      }
    });
    
    loadData();
  }
  
});

$('#sb-info-cancel').click((e) => {
  e.preventDefault();
  location.reload();
});






