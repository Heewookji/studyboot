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
}); // add-btn


//뒤로가기 -진행중
//$(window).on('beforeunload', function() {
//  if ($('.aaaa').val()) {
//    return '작성 중인 글이 있습니다.';
//  }
//});




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














