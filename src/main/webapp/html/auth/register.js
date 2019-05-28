var idNo,
emailInit;
;

$(document).on('ready', function () {
    // initialization of tabs
    $.HSCore.components.HSTabs.init('[role="tablist"]');

    // initialization of counters
    var counters = $.HSCore.components.HSCounter.init('[class*="js-counter"]');

});

$(window).on('load', function () {

    // initialization of HSMegaMenu component
    $('.js-mega-menu').HSMegaMenu({
	event: 'hover',
	pageContainer: $('.container'),
	breakpoint: 991
    });

    // initialization of custom select
    setTimeout(function() { // important in this case
	$.HSCore.components.HSSelect.init('.js-custom-select');
    }, 1);
});

$(window).on('resize', function () {
    setTimeout(function () {
	$.HSCore.components.HSTabs.init('[role="tablist"]');
    }, 200);
});


$("#email-btn").click((e) => {
    $.getJSON('/studyboot/app/json/mail/send?email='+ $("#email").val(), function(obj) {
	idNo = obj.id;
    }
    );
    
    //처음에만 한번 등록
    if(emailInit){
    $( "#idNo" ).change(function() {
	if($("#idNo").val() == idNo){
	    alert("일치합니다!");
	}
    });
    }
    
    emailInit = false;
    
});


