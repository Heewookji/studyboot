
$( document ).ready(function() {
    $("#js-header").load("../header.html", function(){
	$(document.body).trigger('loaded-header');
    });
});


$(document.body).bind('loaded-header', () => {
    // initialization of go to
    $.HSCore.components.HSGoTo.init('.js-go-to');
  
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


function getCurrentScrollPercentage(){
    return (window.scrollY + window.innerHeight) / document.body.clientHeight * 100
}

//JSON 형식의 데이터 목록 가져오기
function loadList(no) {
  $.getJSON('../../app/json/study/getStudy?no=' + no,
      function(obj) {

    console.log(no);



    $(cardGenerator(obj)).appendTo(tbody);

    // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-list');
      });

};
























