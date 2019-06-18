var updateStartDate,
updateEndDate,
updateMemoDate,
updateTitleDate,
studyNo = location.href.split('=')[1],
calendarMemberList;



document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('sb-calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],
    locale: 'ko',
    defaultDate: new Date(),
    eventLimit: true, // allow "more" link when too many events
    editable: false,
    selectable: false,
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    eventClick: function(info) { // event란? 일정 하나하나를 event라 한다. , 일정을 눌렀을때 일어나는 함수
      $('#schdulDetailModal').modal('show');
      loadDetail(info.event.id);
    },

    events: '../../app/json/mystudyschedule/allSchedules',
    eventColor: '#72c02c',
    eventTextColor: 'white'
  });
  calendar.render();
});

/* -------------------------------------------------------------------------------------------------------------------------------- */


//일정 디테일 출력을 처리할 함수
function loadDetail(no) {
  $.getJSON('../../app/json/mystudyschedule/detail?no=' + no, function(obj) {

    var startM = obj.start.substring(5, 7); // 월
    var endM = obj.end.substring(5, 7); // 월
    var startD = obj.start.substring(8, 10); // 일
    var endD = obj.end.substring(8, 10); // 일
    var startT = obj.start.substring(11, 16); // 시간
    var endT = obj.end.substring(11, 16); // 시간

    $('#schedleDetailTitle').html(obj.title);
    $('#event-detail').html(obj.memo);
    if(obj.start.substring(0, 10) === obj.end.substring(0, 10)) {
      $('#study-start-date').html(startM + "월" + startD + "일 " + startT + " ~ " + endT);
    } else {
      $('#study-start-date').html(startM + "월" + startD + "일 " + startT + " ~ " + endM + "월" + endD + "일 " + endT);
    }
  });
}








