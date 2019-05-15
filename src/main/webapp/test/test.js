

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
	plugins : [ 'dayGrid', 'interaction'],
	selectable: true,
	dateClick: function(info) {
	    $("#cal-btn").click();
	}
    });
    calendar.render();
    $(document.body).trigger('loaded-cal');
});

$(document.body).bind('loaded-cal', () => {
    
    $('#inqryPage').click((e) => {
	$('cal-btn').attr('data-toggle', 'modal');
	});
    
});