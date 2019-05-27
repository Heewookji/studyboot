document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'interaction', 'dayGrid' ],
    defaultDate: new Date(),
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    selectable: true,
    dateClick: function(info) {
      window.calInfo = info;
      //alert(info.dateStr);
      $(document.body).trigger('cal-dateClick');
    },
    events: [
      {
        title: 'ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ',
        start: '2019-05-03'
      },
      {
        title: 'Long Event',
        start: '2019-05-07',
        end: '2019-05-10'
      },
      {
        title: 'Long Event',
        start: '2019-06-07',
        end: '2019-06-10'
      }
      ]
  });

  calendar.render();
});

/* ------------------- */

$(document.body).bind('cal-dateClick', () => {
  $('#calendar-modal-btn').click();
  
});

$('#schedule-submit-btn').click(() => {
  alert("등록하시겠습니까?");
  $.ajax({
    url : "../../app/json/mystudycalendar/add",
    type : "post",
    data : {
      name: $('#schedule-name').val(), // 좌항은 프러퍼티명 , 우항은 프러퍼티에 담을 값
      scheduleStartDate: $('#schedule-sdt').val(),
      scheduleStartEnd: $('#schedule-edt').val(), // rating-form 태그의 값을 가져와서 담는다.
      memo: $('#scheduled-message').val(),
    },
    success : function(data) {
      alert("성공");
      location.reload();
    },
    error : function(request, status, error) {
      alert("등록에 실패 했습니다.");
    }
  });
});