
$(document).on('DOMContentLoaded', function (e) {

    var calendarEl = document.getElementById('calendar');
    window.calendar = new FullCalendar.Calendar(calendarEl, {
	plugins : [ 'dayGrid', 'interaction'],
	selectable: true,
	dateClick: function(info) {
	    $(document.body).trigger('cal-dateClick');
	}
    });
});

$('#calModal').on('shown.bs.modal', function (e) {
    window.calendar.render();
	$('#calModal').removeClass("invisible");
    $(document.body).trigger('loaded-cal');
});

$(document.body).bind('cal-dateClick', () => {
    
    var list = new Array();
    
    $(".cal-time").each(function(index, item){
	   list.push($(item).text());
    });
    
    
    
    
    
    
    for (l of list) {
	
    }
    

});