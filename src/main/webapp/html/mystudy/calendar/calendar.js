var eventDate,
updateStartDate,
updateEndDate,
updateMemoDate,
updateTitleDate,
studyNo = location.href.split('=')[1],
calendarMemberList;

var attendTemplateSrc = $('#attend-member').html(),
attendGenerator = Handlebars.compile(attendTemplateSrc);


document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],
    locale: 'ko',
    defaultDate: new Date(),
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    selectable: true,
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    eventClick: function(info) { // event란? 일정 하나하나를 event라 한다. , 일정을 눌렀을때 일어나는 함수
      window.eventDate = info.event; // 클릭한 일정의 객체를 뽑아 넣음
      if(window.calendarContent === false) { // 스터디 장이 아니면 이벤트 버튼을 눌렀을 때 닫기 버튼만 보이기
        $('#calendar-detail-modal-btn').click();
        $('#event-review-btn').hide();
        //$('#event-attend-btn').hide();
        $('#event-update-btn').hide();
        $('#event-delete-btn').hide();

        $('#event-close-btn').show();
      } else { // 그 외의 회원일 경우 닫기 버튼만 안보이고 모든 버튼 보이기
        $('#calendar-detail-modal-btn').click();
        $('#event-review-btn').show();
        // $('#event-attend-btn').show();
        $('#event-update-btn').show();
        $('#event-delete-btn').show();

        $('#event-close-btn').hide();
      }

      loadDetail(info.event.id);
    },

    events:  '../../app/json/mystudyschedule/list?no=' + location.href.split('=')[1],
    eventSourceSuccess: function(content, xhr) {
      //console.log(content); // event 배열 목록이 출력됨
      console.log("스터디장? " + content[content.length-1]); // 배열의 마지막 방에는 boolean 값이 들어있다. 
      window.calendarContent = content[content.length-1]; // window.calendarContent에는 스터디장 유무가 들어있다.
      //loadList(studyNo); // 출석하기 호출
      return content.eventArray;
    },
    eventDragStop: function(event, jsEvent, ui, view) { // 드래그 & 드롭 못하게 막음
      //console.log(event.id); 
      if (isElemOverDiv(ui, $('div#delete-events'))) {
        calendar.fullCalendar('removeEvents', event.id); 
      } 
    },

    dateClick: function(info) { // 달력의 날짜를 date라 한다. 날짜를 눌렀을때 일어나는 함수

      $('#schedule-add-head').html('일정 등록');

      window.dateStr = info.dateStr;
      if(window.calendarContent === false){
        alert("스터디 장만 일정을 등록 할 수 있습니다.");
        return;
      }
      //alert(window.dateStr);
      $(document.body).trigger('dateClick');
    },
    eventColor: '#72c02c',
    eventTextColor: 'white'
  });
  calendar.render();
});

/* -------------------------------------------------------------------------------------------------------------------------------- */

//날짜를 눌렀을때 일정추가 모달 버튼이 눌려서, 일정을 추가할 수 있고, 선택한 날짜 자동으로 입력됨.
$(document.body).bind('dateClick', () => {
  $('#schedule-title').attr("value", "");
  $('#schedule-edt').attr("value", "");
  $('#schedule-memo').empty();

  $('#schedule-add-btn').show(); // 모달의 수정 버튼 보이게
  $('#schedule-update-btn').hide(); // 모달의 수정 버튼 숨김

  $('#calendar-add-modal-btn').click();
  $('#schedule-sdt').attr("value", window.dateStr + 'T00:00'); // 클릭한 날짜 + 00시 00분 으로 초기 세팅
});

//일정을 등록하는 버튼
$('#schedule-add-btn').click(() => {

  if($('#schedule-title').val().length === 0) {
    alert("일정 제목을 입력해 주세요.");
    return;
  } else if($('#schedule-sdt').val().length === 0) {
    alert("일정 시작일을 입력해 주세요.");
    return;
  } else if($('#schedule-edt').val().length === 0) {
    alert("일정 종료일을 입력해 주세요.");
    return;
  } else if($('#schedule-memo').val().length === 0) {
    alert("일정 내용을 입력해 주세요.");
    return;
  } 


  // 2019-05-12T00:00
  // 시작일과 종료일을 비교하기위해 input에 입력한 날짜 들을 잘라서 Int로 변환시킨다.
  var startDateTime = 
    parseInt($('#schedule-sdt').val().substring(0, 4) +
        $('#schedule-sdt').val().substring(5, 7) + 
        $('#schedule-sdt').val().substring(8, 10) +
        $('#schedule-sdt').val().substring(11, 13) + 
        $('#schedule-sdt').val().substring(14, 16));

  var endDateTime = 
    parseInt($('#schedule-edt').val().substring(0, 4) +
        $('#schedule-edt').val().substring(5, 7) + 
        $('#schedule-edt').val().substring(8, 10) +
        $('#schedule-edt').val().substring(11, 13) + 
        $('#schedule-edt').val().substring(14, 16));

  if(startDateTime >= endDateTime) {
    alert("시작일과 종료일을 확인 해 주세요");
    return;
  }

  $.ajax({
    url : "../../app/json/mystudyschedule/add",
    type : "post",
    data : {
      title: $('#schedule-title').val(), // 좌항은 프러퍼티명 , 우항은 프러퍼티에 담을 값
      studyNo: location.href.split('=')[1],
      start: $('#schedule-sdt').val(),
      end: $('#schedule-edt').val(), // rating-form 태그의 값을 가져와서 담는다.
      memo: $('#schedule-memo').val()
    },
    success : function(data) {
      console.log(data);
      alert(data.status);
      location.reload();
      //$(calendarEl).fullCalendar("refetchEvents");
    },
    error : function(request, status, error) {
      alert("등록에 실패 했습니다.");
    }
  });
});

