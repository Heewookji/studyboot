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
    
    $("#study-search").keydown((e) => {
      if(e.keyCode == 13)
        $('#search-btn').click();
    });

    $('#main-search-btn').click((e) => {
      pageNo = 1;
      keyword = $("#main-search").val();
      window.location.href = '/studyboot/html/study/search.html?keyword=' + keyword;
    });
    
    $("#main-search").keydown((e) => {
      if(e.keyCode == 13)
        $('#main-search-btn').click();
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
      if(user.photo == null){
        $('#hd-thumbnail').attr('src', '/studyboot/upload/images/member/defaultphoto');
      }else{
        $('#hd-thumbnail').attr('src', '/studyboot/upload/images/member/thumbnail.'+ user.photo +'.jpg');
      }

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
});





function getCurrentScrollPercentage(){
  return (window.scrollY + window.innerHeight) / document.body.clientHeight * 100
}






$('.study-view-link').click((e) => {
  location.href = '/studyboot/html/study/view.html?studyno=' + $(e.target).parents('.card-div').find('a').attr("data-no")
  + '&name=' + $(e.target).parents('.card-div').find('a').html();
});


// hottest
$('#std-rate-1111').rateit({
  min: 0, 
  max: 5, 
  mode: 'font', 
  starwidth: 50, 
  readonly: true, 
  resetable: false,
  value: 4.7
});

$('#std-rate-1112').rateit({
  min: 0, 
  max: 5, 
  mode: 'font', 
  starwidth: 50, 
  readonly: true, 
  resetable: false,
  value: 4.5
});

$('#std-rate-1113').rateit({
  min: 0, 
  max: 5, 
  mode: 'font', 
  starwidth: 50, 
  readonly: true, 
  resetable: false,
  value: 4
});

$('#std-rate-1114').rateit({
  min: 0, 
  max: 5, 
  mode: 'font', 
  starwidth: 50, 
  readonly: true, 
  resetable: false,
  value: 4
});

$('#std-rate-1115').rateit({
  min: 0, 
  max: 5, 
  mode: 'font', 
  starwidth: 50, 
  readonly: true, 
  resetable: false,
  value: 3.7
});


// highest
$('#std-rate-2221').rateit({
  min: 0, 
  max: 5, 
  mode: 'font', 
  starwidth: 50, 
  readonly: true, 
  resetable: false,
  value: 4.8
});

$('#std-rate-2222').rateit({
  min: 0, 
  max: 5, 
  mode: 'font', 
  starwidth: 50, 
  readonly: true, 
  resetable: false,
  value: 4.7
});

$('#std-rate-2223').rateit({
  min: 0, 
  max: 5, 
  mode: 'font', 
  starwidth: 50, 
  readonly: true, 
  resetable: false,
  value: 4.6
});

$('#std-rate-2224').rateit({
  min: 0, 
  max: 5, 
  mode: 'font', 
  starwidth: 50, 
  readonly: true, 
  resetable: false,
  value: 4.5
});

$('#std-rate-2225').rateit({
  min: 0, 
  max: 5, 
  mode: 'font', 
  starwidth: 50, 
  readonly: true, 
  resetable: false,
  value: 4.5
});


// nearest
$('#std-rate-3331').rateit({
  min: 0, 
  max: 5, 
  mode: 'font', 
  starwidth: 50, 
  readonly: true, 
  resetable: false,
  value: 4
});

$('#std-rate-3332').rateit({
  min: 0, 
  max: 5, 
  mode: 'font', 
  starwidth: 50, 
  readonly: true, 
  resetable: false,
  value: 4
});

$('#std-rate-3333').rateit({
  min: 0, 
  max: 5, 
  mode: 'font', 
  starwidth: 50, 
  readonly: true, 
  resetable: false,
  value: 3.8
});

$('#std-rate-3334').rateit({
  min: 0, 
  max: 5, 
  mode: 'font', 
  starwidth: 50, 
  readonly: true, 
  resetable: false,
  value: 3.3
});

$('#std-rate-3335').rateit({
  min: 0, 
  max: 5, 
  mode: 'font', 
  starwidth: 50, 
  readonly: true, 
  resetable: false,
  value: 3
});





