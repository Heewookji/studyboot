var pageNo = 1,
pageSize = 6,
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
	
	tbody.html('');
	
	if(obj.pageNo != 0){
	    
	pageNo = obj.pageNo;

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
	    
	} else{
	    currSpan.html(obj.pageNo);
	    prevPageLi.addClass('disabled');
	    nextPageLi.addClass('disabled');
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

$(document.body).bind('loaded-list', () => {

    $('#inqryForm-btn').click((e) => {
	$('.sspctForm-Format').addClass('std-invisible');
	$('#inqryName').html("홍길동");
	$('#formTitle').html($('#inqryName').html() +"님  문의"+ " 내용을 적어주세요");
	$('#sspctName').val("");
	$('#inqryNo').val(1);
	$('#sspctNo').val(0);
	$('#inqryClsNo').val(1);
    });

    $('.sspctForm-btn').click((e) => {
	$('.sspctForm-Format').removeClass('std-invisible');
	$('#inqryName').html("홍길동");
	$('#formTitle').html($('#inqryName').html() +"님  신고"+ " 내용을 적어주세요");
	$('#sspctName').html($(e.target).attr('data-content'));
	$('#inqryNo').val(1);
	$('#sspctNo').val($(e.target).attr('data-no'));
	$('#inqryClsNo').val(2);
    });
});



$('#inqryAdd-btn').click((e) => {
    $.ajax({
	url:'../../app/json/inquiry/add',
	type: 'post',
	dataType: 'text',
	data: {
	    clsNo: $(inqryClsNo).val(),
	    contents:$(inqryContents).val(),
	    inquiryPersonNo: $(inqryNo).val(),
	    suspectPersonNo: $(sspctNo).val()
	},
	success: function(data){
	    var obj = JSON.parse(data);
	    location.reload();
	}
    });

});