//일정 디테일 출력을 처리할 함수
function loadDetail(no) {
  $.getJSON('../../app/json/mystudyschedule/detail?no=' + no, function(obj) {
    console.log(obj); // 콘솔에 해당 키값의 디테일 값 잘 출력됨

    updateStartDate = obj.start.substring(0, 10); // 업데이트때 사용할 년, 월, 일
    updateEndDate = obj.end.substring(0, 10); // 업데이트때 사용할 년, 월, 일

    var startM = obj.start.substring(5, 7); // 월
    var endM = obj.end.substring(5, 7); // 월
    var startD = obj.start.substring(8, 10); // 일
    var endD = obj.end.substring(8, 10); // 일
    var startT = obj.start.substring(11, 16); // 시간
    var endT = obj.end.substring(11, 16); // 시간

    updateMemoDate = obj.memo; 
    updateTitleDate = obj.title;

    $('#schedleDetailTitle').html(updateTitleDate);
    if(obj.start.substring(0, 10) === obj.end.substring(0, 10)) {
      $('#study-start-date').html(startM + "월" + startD + "일 " + startT + " ~ " + endT);
    } else {
      $('#study-start-date').html(startM + "월" + startD + "일 " + startT + " ~ " + endM + "월" + endD + "일 " + endT);
    }
    $('#event-detail').html(obj.memo);
  });
}

//일정 삭제하는 버튼updateMemoDate
$('#event-delete-btn').click(() => {

  if(window.calendarContent === false){
    alert("삭제 권한이 없습니다.");
    return;
  }

  if(confirm('정말 삭제 하시겠습니까?')) {
    $.getJSON('../../app/json/mystudyschedule/delete?eventNo=' + window.eventDate.id
        + '&studyNo=' + studyNo, 
        function(obj) {
      if (obj.status != 'success') {
        alert(obj.status)
      }
      location.reload();
    })
  }
});

//디테일에서 수정버튼 누르면 실행되는 곳. 
$('#event-update-btn').click(() => {

  if(window.calendarContent === false){
    alert("수정 권한이 없습니다.");
    return;
  }

  $('#schedule-add-head').html('일정 수정');

  $('#schedule-memo').empty(); // textarea(memo)에 누적이 안되게 일단 비워준다.

  resetForm();
  
  $('#schedule-update-btn').show(); // 모달의 수정 버튼 보이게
  $('#schedule-add-btn').hide(); // 모달의 등록 버튼 숨김

  $('#calendar-add-modal-btn').click(); // 수정하는 모달 띄움
  $('#event-close-btn').click(); // 디테일 모달 닫고,

//  $('#schedule-title').val(updateTitleDate); // 디테일에 있던 일정 이름 모달창으로 가져옴
  $('#schedule-title').attr("value", updateTitleDate); // 디테일에 있던 일정 이름 모달창으로 가져옴
  $('#schedule-sdt').attr("value", updateStartDate + 'T00:00');
  $('#schedule-edt').attr("value", updateEndDate + 'T00:00');
  $('#schedule-memo').append(updateMemoDate); // 디테일에 있던 일정 내용 모달창으로 가져옴
});


