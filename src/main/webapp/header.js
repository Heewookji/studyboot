
$( document ).ready(function() {
    $("#js-header").load("./header.html");
    $(document.body).trigger('loaded-header');
});

  

//initialization of go to
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

$(window).on('load', function () {
// initialization of header
$.HSCore.components.HSHeader.init($('#js-header'));
$.HSCore.helpers.HSHamburgers.init('.hamburger');
});
  

