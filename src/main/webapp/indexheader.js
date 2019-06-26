var userInit = true,
errorTitle = "오! 이런.."
  ;

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

//    관리자라면 관리자 페이지버튼 드롭다운에 추가
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

  loadModalCategory();
  loadModalAddress();

  if(!userInit){
    $('#initModal-btn').click();
  }

});


function getCurrentScrollPercentage(){
  return (window.scrollY + window.innerHeight) / document.body.clientHeight * 100
}






$('.study-view-link').click((e) => {
  location.href = '/studyboot/html/study/view.html?studyno=' + $(e.target).parents('.card-div').find('a').attr("data-no")
  + '&name=' + $(e.target).parents('.card-div').find('a').html();
});


//hottest
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


//highest
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


//nearest
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



//생성 모달의 카테고리 분류 로딩 함수
function loadModalCategory() {


  $.getJSON('/studyboot/app/json/study/category?clsNo=',
          function(obj) {


    for(var e of obj.list){
      e.value = e.clsNo;
    }

    //분류 드롭다운
    $('.ui.dropdown.lcls')
    .dropdown({
      placeholder: '대분류',
      on: 'hover',
      values: obj.list,
      onChange: function(value, text, $selectedItem) {

        $('.ui.dropdown.mcls')
        .dropdown({
          placeholder: '중분류',
          on: 'hover',
          values: [
            ]
        })
        ;

        $('.ui.dropdown.scls')
        .dropdown({
          placeholder: '소분류',
          on: 'hover',
          values: [
            ]
        })
        ;

        if(value.length != 2){
          return;
        }
        $.getJSON('/studyboot/app/json/study/category?clsNo=' + value,
                function(objm) {
          for(var e of objm.list){
            e.value = e.clsNo;
          }
          $('.ui.dropdown.mcls')
          .dropdown({
            placeholder: '중분류',
            on: 'hover',
            values: objm.list,
            onChange: function(value, text, $selectedItem) {
              if(value.length != 4){
                return;
              }
              $.getJSON('/studyboot/app/json/study/category?clsNo=' + value,
                      function(objs) {
                for(var e of objs.list){
                  e.value = e.clsNo;
                }
                $('.ui.dropdown.scls')
                .dropdown({
                  placeholder: '소분류',
                  on: 'hover',
                  values: objs.list,
                  onChange: function(value, text, $selectedItem) {

                    if(text == undefined)
                      return;

                    if($('#tag div').length != 0){
                      for(var val of $('#tag div')){

                        if($(val).attr('data-no') == value){
                          return;
                        }
                        if($('#tag div').length == 3){
                          return;
                        }
                      }
                    } 

                    $('#tag').append('<div class="ui label" data-no="'+value+'">'+text+'<i class="delete icon"></i></div>');

                    $('.ui.label i').click(function(e){
                      $(e.target).parent().remove();
                    });

                  }
                });

              });
            }
          });
        });
      }
    });
  });
};

//생성 모달의 카테고리 분류 로딩 함수
function loadModalAddress() {


  $.getJSON('/studyboot/app/json/study/addresscategory?addressNo=',
          function(obj) {


    for(var e of obj.list){
      e.value = e.addressNo;
    }

    //분류 드롭다운
    $('.ui.dropdown.laddr')
    .dropdown({
      placeholder: '시도',
      on: 'hover',
      values: obj.list,
      onChange: function(value, text, $selectedItem) {

        $('.ui.dropdown.maddr')
        .dropdown({
          placeholder: '시군구',
          on: 'hover',
          values: [
            ]
        })
        ;

        $('.ui.dropdown.saddr')
        .dropdown({
          placeholder: '동읍면',
          on: 'hover',
          values: [
            ]
        })
        ;

        if(value.length != 2){
          return;
        }

        $.getJSON('/studyboot/app/json/study/addresscategory?addressNo=' + value,
                function(objm) {
          for(var e of objm.list){
            e.value = e.addressNo;
          }
          $('.ui.dropdown.maddr')
          .dropdown({
            placeholder: '시군구',
            on: 'hover',
            values: objm.list,
            onChange: function(value, text, $selectedItem) {
              if(value.length != 4){
                return;
              }
              $.getJSON('/studyboot/app/json/study/addresscategory?addressNo=' + value,
                      function(objs) {
                for(var e of objs.list){
                  e.value = e.addressNo;
                }
                $('.ui.dropdown.saddr')
                .dropdown({
                  placeholder: '동읍면',
                  on: 'hover',
                  values: objs.list
                });

              });
            }
          });
        });
      }
    });
  });
};


//서버에 송신
$('#init-btn').click((e) => {

  var clsNo = [];

  for(var a of $('#tag div')){
    clsNo.push($(a).attr('data-no'));
  }

//관심분야 확인
  if($('#tag div').length != 3){
    Swal.fire({
      type: 'error',
      title: errorTitle,
      text: '관심 분야를 3개 입력해주세요!'
    });
    return;
  }

//활동 지역 확인
  if($('.saddr').find(".selected").attr('data-value') == null ||
          $('.saddr').find(".selected").attr('data-value') == undefined){
    Swal.fire({
      type: 'error',
      title: errorTitle,
      text: '활동 지역을 입력해주세요!'
    });
    return;
  }

//생년월일 체크
  if(!birthCheck($("#birth").val())){
    Swal.fire({
      type: 'error',
      title: errorTitle,
      text: '올바른 생년월일을 입력해주세요!'
    });
    return;
  }


//모두 통과한다면, URI인코딩 방식으로 전송
  jQuery.ajax({
    url:"/studyboot/app/json/member/initUpdate",
    type:"POST",
    data:  "birth=" + encodeURIComponent($("#birth").val()) +
    "&cls=" + encodeURIComponent(clsNo) +  
    "&address=" + encodeURIComponent($('.saddr').find(".selected").attr('data-value')),
    contentType: "application/x-www-form-urlencoded",
    success: function(data) {
      if (data.status == 'success') {
        Swal.fire({
          type: 'success',
          title: '정보 입력을 완료했습니다!',
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          location.reload();
        }
        );
      } else {
        Swal.fire({
          type: 'error',
          title: errorTitle,
          text: '정보 입력에 실패했습니다!' + data.message
        });
      }
    }
  });

});

//날짜 체크
function birthCheck(str){

  var format = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  if(format.test(str)){
    return true;
  }else{
    return false;
  }
}