$('#schedule-update-btn').click(() => {

  if($('#schedule-title').val().length === 0) {
    alert("일정 제목을 입력해 주세요.");
    return;
  } else if($('#schedule-sdt').val().length === 0) {
    alert("일정 시작일을 입력해 주세요.");
    return;
  } else if($('#schedule-edt').val().length === 0) {
    alert("일정 종료일을 입력해 주세요.");
    return;
  } else if($('#schedule-memo').val().length === 0) {
    alert("일정 내용을 입력해 주세요.");
    return;
  } 

  // 2019-05-12T00:00
  // 시작일과 종료일을 비교하기위해 input에 입력한 날짜 들을 잘라서 Int로 변환시킨다.
  var startDateTime = parseInt($('#schedule-sdt').val().substring(0, 4) +
      $('#schedule-sdt').val().substring(5, 7) + $('#schedule-sdt').val().substring(8, 10) +
      $('#schedule-sdt').val().substring(11, 13) +  $('#schedule-sdt').val().substring(14, 16));

  var endDateTime = parseInt($('#schedule-edt').val().substring(0, 4) +
      $('#schedule-edt').val().substring(5, 7) + $('#schedule-edt').val().substring(8, 10) +
      $('#schedule-edt').val().substring(11, 13) +  $('#schedule-edt').val().substring(14, 16));

  if(startDateTime >= endDateTime) {
    alert("시작일과 종료일을 확인 해 주세요");
    return;
  }

  if(window.calendarContent === false){
    alert("수정 권한이 없습니다.");
    return;
  }

  $.ajax({
    url : "../../app/json/mystudyschedule/update",
    type : "post",
    data : {
      id: window.eventDate.id,
      title: $('#schedule-title').val(), // 좌항은 프러퍼티명 , 우항은 프러퍼티에 담을 값
      studyNo: location.href.split('=')[1],
      start: $('#schedule-sdt').val(),
      end: $('#schedule-edt').val(), // rating-form 태그의 값을 가져와서 담는다.
      memo: $('#schedule-memo').val()
    },
    success : function(data) {

      alert(data.status);
      location.reload();
      //$(calendarEl).fullCalendar("refetchEvents");
    },
    error : function(request, status, error) {
      alert("일정 변경에 실패 했습니다.");
    }
  });
});


$('.schedule-close-btn').click(() => {
  $('#schedul-submit-form')[0].reset();
});

function resetForm() {
  $('#schedul-submit-form')[0].reset();
};

//JSON 형식의 데이터 목록 가져오기 (이미지 사진 + 멤버 리스트), 출석 모달창에 멤버 리스트 입력
(function (studyNo) {
  $.getJSON('../../app/json/MyStudy/studyphoto?no=' + studyNo,
      function(obj) {

    calendarMemberList = obj.list;
    $(attendGenerator(obj)).appendTo('#study-list-modal');
  });
}(studyNo));


/* ------------------------------------------------ 출 석 ------------------------------------------------ */

//디테일에서 출석 버튼 누를때.
$('#event-attend-btn').click(() => {

  $('#calendar-attendance-modal-btn').click(); // 출석 모달 띄우기

  $.getJSON('../../app/json/mystudyschedule/attendTrueFalse?scheduleNo=' + window.eventDate.id,
      function(obj) {

    if (obj.attend) { // 해당 일정에 대해 출석을 한 적이 있으면 출석체크 모달에서 출석 버튼 숨기기
      $('#attend-btn').hide();
      $('#attend-head').html('출석 확인');
      $('.attend-check').attr("onclick", "return false");
      //onclick="return false;" 
    } else {
      $('#attend-btn').show();
      $('#attend-head').html('출석 체크');
      $('.attend-check').attr("onclick", "return true");
    }

    // 체크박스 모두 false로 초기화
    for (var j = 0; j < calendarMemberList.length; j ++) {
      $("#calmember"+calendarMemberList[j].memberNo).attr("checked", false);
    }

    // 출석체크를 했던 일정일 경우 출석 한 인원만 체크되게.
    for (var i = 0; i < obj.attendNickName.length; i++) {

      for (var j = 0; j < calendarMemberList.length; j ++) {

        if (obj.attendNickName[i].nickName === calendarMemberList[j].member.nickName) {
          console.log("출석한사람"+calendarMemberList[j].memberNo);
          $("#calmember"+calendarMemberList[j].memberNo).attr("checked", true);
        }
      }
    }

  })

});

//닉네임을 서버로 보내서 멤버 id로 바꾸고 그것으로 출석을 하는 클릭 이벤트
$('#attend-btn').click(() => {

  if(window.calendarContent === false){
    alert("출석 권한이 없습니다.");
    return;
  }

  var nickNames = [];
  $("input[name=attend-check]:checked").each(function() {
    nickNames.push($(this).val()); 
  });

  console.log(nickNames);

  $.getJSON('../../app/json/mystudyschedule/attend?nickNames=' + nickNames
      + '&studyNo=' + location.href.split('=')[1] + '&scheduleNo=' + window.eventDate.id,
      function(obj) {
    alert(obj.status);
    location.reload();
  })

});


$('.attend-close').click(() => {
  $('#event-close-btn').click();
});










