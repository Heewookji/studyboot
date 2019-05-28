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
      $(document.body).trigger('cal-dateClick');
    }, //url: '../../app/json/mystudycalendar/list',
    events: {
      url: '/studyboot/app/json/mystudycalendar/list'
    }
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
      studyNo: 1,
      memberNo: 2,
      scheduleStartDate: $('#schedule-sdt').val(),
      scheduleStartEnd: $('#schedule-edt').val(), // rating-form 태그의 값을 가져와서 담는다.
      memo: $('#schedule-message').val(),
    },
    contentType: "application/x-www-form-urlencoded",
    success : function(data) {
      alert("성공");
      location.reload();
    },
    error : function(request, status, error) {
      alert("등록에 실패 했습니다.");
    }
  });
});