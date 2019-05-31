var eventDate,
updateStartDate,
updateEndDate,
updateMemoDate,
updateTitleDate;

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'interaction', 'dayGrid' ],
    locale: 'ko',
    defaultDate: new Date(),
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    selectable: true,
    eventClick: function(info) { // event란? 일정 하나하나를 event라 한다. , 일정을 눌렀을때 일어나는 함수
      window.eventDate = info.event; // 클릭한 일정의 객체를 뽑아 넣음

      if(window.calendarContent === false) { // 스터디 장이 아니면 이벤트 버튼을 눌렀을 때 닫기 버튼만 보이기
        $('#calendar-detail-modal-btn').click();
        $('#event-review-btn').hide();
        $('#event-attend-btn').hide();
        $('#event-update-btn').hide();
        $('#event-delete-btn').hide();
        
        $('#event-close-btn').show();
      } else { // 그 외의 회원일 경우 닫기 버튼만 안보이고 모든 버튼 보이기
        $('#calendar-detail-modal-btn').click();
        $('#event-review-btn').show();
        $('#event-attend-btn').show();
        $('#event-update-btn').show();
        $('#event-delete-btn').show();

        $('#event-close-btn').hide();
      }

      loadDetail(info.event.id);
    },
    
    events:  '../../app/json/mystudyschedule/list?no=' + location.href.split('=')[1].substring(0,1),
    eventSourceSuccess: function(content, xhr) {
      console.log(content); // event 배열 목록이 출력됨
      console.log(content[content.length-1]); // 배열의 마지막 방에는 boolean 값이 들어있다. 
      window.calendarContent = content[content.length-1]; // window.calendarContent에는 스터디장 유무가 들어있다.
      return content.eventArray;
    },
    
    dateClick: function(info) { // 달력의 날짜를 date라 한다. 날짜를 눌렀을때 일어나는 함수
      window.dateStr = info.dateStr;
      if(window.calendarContent === false){
        alert("스터디 장만 일정을 등록 할 수 있습니다.");
        return;
      }
      //alert(window.dateStr);
      $(document.body).trigger('dateClick');
    }
  });
  calendar.render();
});

//날짜를 눌렀을때 일정추가 모달 버튼이 눌려서, 일정을 추가할 수 있고, 선택한 날짜 자동으로 입력됨.
$(document.body).bind('dateClick', () => {
  //$('#schedule-title').empty();
  //$('#schedule-title').value=null;
  //$('#schedule-title').val("");
  $('#schedule-title').attr("value", "");
  $('#schedule-edt').attr("value", "");
  $('#schedule-memo').empty();

  $('#schedule-add-btn').show(); // 모달의 수정 버튼 보이게
  $('#schedule-update-btn').hide(); // 모달의 수정 버튼 숨김

  //$('schedule-update-btn').attr("hidden", hidden);
  $('#calendar-add-modal-btn').click();
  $('#schedule-sdt').attr("value", window.dateStr + 'T00:00'); // 클릭한 날짜 + 00시 00분 으로 초기 세팅
});
/* --------------------------------------------------------------------------------------------- */

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

  $.ajax({
    url : "../../app/json/mystudyschedule/add",
    type : "post",
    data : {
      title: $('#schedule-title').val(), // 좌항은 프러퍼티명 , 우항은 프러퍼티에 담을 값
      studyNo: location.href.split('=')[1].substring(0,1),
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
    var startD = obj.start.substring(8, 10); // 일
    var endM = obj.end.substring(5, 7); // 월
    var endD = obj.end.substring(8, 10); // 일
    var startT = obj.start.substring(11, 16); // 시간
    var endT = obj.end.substring(11, 16); // 시간

    updateMemoDate = obj.memo; 
    updateTitleDate = obj.title;

    $('#exampleModalCenterTitle').html(obj.title + " ");
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
    $.getJSON('../../app/json/mystudyschedule/delete?no=' + window.eventDate.id,
        function(obj) {
      location.reload();
    })
  }
});

/* ------------------------------------------------------------------------------------------------ */
//디테일에서 수정버튼 누르면 실행되는 곳. 
$('#event-update-btn').click(() => {

  if(window.calendarContent === false){
    alert("수정 권한이 없습니다.");
    return;
  }

  $('#schedule-memo').empty(); // textarea(memo)에 누적이 안되게 일단 비워준다.

  resetForm();
  $('#schedule-update-btn').show(); // 모달의 수정 버튼 보이게
  $('#schedule-add-btn').hide(); // 모달의 등록 버튼 숨김

  $('#calendar-detail-close-modal-btn').click(); // 디테일 모달 닫고,
  $('#calendar-add-modal-btn').click(); // 수정하는 모달 띄움

  //$('#schedule-title').val(updateTitleDate); // 디테일에 있던 일정 이름 모달창으로 가져옴
  $('#schedule-title').attr("value", updateTitleDate); // 디테일에 있던 일정 이름 모달창으로 가져옴
  $('#schedule-sdt').attr("value", updateStartDate + 'T00:00');
  $('#schedule-edt').attr("value", updateEndDate + 'T00:00');
  $('#schedule-memo').append(updateMemoDate); // 디테일에 있던 일정 내용 모달창으로 가져옴
});


$('#schedule-update-btn').click(() => {

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
      //data.title 이 null이면 실패하도록 하고싶음..
      alert(data.status);
      location.reload();
      //$(calendarEl).fullCalendar("refetchEvents");
    },
    error : function(request, status, error) {
      alert("일정 변경에 실패 했습니다.");
    }
  });
});


$('#schedule-close-btn').click(() => {
  $('#schedul-submit-form')[0].reset();
});

function resetForm() {
  $('#schedul-submit-form')[0].reset();
};



//리더값을 받아오기 위한 리스트.
function loadList() {

  $.getJSON('../../app/json/mystudyschedule/update',
      function(obj) {

  });

}
