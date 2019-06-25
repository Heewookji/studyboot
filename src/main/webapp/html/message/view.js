var currCls = $('#dropdownMenuButton > span'),
templateSrc = $('#view-template').html();

function loadDetail(no) {

    $.getJSON('../../app/json/message/detail?no=' + no, function(obj) {
  
  
  $(nickName).html(obj.messagePerson.nickName);
  $(viewInquiryText).html(obj.contents);
  $(viewNo).val(obj.no);
  
  $(document.body).trigger('loaded-detail');
    });

}

$('#messageRemove-btn').click((e) => {
    
    $.getJSON('../../app/json/message/delete?no=' + $(viewNo).val(),
      function(obj) {
      const Toast = Swal.mixin({
        toast: true,
        showConfirmButton: false,
        timer: 1000
      });
      Toast.fire({
        type: 'success',
        title: '메시지를 삭제했습니다!'
      }).then((result) => {
  location.reload();
      });
})
});

$(document.body).bind('loaded-list', () => {
    $('.message-view-link').click((e) => {
  e.preventDefault();
  loadDetail($(e.target).attr('data-no'));
    });
});












