
$( document ).ready(function() {
    $("#js-header").load("/studyboot/html/header.html", function(){

	$('.cls-btn').click((e) => {
	    window.location.href =
		'/studyboot/html/study/index.html?clsNo='
		+ $(e.target).attr('data-no')
		+ '&clsTitle=' + $(e.target).text()
		+ '&keyword=';
	});

	$('#search-btn').click((e) => {
	    pageNo = 1;
	    keyword = $("#study-search").val();
	    window.location.href = '/studyboot/html/study/search.html?keyword=' + keyword;
	});


	$(document.body).trigger('loaded-header');
    });

});

$(document.body).bind('loaded-header', () => {
    // initialization of go to
    $.HSCore.components.HSGoTo.init('.js-go-to');

    // initialization of carousel
    $.HSCore.components.HSCarousel.init('.js-carousel');

    // initialization of HSDropdown component
    $.HSCore.components.HSDropdown.init($('[data-dropdown-target]'), {
	afterOpen: function(){
	    $(this).find('input[type="search"]').focus();
	}
    });

    // initialization of HSScrollBar component
    $.HSCore.components.HSScrollBar.init($('.js-scrollbar'));

    // initialization of masonry
    $('.masonry-grid').imagesLoaded().then(function () {
	$('.masonry-grid').masonry({
	    columnWidth: '.masonry-grid-sizer',
	    itemSelector: '.masonry-grid-item',
	    percentPosition: true
	});
    });

    // initialization of popups
    $.HSCore.components.HSPopup.init('.js-fancybox');

    // initialization of header
    $.HSCore.components.HSHeader.init($('#js-header'));
    $.HSCore.helpers.HSHamburgers.init('.hamburger');

});


$(document.body).bind('loaded-header', () => {
//  로그인 사용자 불러온다.
    loadLoginUser();

    $('#logout').click((e) => {
	e.preventDefault();
	$.getJSON('/studyboot/app/json/auth/logout',
		function(obj) {
	    location.href = "/studyboot"
	});
    });

});


function loadLoginUser() {

    $.getJSON('/studyboot/app/json/auth/user',
	    function(obj) {
	var user = obj.user;
	var loginState = $(".std-login");
	var notLoginState = $(".std-not-login");

	if (obj.status == 'success') {
	    notLoginState.addClass('std-invisible');
	    
	    $("#nickname").html(user.nickName);
	    
	    if(obj.myStudyList != undefined){
		var myStudyListTemplateSrc = $('#myStudy-template').html();
		var myStudyListGenerator = Handlebars.compile(myStudyListTemplateSrc);
		$(myStudyListGenerator(obj)).appendTo($('#std-dropdown'));
	    }
	    
	} else {
	    loginState.addClass('std-invisible');
	}
    });
}


