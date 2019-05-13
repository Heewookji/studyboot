var currCls = $('#dropdownMenuButton > span'),
    templateSrc = $('#view-template').html(); // script 태그에서 템플릿 데이터를 꺼낸다.

//Handlebars를 통해 템플릿 데이터를 가지고 최종 결과를 생성할 함수를 준비한다.
var trGenerator = Handlebars.compile(templateSrc);

  
  $.getJSON('../../app/json/inquiry/list?pageNo=' + pn + '&pageSize=' + pageSize
		  + '&pageCls=' + cls + "&keyword=" + keyword,
      tbody.html(''); // 이전에 출력한 내용을 제거한다.
      
      // 템플릿 엔진을 실행하여 tr 태그 목록을 생성한다. 그리고 바로 tbody에 붙인다.
      $(trGenerator(obj)).appendTo(tbody);
      
      $(document.body).trigger('loaded-list');
      
    }); // Bitcamp.getJSON()
  
$('.stdinqry-view-link').click((e) => {
	  e.preventDefault();
	  alert("!");
	});













