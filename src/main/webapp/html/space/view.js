var param = location.href.split('?')[1],
section = $('section'),
templateSrc = $('#div-template').html(),
trGenerator = Handlebars.compile(templateSrc),
i = 0;

if (param) {
  loadDetail(param.split('=')[1])
}

function loadDetail(no) {

  $.ajax({
    url : "../../app/json/space/detail?no=" + no,
    data : {name:'name', intro:'intro'},
    success : function(data) {
      $('#name').append(data.detail.name),
      $('#intro').append(data.detail.intro)
    },
    error : function(request, status, error) {
      alert("에러가 발생했습니다.");
    }
  });

  $.getJSON('../../app/json/space/detail?no=' + no, 
      function(obj) {

    $(trGenerator(obj)).appendTo(section);

  });

}
