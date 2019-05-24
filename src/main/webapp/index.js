
$( document ).ready(function() {
    $("#js-header").load("./indexheader.html", function(){
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

// initialization of carousel
$.HSCore.components.HSCarousel.init('[class*="js-carousel"]');

});



$(document.body).bind('loaded-header', () => {
    $(window).scroll(function(obj) {
	const currentScrollPercentage = getCurrentScrollPercentage()

	if(currentScrollPercentage > 50){
	    $('#header-child').prop('hidden', false);
	    $('#header-search').prop('hidden', false);
	}else{
	    $('#header-child').prop('hidden', true);
	    $('#header-search').prop('hidden', true);
	}
    });
});


function getCurrentScrollPercentage(){
    return (window.scrollY + window.innerHeight) / document.body.clientHeight * 100
}
