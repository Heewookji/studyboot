var userInit = true;

$( document ).ready(function() {
  $("#js-header").load("./indexheader.html", function(){

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

    $('#main-search-btn').click((e) => {
      pageNo = 1;
      keyword = $("#main-search").val();
      window.location.href = '/studyboot/html/study/search.html?keyword=' + keyword;
    });

    $('#mypage-btn').click((e) => {
      window.location.href = '/studyboot/html/mypage/index.html';
    });

    $('#message-btn').click((e) => {
      window.location.href = '/studyboot/html/message/index.html';
    });

    $(document.body).trigger('loaded-header');
  });
});




$(document.body).bind('loaded-header', () => {
  // initialization of go to
  $.HSCore.components.HSGoTo.init('.js-go-to');

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



$(document.body).bind('loaded-header', () => {
//로그인 사용자 불러온다.
  loadLoginUser();


});


function loadLoginUser() {

  $.getJSON('/studyboot/app/json/auth/user',
          function(obj) {

    var loginState = $(".std-login");
    var notLoginState = $(".std-not-login");

    if (obj.status == 'success') {
      var user = obj.user;
      notLoginState.addClass('std-invisible');
      
      $("#nickname").html(user.nickName);
      $('#hd-thumbnail').attr('src', '/studyboot/upload/images/member/'+ user.photo);

      if(obj.myStudyList != undefined){
        var myStudyListTemplateSrc = $('#myStudy-template').html();
        var myStudyListGenerator = Handlebars.compile(myStudyListTemplateSrc);
        $(myStudyListGenerator(obj)).appendTo($('#myDropdown'));
      }
      $('#myDropdown').append("<div class=\"divider\"></div><div class=\"item\" id=\"logout\">로그아웃</div>");

//      관리자라면 관리자 페이지버튼 드롭다운에 추가
      if(obj.user.admin){
        $("#std-dropdown").append("<div class=\"divider\"></div>" + 
                "<div class=\"item\" id=\"logout\">관리자</div>");
      }
      
      $('.my-study').click((e) => {
        window.location.href = '/studyboot/html/mystudy/index.html?no=' + $(e.target).attr('my-study-no');
      });
      
      $('#logout').click((e) => {
        e.preventDefault();
        $.getJSON('/studyboot/app/json/auth/logout',
            function(obj) {
          location.href = "/studyboot"
        });
        window.localStorage.removeItem("user");
      });
      
      
      $('.ui.dropdown.std-login')
      .dropdown({
        on: 'hover',
        action: 'hide'
      });

      if(user.birth == null ||
              user.cls.length == null ||
              user.cls.length == 0){
        userInit = false;
      }
    } else {
      loginState.addClass('std-invisible');
    }
    
    $(document.body).trigger('loaded-user');
    
  });
  
}

$(document.body).bind('loaded-user', () => {
  
  if(!userInit){
    $('#initModal-btn').click();
    }
  
  $('#init-btn').click((e) => {
    //서버에 송신
    
    
  });
 
  });

$('#exampleModalCenter').on('shown.bs.modal', function (e) {
  alert("modal shown!");
});





function getCurrentScrollPercentage(){
  return (window.scrollY + window.innerHeight) / document.body.clientHeight * 100
}


