var currCls = $('#dropdownMenuButton > span'),
templateSrc = $('#view-template').html();


function loadDetail(no) {

    $.getJSON('../../app/json/inquiry/detail?no=' + no, function(obj) {
	
	$(viewCls).html(obj.cls.name);
	$(viewDate).html(obj.createdDate);
	
	$(viewNo).html(obj.no);
	$(viewInquiryName).html(
		obj.inquiryPerson.name + obj.inquiryPerson.email + obj.inquiryPerson.registeredDate);
	$(viewContents).html(obj.contents);
	
	$(viewSuspectName).html(obj.suspectPerson.name);
	$(viewSuspectEmail).html(obj.suspectPerson.email);
	$(viewSuspectRegiDate).html(obj.suspectPerson.registeredDate);

    });

}


$(document.body).bind('loaded-list', () => {
    $('.stdinqry-view-link').click((e) => {
	e.preventDefault();
	loadDetail($(e.target).attr('data-no'));
    });
});












