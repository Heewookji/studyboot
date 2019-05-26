var templateSrc = $('#div-template').html(), // script 태그에서 탬플릿 데이터를 꺼낸다.
trGenerator = Handlebars.compile(templateSrc), // Handlebars를 통해 템플릿 데이터를 가지고 최종 결과를 생성할 함수를 준비한다.
container = document.getElementById('spaceMap'), //지도를 담을 영역의 DOM 레퍼런스
options = { //지도를 생성할 때 필요한 기본 옵션
  center: new daum.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
  level: 2 //지도의 레벨(확대, 축소 정도)
}, 
map = new daum.maps.Map(container, options), //지도 생성 및 객체 리턴
geocoder = new daum.maps.services.Geocoder(),
spaceObj,
coords= new Array();

//JSON 형식의 데이터 목록 가져오기
$(document).ready(function loadList() {
  $.getJSON('../../app/json/space/list',  function(obj) {
    spaceObj = obj.list;

    $(trGenerator(obj)).appendTo('#list');
    $(document.body).trigger('loaded-list');
    loadAddress(spaceObj);

  }); // Bitcamp.getJSON()
}); // loadList()

$(document.body).bind('loaded-list', () => {

  $('.u-link-v2').click((e) => {
    // e.preventDefault();
    // location은 페이지 로딩과 관련되어 쓰인다.
    window.location.href = 'view.html?no=' + $(e.target).attr('space-no');
  });
});

function loadAddress (spaceObj) {
  $.each(spaceObj,  function(index, val) {

    geocoder.addressSearch(val.completedAddress, function(result, status) {

      // 정상적으로 검색이 완료됐으면 
      if (status === daum.maps.services.Status.OK) {

        coords[index] = new daum.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new daum.maps.Marker({
          map: map,
          position: coords[index]
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new daum.maps.InfoWindow({
          content: '<div style="width:150px; text-align:center; padding:6px 0;">'+val.name+'</div>'
        });
        infowindow.open(map, marker);
      } 
      loadCurrentPosition();
    });
  })
}


function loadCurrentPosition() {
//현재 위치를 가져오는 메서드
  if (navigator.geolocation) {

    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function(position) {

      var lat = position.coords.latitude, // 위도
      lon = position.coords.longitude; // 경도

      var locPosition = new daum.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
      message = '<div style="padding:5px;">현재 위치입니다</div>'; // 인포윈도우에 표시될 내용입니다

      // 마커와 인포윈도우를 표시합니다
      displayMarker(locPosition, message);

    });

  } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

    var locPosition = new daum.maps.LatLng(33.450701, 126.570667),    
    message = 'geolocation을 사용할수 없습니다'

      displayMarker(locPosition, message);
  }
}

//지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition, message) {

  // 마커를 생성합니다
  var marker = new daum.maps.Marker({  
    map: map, 
    position: locPosition
  }); 

  var iwContent = message, // 인포윈도우에 표시할 내용
  iwRemoveable = true;

  // 인포윈도우를 생성합니다
  var infowindow = new daum.maps.InfoWindow({
    content : iwContent,
    removable : iwRemoveable
  });

  // 인포윈도우를 마커위에 표시합니다 
  infowindow.open(map, marker);

  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition);
}

/* ---------------------------------------------------------------------------------------------- */

var MARKER_WIDTH = 33, // 기본, 클릭 마커의 너비
MARKER_HEIGHT = 36, // 기본, 클릭 마커의 높이
OFFSET_X = 12, // 기본, 클릭 마커의 기준 X좌표
OFFSET_Y = MARKER_HEIGHT, // 기본, 클릭 마커의 기준 Y좌표
OVER_MARKER_WIDTH = 40, // 오버 마커의 너비
OVER_MARKER_HEIGHT = 42, // 오버 마커의 높이
OVER_OFFSET_X = 13, // 오버 마커의 기준 X좌표
OVER_OFFSET_Y = OVER_MARKER_HEIGHT, // 오버 마커의 기준 Y좌표
SPRITE_MARKER_URL = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markers_sprites2.png', // 스프라이트 마커 이미지 URL
SPRITE_WIDTH = 126, // 스프라이트 이미지 너비
SPRITE_HEIGHT = 146, // 스프라이트 이미지 높이
SPRITE_GAP = 10; // 스프라이트 이미지에서 마커간 간격

var markerSize = new daum.maps.Size(MARKER_WIDTH, MARKER_HEIGHT), // 기본, 클릭 마커의 크기
markerOffset = new daum.maps.Point(OFFSET_X, OFFSET_Y), // 기본, 클릭 마커의 기준좌표
overMarkerSize = new daum.maps.Size(OVER_MARKER_WIDTH, OVER_MARKER_HEIGHT), // 오버 마커의 크기
overMarkerOffset = new daum.maps.Point(OVER_OFFSET_X, OVER_OFFSET_Y), // 오버 마커의 기준 좌표
spriteImageSize = new daum.maps.Size(SPRITE_WIDTH, SPRITE_HEIGHT); // 스프라이트 이미지의 크기

