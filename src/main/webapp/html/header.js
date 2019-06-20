var errorTitle = '오! 이런..';

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
//로그인 사용자 불러온다.
  loadLoginUser();

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
      $('#hd-thumbnail').attr('src', '/studyboot/upload/images/member/'  + user.photo);

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
        window.location.href = '../mystudy/index.html?no=' + $(e.target).attr('my-study-no');
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

    } else {
      loginState.addClass('std-invisible');
    }
  });
}


