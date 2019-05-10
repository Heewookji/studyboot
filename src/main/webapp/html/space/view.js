var div = $('div'),
templateSrc = $('#div-template').html(),
trGenerator = Handlebars.compile(templateSrc),
param = location.href.split('?')[1];

if (param) {
	loadDetail(param.split('=')[1])
}

function loadDetail(no) {

  $.getJSON('../../app/json/space/detail?no=' + no,
      function(obj) {

    $(trGenerator(obj)).appendTo(div);

  });
}