//현재 URL을 ?로 나누어 파라미터를 구한다.
var param = location.href.split('?')[1],
//card 리스트 출력 - 스터디 목록
studyMemberSrc = $('#view-studymember').html(),
studyMemberGenerator = Handlebars.compile(studyMemberSrc),
heartClicked = false;
;



//param 변수는 값이 있으면 true를 리턴한다.
if (param) {
  // loadData 함수를 호출한다. param 변수를 =로 나누어 파라미터의 값을 구한다.
  var no = param.split('&')[0];
  var name = param.split('&')[1];
  loadData(no.split('=')[1]);

  //이름 타이틀에 넣어준다.
  $('#studyNameHead').html(decodeURIComponent(name.split('=')[1]));
}


//스터디 상세 데이터를 불러오는 함수
function loadData(no) {

  $.getJSON('../../app/json/study/detail?no=' + no,
          function(data) {

    console.log(data);

    //빵 부스러기
    $('#lClsTitle').text(data.clsList[0].name);
    $('#lClsTitle').attr('data-no', data.clsList[0].clsLargeNo);
    $('#mClsTitle').text(data.clsList[1].name);
    $('#mClsTitle').attr('data-no', data.clsList[1].clsLargeNo + data.clsList[1].clsMediumNo );
    $('#sClsTitle').text(data.clsList[2].name);
    $('#sClsTitle').attr('data-no', data.clsList[2].clsLargeNo + data.clsList[2].clsMediumNo + data.clsList[2].clsSmallNo);
    $('#lClsTitle').click(function(e) {
      location.href= '/studyboot/html/study/index.html?clsNo='+$('#lClsTitle').attr('data-no')+'&clsTitle='+$('#lClsTitle').text()+'&keyword=';
    });
    


    $('#name').text(data.name);
    $('#goal').html( data.goal);
    $('#contents').append(data.contents);

    for(var day of data.dayStrList){
      $('#day').append("<li class=\"list-inline-item g-mb-10\"><a class=\"u-tags-v1 g-color-main g-brd-around g-brd-gray-light-v3 g-bg-gray-dark-v2--hover g-brd-gray-dark-v2--hover g-color-white--hover g-rounded-50 g-py-4 g-px-15\">"
              + day+"</a></li>");
    }

    $('#cls').val(data.cls);
    $('#sdt').text(data.startDate);
    $('#edt').text(data.endDate);
    $('#prsn').val(data.personnel);
    $('#age').val(data.memberAge);
    $('#attendance').val(data.attendance);
    $('#endrate').val(data.endrate);
    //rate
    $('#rate').rateit();
    $('#rate').rateit('value', data.rate);
    $('#leftDay').text(data.currentDateDiff);

    $('#dayProgress').css("width", Math.round((data.totalDateDiff - data.currentDateDiff)/data.totalDateDiff * 100) + '%'); 
    $('#dayProgressText').html(Math.round((data.totalDateDiff - data.currentDateDiff)/data.totalDateDiff * 100) + '%');

    // 값을 넣어준 뒤, 프로그래스 바를 초기화해야 실행이 원활하게 된다.
    var horizontalProgressBars = $.HSCore.components.HSProgressBar.init('.js-hr-progress-bar', {
      direction: 'horizontal',
      indicatorSelector: '.js-hr-progress-bar-indicator'
    });
    $(studyMemberGenerator(data)).appendTo('#studyMemberList');


    for(var member of data.studyMembers){
      if(member.leader){
        $('#studyLeader').append('<img class="ui avatar image" src="/studyboot/upload/images/member/'+ member.photo  + '">'+ member.name);
        $("#memberRate").html('<div class="rateit g-pl-20" id="studyMemberRate" data-rateit-readonly="true"data-rateit-mode="font" style="font-size: 20px"data-rateit-resetable="false" data-rateit-value="'+member.rate+'"></div>')
      }
    }

    $('#personnel').html(data.nowPersonnel + '/' + data.personnel );


    //지도 출력
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
      center: new daum.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };

    var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴


    $(document.body).trigger('loaded-studyInfo');
  });
}


$(document.body).bind('loaded-studyInfo', () => {
  $('.ui.dropdown.memberDropdown')
  .dropdown({
    on: 'hover',
    onChange: function(value, text, $selectedItem) {
      $('#studyMemberRate').rateit('value', value);
    }
  });

  $('#studyMemberRate').rateit();

});


$('#heart-btn').click(function(e) {
  if(!heartClicked){
    $('#heart-btn').removeClass('u-btn-outline-dribbble');
    $('#heart-btn').addClass('g-bg-dribbble');
    $('#heart-btn').addClass('g-color-white');
    heartClicked = true;
  } else{
    $('#heart-btn').addClass('u-btn-outline-dribbble');
    $('#heart-btn').removeClass('g-bg-dribbble');
    $('#heart-btn').removeClass('g-color-white');
    heartClicked = false;
  }
 

});









