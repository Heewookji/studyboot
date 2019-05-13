var pageNo = 1,
pageSize = 3,
tbody = $('tbody'),
prevPageLi = $('#prevPage'),
nextPageLi = $('#nextPage'),
currSpan = $('#currPage > span'),
currCls = $('#dropdownMenuButton > span'),
keyword = $("#inqry-search").val(),
templateSrc = $('#tr-template').html(); // script 태그에서 템플릿 데이터를 꺼낸다.

var trGenerator = Handlebars.compile(templateSrc);

function loadList(pn, cls, keyword) {

    $.getJSON('../../app/json/inquiry/list?pageNo=' + pn + '&pageSize=' + pageSize
	    + '&pageCls=' + cls + "&keyword=" + keyword,
	    function(obj) {
	pageNo = obj.pageNo;

	// TR 태그를 생성하여 테이블 데이터를 갱신한다.
	tbody.html(''); // 이전에 출력한 내용을 제거한다.

	// 템플릿 엔진을 실행하여 tr 태그 목록을 생성한다. 그리고 바로 tbody에 붙인다.
	$(trGenerator(obj)).appendTo(tbody);

	// 현재 페이지의 번호를 갱신한다.
	currSpan.html(String(pageNo));

	// 1페이지일 경우 버튼을 비활성화 한다.
	if (pageNo == 1) {
	    prevPageLi.addClass('disabled');
	} else {
	    prevPageLi.removeClass('disabled');
	} 

	// 마지막 페이지일 경우 버튼을 비활성화 한다.
	if (pageNo == obj.totalPage) {
	    nextPageLi.addClass('disabled');
	} else {
	    nextPageLi.removeClass('disabled');
	}

	// 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
	$(document.body).trigger('loaded-list');

    }); // Bitcamp.getJSON()

} // loadList()


$('#prevPage > a').click((e) => {
    e.preventDefault();
    loadList(pageNo - 1, currCls.html(), keyword);
});

$('#nextPage > a').click((e) => {
    e.preventDefault();
    loadList(pageNo + 1, currCls.html(), keyword);
});

$('#bothClsPage').click((e) => {
    e.preventDefault();
    currCls.html("모두");
    keyword = '';
    loadList(1);
});

$('#inqryPage').click((e) => {
    e.preventDefault();
    currCls.html("문의");
    keyword = '';
    loadList(1, "문의");
});
$('#sspctPage').click((e) => {
    e.preventDefault();
    currCls.html("신고");
    keyword = '';
    loadList(1, "신고");
});

$('#inqry-search-btn').click((e) => {

    keyword = $("#inqry-search").val();
    loadList(1, currCls.html(), keyword);
});

loadList(1);

$('#addForm-btn').click((e) => {
    $.ajax({
	url:'../../app/json/inquiry/add',
	type: 'post',
	dataType: 'text',
	data: {
	    clsNo: 2,
	    inquiryPersonNo:4,
	    contents:"add test !!!"
	},
	success: function(data){

	    var obj = JSON.parse(data);
	    alert(obj.status);
	}
    });
});




