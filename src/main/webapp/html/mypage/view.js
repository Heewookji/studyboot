var param = location.href.split('?')[1],
no,
member;


//var passRule = /^[A-Za-z0-9]{6,12}$/; //숫자와 문자 포함 형태의 6~12자리 이내의 암호 정규식



// JSON 형식의 데이터 가져오기
function loadData(no) {
  $.getJSON('../../app/json/member/detail?no=' + no,
      function(data) {
    
    member = data;
    console.log(data);
    $('#userName').val(data.name);
    $('#nickName').val(data.nickName);
    $('#email').val(data.email);
    $('#tel').val(data.tel);
    $('#birth').val(data.birth);
//    $('#cls').val(data.cls);
//    $('#sdt').val(data.startDate);
//    $('#edt').val(data.endDate);
//    $('#prsn').val(data.personnel);
//    $('#rate').val(data.rate);
//    $('#age').val(data.memberAge);
//    $('#attendance').val(data.attendance);
//    $('#endrate').val(data.endrate);
    
  });
};

loadData(2);

// inquiry
$('#inqryForm-btn').click((e) => {
  e.preventDefault();
  $('.sspctForm-Format').addClass('std-invisible');
  $('#inqryName').html("홍길동");
  $('#formTitle').html($('#inqryName').html() +"님  문의"+ " 내용을 적어주세요");
  $('#sspctName').val("");
  $('#inqryNo').val(1);
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

// userName
$('#sb-name-edit').click(() => {
  $('#userName').prop('readonly', false);
  $('#userName').removeClass('form-control-plaintext');
  $('#sb-name-edit').addClass('std-invisible');
  $('#sb-name-save').removeClass('std-invisible');
});

$('#sb-name-save > .icon-media-065').click(() => {
  $('#userName').prop('readonly', true);
  $('#userName').addClass('form-control-plaintext');
  $('#sb-name-save').addClass('std-invisible');
  $('#sb-name-edit').removeClass('std-invisible');
});

$('#sb-name-save > .icon-media-066').click(() => {
  $('#userName').val(member.name);

  $('#userName').prop('readonly', true);
  $('#userName').addClass('form-control-plaintext');
  $('#sb-name-save').addClass('std-invisible');
  $('#sb-name-edit').removeClass('std-invisible');
});

// nickName
$('#sb-nickname-edit').click(() => {
  $('#nickName').prop('readonly', false);
  $('#nickName').removeClass('form-control-plaintext');
  $('#sb-nickname-edit').addClass('std-invisible');
  $('#sb-nickname-save').removeClass('std-invisible');
});

$('#sb-nickname-save > .icon-media-065').click(() => {
  $('#nickName').prop('readonly', true);
  $('#nickName').addClass('form-control-plaintext');
  $('#sb-nickname-save').addClass('std-invisible');
  $('#sb-nickname-edit').removeClass('std-invisible');
});

$('#sb-nickname-save > .icon-media-066').click(() => {
  $('#nickName').val(member.nickName);

  $('#nickName').prop('readonly', true);
  $('#nickName').addClass('form-control-plaintext');
  $('#sb-nickname-save').addClass('std-invisible');
  $('#sb-nickname-edit').removeClass('std-invisible');
});

// email
$('#sb-email-edit').click(() => {
  $('#email').prop('readonly', false);
  $('#email').removeClass('form-control-plaintext');
  $('#sb-email-edit').addClass('std-invisible');
  $('#sb-email-save').removeClass('std-invisible');
});

$('#sb-email-save > .icon-media-065').click(() => {
  
  // 이메일 형식 검사..
  var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;//이메일 정규식
  
  if(!emailRule.test($("input[id='email']").val())) {
    //경고
    return false;
  } else {
    $('#email').prop('readonly', true);
    $('#email').addClass('form-control-plaintext');
    $('#sb-email-save').addClass('std-invisible');
    $('#sb-email-edit').removeClass('std-invisible');
  }
  
});

$('#sb-email-save > .icon-media-066').click(() => {
  $('#email').val(member.email);
  
  $('#email').prop('readonly', true);
  $('#email').addClass('form-control-plaintext');
  $('#sb-email-save').addClass('std-invisible');
  $('#sb-email-edit').removeClass('std-invisible');
});
  
// tel
$('#sb-tel-edit').click(() => {
  $('#tel').prop('readonly', false);
  $('#tel').removeClass('form-control-plaintext');
  $('#sb-tel-edit').addClass('std-invisible');
  $('#sb-tel-save').removeClass('std-invisible');
});

$('#sb-tel-save > .icon-media-065').click(() => {
  $('#tel').prop('readonly', true);
  $('#tel').addClass('form-control-plaintext');
  $('#sb-tel-save').addClass('std-invisible');
  $('#sb-tel-edit').removeClass('std-invisible');
});

$('#sb-tel-save > .icon-media-066').click(() => {
  $('#tel').val(member.tel);

  $('#tel').prop('readonly', true);
  $('#tel').addClass('form-control-plaintext');
  $('#sb-tel-save').addClass('std-invisible');
  $('#sb-tel-edit').removeClass('std-invisible');
});

// birth
$('#sb-birth-edit').click(() => {
  $('#birth').prop('readonly', false);
  $('#birth').removeClass('form-control-plaintext');
  $('#sb-birth-edit').addClass('std-invisible');
  $('#sb-birth-save').removeClass('std-invisible');
});

$('#sb-birth-save > .icon-media-065').click(() => {
  $('#birth').prop('readonly', true);
  $('#birth').addClass('form-control-plaintext');
  $('#sb-birth-save').addClass('std-invisible');
  $('#sb-birth-edit').removeClass('std-invisible');
});

$('#sb-birth-save > .icon-media-066').click(() => {
  $('#birth').val(member.birth);

  $('#birth').prop('readonly', true);
  $('#birth').addClass('form-control-plaintext');
  $('#sb-birth-save').addClass('std-invisible');
  $('#sb-birth-edit').removeClass('std-invisible');
});

  
  
//  if(!passRule.test($("input[id='PASS']").val())) {
//    //경고
//   
//    //return false;
//  }


$('#sb-info-change').click((e) => {
  e.preventDefault();
  
  $.ajax({
    url:'../../app/json/member/update',
    type: 'post',
    dataType: 'text',
    data: {
      no: member.no,
      name: $(userName).val(),
      nickName: $(nickName).val(),
      birth: $(birth).val(),
      email: $(email).val(),
      tel: $(tel).val()
    },
    success: function(data) {
      var obj = JSON.parse(data);
      location.reload();
    }
  });
});

$('#sb-info-cancel').click((e) => {
  e.preventDefault();
  location.reload();
});






