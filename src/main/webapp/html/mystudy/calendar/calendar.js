var eventDate;

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
      window.eventDate = info.event; // 클릭한 이벤트의 키 값을 뽑아 넣음
      
      $(document.body).trigger('eventClick');
    },
    dateClick: function(info) { // 달력의 날짜를 date라 한다. 날짜를 눌렀을때 일어나는 함수
      window.dateStr = info.dateStr;
      //alert(info.dateStr);
      //alert(info.date);
      window.calInfo = info;
      $(document.body).trigger('dateClick');
    }, //url: '../../app/json/mystudycalendar/list',
    events:  '../../app/json/mystudycalendar/list'
  });
  calendar.render();
});

/* ------------------- */

// 날짜를 눌렀을때 일정을 추가할 수 있고, 선택한 날짜 자동으로 입력됨.
$(document.body).bind('dateClick', () => {
  $('#calendar-modal-btn').click();
  alert(window.dateStr);
  $('#schedule-sdt').attr("value", window.dateStr + 'T00:00');
});


// 모달에서 등록을 눌렀을 때 실행되는 함수.
$('#schedule-submit-btn').click(() => {
  $.ajax({
    url : "../../app/json/mystudycalendar/add",
    type : "post",
    data : {
      title: $('#schedule-name').val(), // 좌항은 프러퍼티명 , 우항은 프러퍼티에 담을 값
      studyNo: 1,
      memberNo: 2,
      start: $('#schedule-sdt').val(),
      end: $('#schedule-edt').val(), // rating-form 태그의 값을 가져와서 담는다.
      memo: $('#schedule-message').val(),
    },
    success : function(data) {
      alert("일정이 등록 되었습니다.");
      //location.reload();
      $(calendarEl).fullCalendar("refetchEvents");
    },
    error : function(request, status, error) {
      alert("등록에 실패 했습니다.");
    }
  });
});

$(document.body).bind('eventClick', () => {
    console.log(window.eventDate.id);
    console.log(window.eventDate.title);
    //    alert(window.eventDate);
});
  
  
  
