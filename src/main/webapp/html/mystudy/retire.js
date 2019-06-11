var param = location.href.split('?')[1],
myStudyNo = param.split('=')[1],
evaluationMemberList,
retireeList;

var evaluationTemplateSrc = $('#retire-evaluation-list').html(),
evaluationGenerator = Handlebars.compile(evaluationTemplateSrc);

var retirePersonEvaluationTemplateSrc = $('#retire-person-evaluation-list').html(),
retirePersonEvaluation = Handlebars.compile(retirePersonEvaluationTemplateSrc);

// 리더인지 판단
(function (myStudyNo) {
  $.getJSON('../../app/json/MyStudy/leader?no=' + myStudyNo,
      function(obj) {
    window.leader = obj.leader;
    console.log(window.leader);
  });
}(myStudyNo));

// 스터디원 찾아와서 평가리스트에 꽂기
(function (myStudyNo) {
  $.getJSON('../../app/json/MyStudy/studyphoto?no=' + myStudyNo,
      function(obj) {
    evaluationMemberList = obj.list;

    $(evaluationGenerator(obj)).appendTo('#retire-evaluation');
    $(document.body).trigger('loaded-retireform');
  });
}(myStudyNo));





// 탈퇴자가 발생하였는지 판단
(function (myStudyNo) {
  $.getJSON('../../app/json/retireEvaluation/retireTrueOrFalse?studyNo=' + myStudyNo,
      function(obj) {
    console.log(obj.retire); // 서버에서 넘어온 로그인 유저가 평가하지 않은 탈퇴자 리스트
    retireeList = obj.retire;
    if (obj.retire != "0") {
      //모달창 띄워서 평가하기
      $('#retire-person-modal').click();
      $(retirePersonEvaluation(obj)).appendTo('#retire-person-evaluation');
    }
  });
}(myStudyNo));

//<button onclick="alert($('#rateit10').rateit('value'))">Get value</button>


//($('#rateit-' +retireeList[0].nickName).rateit('value')).click(() => {
//  alert(11);
//});





$('#retire-request').click(() => {

  if (window.leader === true) {
    alert("스터디 장은 스터디에 탈퇴 할 수 없습니다.");
    return;
  }

  if (confirm("스터디에 탈퇴 하시겠습니까?")) {
    $('#retire-modal').click();

    $(evaluationMemberList).each(function( i, element ) {
      // 탈퇴할때 평가할 스터디 원들 기본 별점 3으로.
      $('#star3' + evaluationMemberList[i].member.nickName).click();
      $('#ratingForm' + evaluationMemberList[i].member.nickName).attr("data-value", "3");
    });

  }
});

$(document.body).bind('loaded-retireform', () => {

  $(evaluationMemberList).each(function( i, element ) {

    $('#star05' + evaluationMemberList[i].member.nickName).click(() => {
      $('#ratingForm' + evaluationMemberList[i].member.nickName).attr("data-value", "0.5");
    });

    $('#star1' + evaluationMemberList[i].member.nickName).click( () => {
      $('#ratingForm' + evaluationMemberList[i].member.nickName).attr("data-value", "1");
    });

    $('#star15' + evaluationMemberList[i].member.nickName).click( () => {
      $('#ratingForm' + evaluationMemberList[i].member.nickName).attr("data-value", "1.5");
    });

    $('#star2' + evaluationMemberList[i].member.nickName).click( () => {
      $('#ratingForm' + evaluationMemberList[i].member.nickName).attr("data-value", "2");
    });

    $('#star25' + evaluationMemberList[i].member.nickName).click( () => {
      $('#ratingForm' + evaluationMemberList[i].member.nickName).attr("data-value", "2.5");
    });

    $('#star3' + evaluationMemberList[i].member.nickName).click( () => {
      $('#ratingForm' + evaluationMemberList[i].member.nickName).attr("data-value", "3");
    });

    $('#star35' + evaluationMemberList[i].member.nickName).click( () => {
      $('#ratingForm' + evaluationMemberList[i].member.nickName).attr("data-value", "3.5");
    });

    $('#star4' + evaluationMemberList[i].member.nickName).click( () => {
      $('#ratingForm' + evaluationMemberList[i].member.nickName).attr("data-value", "4");
    });

    $('#star45' + evaluationMemberList[i].member.nickName).click( () => {
      $('#ratingForm' + evaluationMemberList[i].member.nickName).attr("data-value", "4.5");
    });

    $('#star5' + evaluationMemberList[i].member.nickName).click( () => {
      $('#ratingForm' + evaluationMemberList[i].member.nickName).attr("data-value", "5");
    });

  });
});

// 평가 제출 버튼
$('#retire-evaluation-btn').click(() => {

  var nickNames = []; // 스터디 멤버 닉네임 모음
  var ratingArr = []; // 탈퇴시 스터디 멤버들 별점 점수 모음
  $(evaluationMemberList).each(function( i, element ) {

    nickNames.push(evaluationMemberList[i].member.nickName); 
    ratingArr.push($('#ratingForm'+evaluationMemberList[i].member.nickName).attr("data-value")); // 평가 정보를 담는다.

  });
  console.log(typeof ratingArr[0]);

  $.getJSON('../../app/json/retireEvaluation/retireEvaluation?nickNames=' + nickNames
      + '&evaluations=' + ratingArr  + '&studyNo=' + myStudyNo,
      function(obj) {
    alert(obj.status);
    window.location.href = "/studyboot/";
  })

});

$('#exampleModalCenter').on('shown.bs.modal', function (e) {
  
  $('.rateit').rateit({ 
    // min value
    min: 0, 
    // max value
    max: 5, 
    // step size
    step: 0.5, 
    // 'bg', 'font'
    mode: 'font', 
    // size of star
    starwidth: 16, 
    starheight: 16, 
    // is readonly?
    readonly: false, 
    // is resetable?
    resetable: false, 
  });
  
});














