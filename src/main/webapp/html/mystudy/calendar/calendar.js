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
      window.eventDate = info.event; // 클릭한 일정의 객체를 뽑아 넣음
      $('#calendar-detail-modal-btn').click();
      //$(document.body).trigger('eventClick'); // 디테일 모달을 띄우기 위한 트리거
      loadDetail(info.event.id);
      
    },
    dateClick: function(info) { // 달력의 날짜를 date라 한다. 날짜를 눌렀을때 일어나는 함수
      window.dateStr = info.dateStr;
      //alert(info.dateStr);
      //alert(info.date);
      window.calInfo = info;
      $(document.body).trigger('dateClick');
    },
    events:  '../../app/json/mystudyschedule/list'
  });
  calendar.render();
});

/* ------------------- */

// 날짜를 눌렀을때 일정을 추가할 수 있고, 선택한 날짜 자동으로 입력됨.
$(document.body).bind('dateClick', () => {
  $('#calendar-add-modal-btn').click();
  alert(window.dateStr);
  $('#schedule-sdt').attr("value", window.dateStr + 'T00:00'); // 클릭한 날짜 + 00시 00분 으로 초기 세팅
});


// 모달에서 등록을 눌렀을 때 실행되는 함수.
$('#schedule-submit-btn').click(() => {
  $.ajax({
    url : "../../app/json/mystudyschedule/add",
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
      //data.title 이 null이면 실패하도록 하고싶음..
      alert("일정이 등록 되었습니다.");
      location.reload();
      //$(calendarEl).fullCalendar("refetchEvents");
    },
    error : function(request, status, error) {
      alert("등록에 실패 했습니다.");
    }
  });
});

// 일정 디테일을 처리할 함수
$(document.body).bind('eventClick', () => {
    console.log(window.eventDate.id);
    console.log(window.eventDate.title);
    //loadDetail(info.event.id);
    $('#calendar-detail-modal-btn').click();
});

//일정 디테일을 처리할 함수
function loadDetail(no) {
  $.getJSON('../../app/json/mystudyschedule/detail?no=' + no, function(obj) {
    //alert('1'); // 현재 값 먼저 가져오고 디테일 모달 띄우는 상태
    
    console.log(obj); // 콘솔에 해당 키값의 디테일 값 잘 출력됨//exampleModalCenterTitle
    $('#exampleModalCenterTitle').html(obj.title);
    $('#event-detail').html(obj.memo);
  });
/*
  $.getJSON('../../app/json/inquiry/detail?no=' + no, function(obj) {

$(viewCls).html(obj.cls.name);
$(viewDate).html(obj.createdDate);

$(viewNo).val(obj.no);

$(viewInquiryText).html('문의   ' + obj.no + '번 '
+ '문의 회원   ' +obj.inquiryPerson.name +'님 '
+ '이메일 '+ obj.inquiryPerson.email
+ '가입일 ' +obj.inquiryPerson.registeredDate);

$(viewContents).html(obj.contents);

if(obj.suspectPerson){
    
 $(viewSuspectText).html('피신고 회원  ' +obj.suspectPerson.name+'님 '
+ '이메일 '+obj.suspectPerson.email
+ '가입일 ' +obj.suspectPerson.registeredDate);
 
} else{
  $(viewSuspectText).html('');
}

$(document.body).trigger('loaded-detail');
  });
*/
}
  
  










