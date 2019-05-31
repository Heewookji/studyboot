var param = location.href.split('?')[1],
ratingForm = $("#rating-form"),
reviewForm = $("#review-form"),
reviewUpdateForm = $("#review-update-form"),
ratingUpdateForm = $("#rating-update-form"),
spaceName = $('#space-name'),
i = 0,
updateNo, // 리뷰 수정 시 모달 폼에게 key값 전달하기 위한 변수
spaceNo;

if (param) {
	spaceNo = param.split('=')[1];
	loadDetail(spaceNo)
}

//겟 방식은 getJson으로 처리하고
//post 방식은 get방식과 post방식 모두 처리 할 수 있다. (보통 post로 씀)
function loadDetail(no) {

	$.ajax({
		// json/space/detail이 붙은 controller로 이동하고 ?(물음표) 뒤에 값은 파라미터 값으로 보내준다. 
		// + 이후에 있는 no는 controller의 파라미터 명이다.
		url : "../../app/json/space/detail?no=" + no,
		data : {name:'name', intro:'intro', tel:'tel'},
		success : function(data) {
			console.log(data);
			window.loginNo = data.loginNo;
			$('#spaceName').append(data.detail.name),
			$('#intro').append(data.detail.intro),
			$('#tel').append(data.detail.tel)
			
		},
		error : function(request, status, error) {
			alert("에러가 발생했습니다.");
		}
	});

	$.getJSON('../../app/json/space/detail?no=' + no, 
			function(obj) {

		$.each(obj.detail.spaceConvenienceInfos, function (index, value) {
			switch (value.convenienceNo) {

			case 1 : $('<span id="'+value.convenienceNo+'" tooltip="'+value.note+'" class="u-icon-v1 u-icon-shadow--hover g-rounded-3 g-font-size-30 g-mr-15 g-mb-15"><i data-no="'+value.convenienceNo+'" class="icon-hotel-restaurant-047 u-line-icon-pro"></i></span></span>').appendTo('#convDiv'); break;
			case 2 : $('<span id="'+value.convenienceNo+'" tooltip="'+value.note+'" class="u-icon-v1 u-icon-shadow--hover g-rounded-3 g-font-size-30 g-mr-15 g-mb-15"><i data-no="'+value.convenienceNo+'" class="icon-education-122 u-line-icon-pro"></i></span>').appendTo('#convDiv'); break;
			case 3 : $('<span id="'+value.convenienceNo+'" tooltip="'+value.note+'" class="u-icon-v1 u-icon-shadow--hover g-rounded-3 g-font-size-30 g-mr-15 g-mb-15"><i data-no="'+value.convenienceNo+'" class="icon-hotel-restaurant-053 u-line-icon-pro"></i></span>').appendTo('#convDiv'); break;
			case 4 : $('<span id="'+value.convenienceNo+'" tooltip="'+value.note+'" class="u-icon-v1 u-icon-shadow--hover g-rounded-3 g-font-size-30 g-mr-15 g-mb-15"><i data-no="'+value.convenienceNo+'" class="icon-hotel-restaurant-171 u-line-icon-pro"></i></span>').appendTo('#convDiv'); break;
			case 5 : $('<span id="'+value.convenienceNo+'" tooltip="'+value.note+'" class="u-icon-v1 u-icon-shadow--hover g-rounded-3 g-font-size-30 g-mr-15 g-mb-15"><i data-no="'+value.convenienceNo+'" class="icon-hotel-restaurant-018 u-line-icon-pro"></i></span>').appendTo('#convDiv'); break;
			case 6 : $('<span id="'+value.convenienceNo+'" tooltip="'+value.note+'" class="u-icon-v1 u-icon-shadow--hover g-rounded-3 g-font-size-30 g-mr-15 g-mb-15"><i data-no="'+value.convenienceNo+'" class="icon-hotel-restaurant-085 u-line-icon-pro"></i></span>').appendTo('#convDiv'); break;
			case 7 : $('<span id="'+value.convenienceNo+'" tooltip="'+value.note+'" class="u-icon-v1 u-icon-shadow--hover g-rounded-3 g-font-size-30 g-mr-15 g-mb-15"><i data-no="'+value.convenienceNo+'" class="icon-communication-053 u-line-icon-pro"></i></span>').appendTo('#convDiv'); break;
			case 8 : $('<span id="'+value.convenienceNo+'" tooltip="'+value.note+'" class="u-icon-v1 u-icon-shadow--hover g-rounded-3 g-font-size-30 g-mr-15 g-mb-15"><i data-no="'+value.convenienceNo+'" class="icon-education-024 u-line-icon-pro"></i></span>').appendTo('#convDiv'); break;
			case 9 : $('<span id="'+value.convenienceNo+'" tooltip="'+value.note+'" class="u-icon-v1 u-icon-shadow--hover g-rounded-3 g-font-size-30 g-mr-15 g-mb-15"><i data-no="'+value.convenienceNo+'" class="icon-communication-030 u-line-icon-pro"></i></span>').appendTo('#convDiv'); break;
			case 10 : $('<span id="'+value.convenienceNo+'" tooltip="'+value.note+'" class="u-icon-v1 u-icon-shadow--hover g-rounded-3 g-font-size-30 g-mr-15 g-mb-15"><i data-no="'+value.convenienceNo+'" class="icon-communication-077 u-line-icon-pro"></i></span>').appendTo('#convDiv'); break;
			case 11 : $('<span id="'+value.convenienceNo+'" tooltip="'+value.note+'" class="u-icon-v1 u-icon-shadow--hover g-rounded-3 g-font-size-30 g-mr-15 g-mb-15"><i data-no="'+value.convenienceNo+'" class="icon-communication-066 u-line-icon-pro"></i></span>').appendTo('#convDiv'); break;
			case 12 : $('<span id="'+value.convenienceNo+'" tooltip="'+value.note+'" class="u-icon-v1 u-icon-shadow--hover g-rounded-3 g-font-size-30 g-mr-15 g-mb-15"><i data-no="'+value.convenienceNo+'" class="icon-electronics-011 u-line-icon-pro"></i></span>').appendTo('#convDiv'); break;
			}
		});

		var templateTag = $('#div-tag').html();
		var trTagGenerator = Handlebars.compile(templateTag);
		$(trTagGenerator(obj)).appendTo($(tag));

//		var templateSpacePhoto = $('#div-spacePhoto').html();
//		var trSpacePhotoGenerator = Handlebars.compile(templateSpacePhoto);
//		$(trSpacePhotoGenerator(obj)).appendTo($(filePath));

//		var templateRoomInfo = $('#div-roomInfo').html();
//		var trRoomInfoGenerator = Handlebars.compile(templateRoomInfo);
//		$(trRoomInfoGenerator(obj)).appendTo($(roomInfo));

		var templateSpaceReview = $('#div-spaceReview').html();
		var trSpaceReviewGenerator = Handlebars.compile(templateSpaceReview);
		$(trSpaceReviewGenerator(obj)).appendTo($(spaceReview));
		
		$(document.body).trigger('loaded-detail'); // trigger가 'loaded-detail'을 실행 시킨다.
		// trigger와 bind는 세트!!
	});
}

