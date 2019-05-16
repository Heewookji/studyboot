
function loadBookedInfo(spaceNo, date) {

    $.getJSON('../app/json/spaceroombooking/listbooked?spaceNo=' + spaceNo + "&date=" + date, function(obj) {

	for (l of obj.list){
	    console.log(l.roomNo);
	    console.log(l.bookingStartDate);
	}

	$(document.body).trigger('loaded-listbooked');
    });

}


$(document).on('DOMContentLoaded', function (e) {

    var calendarEl = document.getElementById('calendar');
    window.calendar = new FullCalendar.Calendar(calendarEl, {
	plugins : [ 'dayGrid', 'interaction'],
	selectable: true,
	dateClick: function(info) {
	    window.calInfo = info;
	    $(document.body).trigger('cal-dateClick');
	}
    });
});

$('#calModal').on('shown.bs.modal', function (e) {
    window.calendar.render();
    $(document.body).trigger('loaded-cal');
});


//$("#calendar").fullCalendar({
//	
//	dayClick: function() {
//    },
//    weekends: false,
//    showNonCurrentDates: false,
//    locale: 'pt-br',
//    render: true
//});
//
//$(".ui .full-calendar").addClass('modal');
    


$(document.body).bind('cal-dateClick', () => {

    var list = new Array();



    $(".cal-time").each(function(index, item){
	list.push($(item).text());
    });


    loadBookedInfo(101, window.calInfo.dateStr);


    for (l of list) {

    }


});