var positions = new Array();

$.each(coords,  function(index, val) {
 positions = [  // 마커의 위치
  new daum.maps.LatLng(val[index].jb, val[index].ib),
  ];
})
  var selectedMarker = null; // 클릭한 마커를 담을 변수
/*
var mapContainer = document.getElementById('map'), // 지도를 표시할 div
mapOption = { 
    center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};
 */
//map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

//지도 위에 마커를 표시합니다
for (var i = 0, len = positions.length; i < len; i++) {
  alert(positions.length);
  var gapX = (MARKER_WIDTH + SPRITE_GAP), // 스프라이트 이미지에서 마커로 사용할 이미지 X좌표 간격 값
  originY = (MARKER_HEIGHT + SPRITE_GAP) * i, // 스프라이트 이미지에서 기본, 클릭 마커로 사용할 Y좌표 값
  overOriginY = (OVER_MARKER_HEIGHT + SPRITE_GAP) * i, // 스프라이트 이미지에서 오버 마커로 사용할 Y좌표 값
  normalOrigin = new daum.maps.Point(0, originY), // 스프라이트 이미지에서 기본 마커로 사용할 영역의 좌상단 좌표
  clickOrigin = new daum.maps.Point(gapX, originY), // 스프라이트 이미지에서 마우스오버 마커로 사용할 영역의 좌상단 좌표
  overOrigin = new daum.maps.Point(gapX * 2, overOriginY); // 스프라이트 이미지에서 클릭 마커로 사용할 영역의 좌상단 좌표

//마커를 생성하고 지도위에 표시합니다
  addMarker(positions[i], normalOrigin, overOrigin, clickOrigin);
}

//마커를 생성하고 지도 위에 표시하고, 마커에 mouseover, mouseout, click 이벤트를 등록하는 함수입니다
function addMarker(position, normalOrigin, overOrigin, clickOrigin) {

//기본 마커이미지, 오버 마커이미지, 클릭 마커이미지를 생성합니다
  var normalImage = createMarkerImage(markerSize, markerOffset, normalOrigin),
  overImage = createMarkerImage(overMarkerSize, overMarkerOffset, overOrigin),
  clickImage = createMarkerImage(markerSize, markerOffset, clickOrigin);

//마커를 생성하고 이미지는 기본 마커 이미지를 사용합니다
  var marker = new daum.maps.Marker({
    map: map,
    position: position,
    image: normalImage
  });

//마커 객체에 마커아이디와 마커의 기본 이미지를 추가합니다
  marker.normalImage = normalImage;

//마커에 mouseover 이벤트를 등록합니다
  daum.maps.event.addListener(marker, 'mouseover', function() {

    // 클릭된 마커가 없고, mouseover된 마커가 클릭된 마커가 아니면
    // 마커의 이미지를 오버 이미지로 변경합니다
    if (!selectedMarker || selectedMarker !== marker) {
      marker.setImage(overImage);
    }
  });

//마커에 mouseout 이벤트를 등록합니다
  daum.maps.event.addListener(marker, 'mouseout', function() {

    // 클릭된 마커가 없고, mouseout된 마커가 클릭된 마커가 아니면
    // 마커의 이미지를 기본 이미지로 변경합니다
    if (!selectedMarker || selectedMarker !== marker) {
      marker.setImage(normalImage);
    }
  });
  /*
// 마커에 click 이벤트를 등록합니다
daum.maps.event.addListener(marker, 'click', function() {

    // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
    // 마커의 이미지를 클릭 이미지로 변경합니다
    if (!selectedMarker || selectedMarker !== marker) {

        // 클릭된 마커 객체가 null이 아니면
        // 클릭된 마커의 이미지를 기본 이미지로 변경하고
        !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage);

        // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
        marker.setImage(clickImage);
    }

    // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
    selectedMarker = marker;
});
   */
}

//MakrerImage 객체를 생성하여 반환하는 함수입니다
function createMarkerImage(markerSize, offset, spriteOrigin) {
  var markerImage = new daum.maps.MarkerImage(
      SPRITE_MARKER_URL, // 스프라이트 마커 이미지 URL
      markerSize, // 마커의 크기
      {
        offset: offset, // 마커 이미지에서의 기준 좌표
        spriteOrigin: spriteOrigin, // 스트라이프 이미지 중 사용할 영역의 좌상단 좌표
        spriteSize: spriteImageSize // 스프라이트 이미지의 크기
      }
  );

  return markerImage;
}