$('#review-add-btn').click(() => {
	$('#add-form')[0].reset();
	
	$('#star0.5').click( () => {
		ratingForm.attr("data-value", "0.5");
	});
	$('#star1').click( () => {
		ratingForm.attr("data-value", "1");
	});
	$('#star1.5').click( () => {
		ratingForm.attr("data-value", "1.5");
	});
	$('#star2').click( () => {
		ratingForm.attr("data-value", "2");
	});
	$('#star2.5').click( () => {
		ratingForm.attr("data-value", "2.5");
	});
	$('#star3').click( () => {
		ratingForm.attr("data-value", "3");
	});
	$('#star3.5').click( () => {
		ratingForm.attr("data-value", "3.5");
	});
	$('#star4').click( () => {
		ratingForm.attr("data-value", "4");
	});
	$('#star4.5').click( () => {
		ratingForm.attr("data-value", "4.5");
	});
	$('#star5').click( () => {
		ratingForm.attr("data-value", "5");
	});
});

//$('#add-btn').click( function() {
$('#add-btn').click( () => {

	$.ajax({
		url : "../../app/json/space/add/review",
		type : "POST",
		data : {
			spaceNo: spaceNo,
			rating: $(ratingForm).attr("data-value"), // rating-form 태그의 값을 가져와서 담는다.
			review: $(reviewForm).val()
		},
		success : function(data) {
			location.reload();
		},
		error : function(request, status, error) {
			alert("등록에 실패 했습니다.");
		}
	});
});

