var currCls = $('#dropdownMenuButton > span'),
templateSrc = $('#view-template').html();


function loadDetail(no) {

    $.getJSON('../../app/json/message/detail?no=' + no, function(obj) {
  
  $(nick_name).html(obj.sendNo);
//  $(viewDate).html(obj.createdDate);
//  
//  $(viewNo).val(obj.messageNo);
//  
  $(viewInquiryText).html(obj.contents);
  
//  $(viewContents).html(obj.contents);
//  
//  if(obj.suspectPerson){
//      
//   $(viewSuspectText).html('피신고 회원  ' +obj.suspectPerson.name+'님 '
//  + '이메일 '+obj.suspectPerson.email
//  + '가입일 ' +obj.suspectPerson.registeredDate);
//   
//  } else{
//    $(viewSuspectText).html('');
//  }
//  
  $(document.body).trigger('loaded-detail');
    });

}



$('#inqryRemove-btn').click((e) => {
    
    $.getJSON('../../app/json/inquiry/delete?no=' + $(viewNo).val(),
      function(obj) {
  location.reload();
})
});


$(document.body).bind('loaded-list', () => {
    $('.message-view-link').click((e) => {
  e.preventDefault();
  loadDetail($(e.target).attr('data-no'));
    });
});












