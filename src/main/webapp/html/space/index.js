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
completedAddresses = new Array();

//JSON 형식의 데이터 목록 가져오기
function loadList() {

  $.getJSON('../../app/json/space/list', 
      function(obj) {
    spaceObj = obj.list;

    console.log(spaceObj);

    $(trGenerator(obj)).appendTo('#list');

    $(document.body).trigger('loaded-list');
  }); // Bitcamp.getJSON()
} // loadList()

loadList();

$(document.body).bind('loaded-list', () => {

  loadAddress(spaceObj);

  $('.space-view-link').click((e) => {
    // e.preventDefault();

    // location은 페이지 로딩과 관련되어 쓰인다.
    window.location.href = 'view.html?no=' + $(e.target).attr('space-no');
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadAddress (spaceObj) {
  for(var i = 0; i < spaceObj.length; i++) {
    geocoder.addressSearch(spaceObj[i].completedAddress, function(result, status) {

      // 정상적으로 검색이 완료됐으면 
      if (status === daum.maps.services.Status.OK) {

        var coords = new daum.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new daum.maps.Marker({
          map: map,
          position: coords
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new daum.maps.InfoWindow({
          content: '<div style="width:150px;text-align:center;padding:6px 0;">'+ spaceObj[0].name +'</div>'
        });
        infowindow.open(map, marker);
      } 
    });
  }
}

// 현재 위치를 가져오는 메서드
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

