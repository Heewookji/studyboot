var currCls = $('#dropdownMenuButton > span'),
templateSrc = $('#view-template').html();


function loadDetail(no) {

    $.getJSON('../../app/json/inquiry/detail?no=' + no, function(obj) {
	
	$(viewCls).html(obj.cls.name);
	$(viewDate).html(obj.createdDate);
	
	$(viewNo).val(obj.no);
	
	$(viewInquiryText).html('문의   ' + obj.no + '번 '
	+ '문의 회원   ' +obj.inquiryPerson.name +'님 '
	+ '이메일 '+ obj.inquiryPerson.email
	+ '가입일 ' +obj.inquiryPerson.registeredDate);
	
	$(viewContents).html(obj.contents);
	
	if(obj.suspectPerson){
	    
	 $(viewSuspectText).html('피신고 회원  ' +obj.suspectPerson.name+'님 '
	+ '이메일 '+obj.suspectPerson.email
	+ '가입일 ' +obj.suspectPerson.registeredDate);
	 
	} else{
	  $(viewSuspectText).html('');
	}
	
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
    $('.stdinqry-view-link').click((e) => {
	e.preventDefault();
	loadDetail($(e.target).attr('data-no'));
    });
});