//handlebars가 비동기 방식이라 trigger, bind 사용
$(document.body).bind('loaded-detail', () => { // trigger가 loaded-detail이라는 이름을 갖는 bind를 실행시킨다.

	$('#convDiv i').mouseenter((e) => {
		var noteId = $(e.target).attr('data-no');
		  $('#'+noteId+'').css('visibility', 'visible');
		
//		$('#').css('visibility', 'visible');
//		$('.convNote').css('visibility', 'visible');
	}).mouseleave(() => {
		$('.convNote').css('visibility', 'hidden');
  });
	
	$('.btns[member-no='+window.loginNo+']').css('visibility', 'visible');
	
	$('.delete-review').click((e) => {
		if ( confirm('정말 삭제하시겠습니까?') ) {
			$.ajax({
				url : "../../app/json/space/delete/review",
				type : "GET",
				data : {
					// $(e.target).attr('review-no')는 review-no의 값을 가져온다.
					no : $(e.target).attr('review-no')
				},
				success : function() {
					location.reload();
				},
				error : function(request, status, error) {
					alert('삭제 실패');
				}
			})
		}
	});


	
	$('.review-update-btn').click((e) => {
		
		$('#update-form')[0].reset();
		
		updateNo = $(e.target).attr('review-no');
		
		$('#upd-star0.5').click( () => {
			ratingUpdateForm.attr("data-value", "0.5");
		});
		$('#upd-star1').click( () => {
			ratingUpdateForm.attr("data-value", "1");
		});
		$('#upd-star1.5').click( () => {
			ratingUpdateForm.attr("data-value", "1.5");
		});
		$('#upd-star2').click( () => {
			ratingUpdateForm.attr("data-value", "2");
		});
		$('#upd-star2.5').click( () => {
			ratingUpdateForm.attr("data-value", "2.5");
		});
		$('#upd-star3').click( () => {
			ratingUpdateForm.attr("data-value", "3");
		});
		$('#upd-star3.5').click( () => {
			ratingUpdateForm.attr("data-value", "3.5");
		});
		$('#upd-star4').click( () => {
			ratingUpdateForm.attr("data-value", "4");
		});
		$('#upd-star4.5').click( () => {
			ratingUpdateForm.attr("data-value", "4.5");
		});
		$('#upd-star5').click( () => {
			ratingUpdateForm.attr("data-value", "5");
		});
	});

	$('#update-btn').click((e) => {
		//alert($(e.target).attr('data-no'));
		$.ajax({
			url : "../../app/json/space/update/review",
			type : "POST",
			data : {
				no : updateNo,
				rating: $(ratingUpdateForm).attr("data-value"),
				review: $(reviewUpdateForm).val()
			},
			success : function(data) {
				console.log(data);
				alert('수정 되었습니다.');
				location.reload();
			},
			error : function(request, status, error) {
				alert('수정 실패');
			}
		})
	});
	
});
