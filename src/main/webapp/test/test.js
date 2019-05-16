var pageNo = 1,
pageSize = 6;

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

function loadListLarge(pn) {
    
    $.getJSON('../app/json/study/list?pageNo=' + pn + '&pageSize=' + pageSize + '&clsNo=' + 11,
	    function(obj) {
	if (pageNo == obj.totalPage) {
	    return;
	}
	// 서버에 받은 데이터 중에서 페이지 번호를 글로벌 변수에 저장한다.
	pageNo = obj.pageNo;
	console.log(obj);
	// 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
	$(document.body).trigger('loaded-list');
	
    });
};


$('#add-btn').click(function() {
    loadListLarge(pageNo);
});