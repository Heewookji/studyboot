var currCls = $('#dropdownMenuButton > span'),
templateSrc = $('#view-template').html();


function loadDetail(no) {

    $.getJSON('../../app/json/inquiry/detail?no=' + no, function(obj) {
	
	$(viewCls).html(obj.cls.name);
	$(viewDate).html(obj.createdDate);
	
	$(viewNo).html('문의   ' + obj.no + '번 ');
	$(viewInquiryName).html('문의 회원   ' +obj.inquiryPerson.name +'님 ');
	$(viewInquiryEmail).html('이메일 '+ obj.inquiryPerson.email)
	$(viewInquiryRegiDate).html('가입일 ' +obj.inquiryPerson.registeredDate);
	
	$(viewContents).html(obj.contents);
	
	if(obj.suspectPerson){
	$(viewSuspectName).html('피신고 회원  ' +obj.suspectPerson.name+'님 ');
	$(viewSuspectEmail).html('이메일 '+obj.suspectPerson.email);
	$(viewSuspectRegiDate).html('가입일 ' +obj.suspectPerson.registeredDate);
	} else{
	    
	$(viewSuspectName).html('');
	$(viewSuspectEmail).html('');
	$(viewSuspectRegiDate).html('');
	}
	
	
    });

}


$(document.body).bind('loaded-list', () => {
    $('.stdinqry-view-link').click((e) => {
	e.preventDefault();
	loadDetail($(e.target).attr('data-no'));
    });
});












