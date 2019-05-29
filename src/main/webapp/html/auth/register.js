var emailNo,
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

    $("#email-btn").prop("hidden", true);
    $("#emailNo").prop("type", "text");

    $.getJSON('/studyboot/app/json/mail/send?email='+ $("#email").val(), function(obj) {
	emailNo = obj.id;
    }
    );
    //처음에만 한번 등록
    if(emailInit){
	$( "#emailNo" ).change(function() {
	    if($("#emailNo").val() == emailNo){
		alert("일치합니다!");
	    }
	});
    }
    emailInit = false;
});


//닉네임 체크
$( "#nickName" ).change(function(){
    
    if(nickCheck() == true){
	$( "#nickNameDiv small" ).remove();
    } else{
	$( "#nickNameDiv small" ).remove();
	 $( "#nickNameDiv" ).append( "<small class='text-muted g-font-size-12'>6~10자의" +
	    " 한글, 영문, 숫자만 사용할 수 있습니다</small>" );
    }
   
});
//닉네임 체크
function nickCheck() {
    var str = $("#nickName").val();
    if(str.length < 6 || str.length > 10) {
	return false;
    }
    var chk = /[0-9]|[a-z]|[A-Z]|[가-힣]/;

    for( var i = 0; i <= str.length -1 ; i++ )
    {
	if(chk.test(str.charAt(i)))
	{
	}
	else
	{
	    return false;
	}
    }
    return true;
}

