$('#add-btn').click(function() {
  jQuery.ajax({
     url:"../../app/json/study/add",
     type:"POST",
     data:  "name=" + encodeURIComponent($("#name").val()) +
            "&cls=" + encodeURIComponent($("#cls").val()) +  
            "&address=" + encodeURIComponent($("#address").val()) +
            "&goal=" + encodeURIComponent($("#goal").val()) +
            "&photo=" + encodeURIComponent($("#photo").val()) +
            "&day=" + encodeURIComponent($("#day").val()) +
            "&personnel=" + encodeURIComponent($("#personnel").val()) +
            "&startDate=" + encodeURIComponent($("#startDate").val()) +
            "&endDate=" + encodeURIComponent($("#endDate").val()) +
            "&contents=" + encodeURIComponent($("#contents").val()),
     contentType: "application/x-www-form-urlencoded",
     success: function(data) {
         if (data) {
             alert("저장되었습니다.");
             location.href = 'index.html';
         } else {
             alert("잠시 후에 시도해주세요.");
         }
     }
  });
}); // add-btn / 제이슨 형식으로 데이터 보내기 할때 오류발생해서 인코드URI 방식으로 보냈음


//뒤로가기 -진행중
// 생성 폼에서 입력받는 도중에 페이지 이동이 감지되면 작성중인 글이 있다는 알터창을 띄우고 싶은데
// if 문에서 해당 폼을 잡았는데 알터창이 뜨지 않음 -보류-
$(window).on('beforeunload', function() {
//  alert('okok')
  var el = $('.study-add-form input[type=text]');
  for (var e of el) {
    if ($(e).val().length > 0)
      return '작성 중인 글이 있습니다.';
  }
  
});




//$('#add-btn').click(function() {
//  jQuery.ajax({
//     url:"../../app/json/study/add",
//     type:"POST",
//     data: {"name" : $("#name").val(),
//            "cls" : $("#cls").val(),   
//            "address" : $("#address").val(),
//            "goal" : $("#goal").val(),
//            "photo" : $("#photo").val(),
//            "day" : $("#day").val(),
//            "personnel" : $("#personnel").val(),
//            "startDate" : $("#startDate").val(),
//            "endDate" : $("#endDate").val(),
//            "contents" : $("#contents").val()},
//     contentType: "application/x-www-form-urlencoded",
//     success: function(data) {
//         if (data) {
//             alert("저장되었습니다.");
//         } else {
//             alert("잠시 후에 시도해주세요.");
//         }
//     }
//  });
//}); // add-btn














