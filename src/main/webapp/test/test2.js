
//캘린더 초기설정
$(document).on('DOMContentLoaded', function (e) { 
    var calendarEl = document.getElementById('calendar');
    window.calendar = new FullCalendar.Calendar(calendarEl, {
	plugins: [ 'dayGrid' ],
	events: '/studyboot/app/json/schedule/list'
    });
    
    
    calendar.render();
    
});





