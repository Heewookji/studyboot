$('#add-btn').click = () => {
  $.ajax({
    url : "../../app/json/space/detail?no=" + no,
    data : {name:'name', intro:'intro'},
    success : function(data) {
      console.log(data.detail);
      $('#name').append(data.detail.name),
      $('#intro').append(data.detail.intro)
    },
    error : function(request, status, error) {
      alert("에러가 발생했습니다.");
    }
  });
};