//현재 URL을 ?로 나누어 파라미터를 구한다.
var param = location.href.split('?')[1],
studyNo,
//card 리스트 출력 - 스터디 목록
studyMemberSrc = $('#view-studymember').html(),
studyMemberGenerator = Handlebars.compile(studyMemberSrc),
heartClicked = false,
doingInit = false,
memberAges,
memberAge,
finishData,
dropData,
exileData,
leaderName
;



//param 변수는 값이 있으면 true를 리턴한다.
if (param) {
  // loadData 함수를 호출한다. param 변수를 =로 나누어 파라미터의 값을 구한다.
  var no = param.split('&')[0];
  var name = param.split('&')[1];
  studyNo = no.split('=')[1];
  loadData(studyNo);

  //이름 타이틀에 넣어준다.
  $('#studyNameHead').html(decodeURIComponent(name.split('=')[1]));


}


//스터디 상세 데이터를 불러오는 함수
function loadData(no) {

  $.getJSON('../../app/json/study/detail?no=' + no,
          function(data) {

    console.log(data);

    memberAge = data.memberAge;
    memberAges = data.memberAges;

    //빵 부스러기
    $('#lClsTitle').text(data.clsList[0].name);
    $('#lClsTitle').attr('data-no', data.clsList[0].clsLargeNo);
    $('#mClsTitle').text(data.clsList[1].name);
    $('#mClsTitle').attr('data-no', data.clsList[1].clsLargeNo + data.clsList[1].clsMediumNo );
    $('#sClsTitle').text(data.clsList[2].name);
    $('#sClsTitle').attr('data-no', data.clsList[2].clsLargeNo + data.clsList[2].clsMediumNo + data.clsList[2].clsSmallNo);
    $('#lClsTitle').click(function(e) {
      location.href= '/studyboot/html/study/index.html?clsNo='+$('#lClsTitle').attr('data-no')+'&clsTitle='+$('#lClsTitle').text()+'&keyword=';
    });



    $('#name').text(data.name);
    $('#goal').html(data.goal);
    $('#contents').append(data.contents);

    $('#day').html('');
    for(var day of data.dayStrList){
      $('#day').append("<li class=\"list-inline-item g-mb-10\"><a class=\"u-tags-v1 g-color-main g-brd-around g-brd-gray-light-v3 g-bg-gray-dark-v2--hover g-brd-gray-dark-v2--hover g-color-white--hover g-rounded-50 g-py-4 g-px-15\">"
              + day+"</a></li>");
    }

    $('#cls').val(data.cls);
    $('#sdt').text(data.startDate);
    $('#edt').text(data.endDate);
    $('#prsn').val(data.personnel);
    $('#age').val(data.memberAge);
    $('#attendance').val(data.attendance);
    $('#endrate').val(data.endrate);
    //rate
    $('#rate').rateit();
    $('#rate').rateit('value', data.rate);
    $('#leftDay').text(data.currentDateDiff);

    if(Math.round((data.totalDateDiff - data.currentDateDiff)/data.totalDateDiff * 100) < 0 ||
            Math.round((data.totalDateDiff - data.currentDateDiff)/data.totalDateDiff * 100) > 100){
      $('#dayProgress').css("width", '0%'); 
      $('#dayProgressText').html('0%');
    } else{
      $('#dayProgress').css("width", Math.round((data.totalDateDiff - data.currentDateDiff)/data.totalDateDiff * 100) + '%'); 
      $('#dayProgressText').html(Math.round((data.totalDateDiff - data.currentDateDiff)/data.totalDateDiff * 100) + '%');
    }

    var studyMemberList = new Object();
    studyMemberList.list = new Array();
    
    for(var member of data.studyMembers){
      if(member.leader){
        leaderName = member.member.nickName;
        $('#studyMemberList').append('<div class="g-pb-5"><img class="rounded-circle g-width-30" src="/studyboot/upload/images/member/'+ member.photo  + '"><span class="g-pl-10"><u>'+member.member.nickName+'</u></span><div class="pull-right"><div class="rateit g-pl-20 studyMemberRate" data-rateit-readonly="true"data-rateit-mode="font" style="font-size: 20px"data-rateit-resetable="false" data-rateit-value="'+member.rate+'"></div></div>');
      } else{
        studyMemberList.list.push(member);
      }
    }
    
    
    $(studyMemberGenerator(studyMemberList)).appendTo('#studyMemberList');

    $('#personnel').html(data.nowPersonnel + '/' + data.personnel );

    //지도 출력
//  var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
//  var options = { //지도를 생성할 때 필요한 기본 옵션
//  center: new daum.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
//  level: 3 //지도의 레벨(확대, 축소 정도)
//  };

//  var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴

    $.getJSON('../../app/json/member/mystudy',
            function(mystudyData) {

      //로그인 되어있을때.
      if(mystudyData.status == "success"){

        var doingList = mystudyData.doingStudyList,
        appliedList = mystudyData.appliedStudyList,
        pickedList = mystudyData.pickedStudyList;

        if(pickedList != undefined){
          for(var pickedStudy of pickedList){
            if(pickedStudy.no == studyNo){
              $('#heart-btn').removeClass('u-btn-outline-dribbble');
              $('#heart-btn').addClass('g-color-white');
              $('#heart-btn').addClass('g-bg-dribbble');
              heartClicked = true;
              break;
            }
          }
        }

        if(doingList != undefined){
          for(var study of doingList){
            if(study.no == studyNo){
              doingInit = true;
            }
          }
        }

        //현재 속한 스터디가 아닐때.
        if(!doingInit){

          //해당 스터디가 모집중이 아닐때
          if(data.state == false){

            $('#apply-btn').click(function(){
              Swal.fire({
                type: 'error',
                title: errorTitle,
                text: '해당 스터디가 모집중이 아닙니다!'
              });
            });
            heartClick();
            messageClick();
            return;

            //해당 스터디가 모집 중일때
          }else{

            //이미 신청한 스터디인가
            if(appliedList != undefined){
              for(var appliedStudy of appliedList){
                if(appliedStudy.studyNo == studyNo){

                  $('#apply-btn').click(function(){
                    Swal.fire({
                      type: 'error',
                      title: errorTitle,
                      text: '이미 가입신청한 스터디입니다!'
                    });
                  });
                  heartClick();
                  messageClick();
                  return;
                }
              }
            }
          }
          //현재 속한 스터디일때.
        }else{

          $('#sendMessage-btn').click(function(){
            Swal.fire({
              type: 'error',
              title: errorTitle,
              text: '이미 스터디 활동중입니다!'
            });
          });

          $('#apply-btn').click(function(){
            Swal.fire({
              type: 'error',
              title: errorTitle,
              text: '이미 스터디 활동중입니다!'
            });
          });
          heartClick();

          return;
        } 

        //로그인 안되어있다면
      } else {

        $('#sendMessage-btn').click(function(){
          Swal.fire({
            type: 'error',
            title: errorTitle,
            text: '로그인 해주세요!'
          });
        });

        $('#apply-btn').click(function(){
          Swal.fire({
            type: 'error',
            title: errorTitle,
            text: '로그인 해주세요!'
          });

        });

        $('#heart-btn').click(function(){
          Swal.fire({
            type: 'error',
            title: errorTitle,
            text: '로그인 해주세요!'
          });

        });

        return;

      }

      //그 외에 정상 작동
      applyClick();
      heartClick();
      messageClick();
    });
    $(document.body).trigger('loaded-studyInfo');
  });
}




//스터디 차트데이터를 불러오는 함수
function loadChart(no) {

  $.getJSON('../../app/json/study/chart?no=' + no,
          function(data) {
    if(data.status == "success"){

      console.log(data);

      var studyChartCountData = data.studyChartCount;

      $('#percentCount').html(data.percentCount+"% ");

      var c = document.getElementById("studyRateChart");
      var studyRateChart = c.getContext("2d");
      var gradientStroke = studyRateChart.createLinearGradient(500, 0, 100, 0);
      gradientStroke.addColorStop(0, 'rgba(128, 182, 244, 0.9)');
      gradientStroke.addColorStop(1, 'rgba(244, 144, 128,0.9)');
      var gradientFill = studyRateChart.createLinearGradient(500, 0, 100, 0);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.1)");
      gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.1)");



      var studyRateChartShow = new Chart(studyRateChart, {
        type: 'bar',
        data: {
          labels: ['백분위'],
          datasets: [{
            borderColor: 'rgba(54, 162, 235, 0.4)',
            backgroundColor: 'rgba(54, 162, 235, 0.1)',
            borderWidth: 1,
            fill: true,
            data: [
             100 - data.percentCount
              ]
          },
          {
            borderColor: 'rgba(54, 162, 235, 0.7)',
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderWidth: 1,
            fill: true,
            data: [
              data.percentCount
            ],
          }
          ]
        },
        options: {
          legend: false,
          plugins: {
            labels: false
          },
          elements: {
            point: {
              pointStyle: 'circle'
            }
          },
          responsive: true,
          title: {
            display: false,
            text: '스터디 평균 평점 그래프',
            fontStyle: 'normal',
            fontSize: 14,
            padding: 30
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: true,
                drawBorder: true,
                drawOnChartArea: false
              },
              scaleLabel: {
                display: false,
                labelString: 'Month'
              },
              stacked: true,
            }],
            yAxes: [{
              gridLines: {
                display: false,
                drawBorder: false,
                drawOnChartArea: false,
              },
              scaleLabel: {
                display: false,
                labelString: 'Value'
              },
              ticks: {
                display: false
              },
              stacked: true,
            }]
          }
        }
      });



      $('#ageAverage').html(memberAge);


      var ageRateChart = $("#ageRateChart");


      var tenCount = 0;
      var twentyCount = 0;
      var thirtyCount = 0;
      var fourtyCount = 0;
      var fiftyCount = 0;

      for(var age of memberAges){
        if(age >= 10 && age < 20){
          ++tenCount;
        }else if(age >= 20 && age < 30){
          ++twentyCount;
        }else if(age >= 30 && age < 40){
          ++thirtyCount;
        }else if(age >= 40 && age < 50){
          ++fourtyCount;
        }else if(age >= 50 && age < 60){
          ++fiftyCount;
        }
      }


      var ageRateChartShow = new Chart(ageRateChart, {
        type: 'horizontalBar',
        data: {
          labels: ['10대', '20대', '30대', '40대', '50대'],
          datasets: [{
            data: [tenCount, twentyCount, thirtyCount, fourtyCount, fiftyCount],
            backgroundColor: [
              'rgba(255, 99, 132, 0.1)',
              'rgba(54, 162, 235, 0.1)',
              'rgba(255, 206, 86, 0.1)',
              'rgba(75, 192, 192, 0.1)',
              'rgba(153, 102, 255, 0.1)',
              'rgba(255, 159, 64, 0.1)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)'
                ],
                borderWidth: 1
          }]
        },
        options: {
          legend: false,
          elements: {
            point: {
              pointStyle: 'circle'
            }
          },
          responsive: true,
          title: {
            display: true,
            text: '스터디 구성원 평균 연령대',
            fontStyle: 'normal',
            padding: 20,
            fontSize: 14
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            yAxes: [{
              gridLines: {
                display: true,
                drawBorder: true,
                drawOnChartArea: false,
              },
              scaleLabel: {
                display: false,
                labelString: 'Month'
              }
            }],
            xAxes: [{
              gridLines: {
                display: false,
                drawBorder: false,
                drawOnChartArea: false,
              },
              scaleLabel: {
                display: false,
                labelString: 'Value'
              },
              ticks: {
                display: false
              }
            }]
          }
        }
      });

      $('#finishAverage').html(Math.round(data.finishPercentage) + "% ");

      var finishRateChart = $("#finishRateChart");

//    For a pie chart
      var finishRateChartShow = new Chart(finishRateChart, {
        type: 'pie',
        data: {

          datasets: [{
            data: [Math.round(data.finishPercentage), Math.round(data.dropPercentage), Math.round(data.exilePercentage)],
            backgroundColor: [
              'rgba(54, 162, 235, 0.1)',
              'rgba(255, 99, 132, 0.1)',
              'rgba(255, 206, 86, 0.1)'
              ],
              borderColor: [
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(255, 206, 86, 0.7)'
                ],
                borderWidth: 1
          }],

          labels: [
            '완료',
            '탈퇴',
            '추방'
            ]
        },
        options: {
          title: {
            display: true,
            text: '구성원 스터디 달성율',
            fontStyle: 'normal',
            fontSize: 14,
            padding: 20
          },
          legend: {
            boxWidth: 70,
            position: 'left'
          },
          plugins: {
            labels: false
          }
        }

      });

      var attendance = 0;
      for(var attendVal of data.attendanceValue){
        attendance += attendVal;
      }
      attendance = attendance/data.attendanceValue.length;

      $('#attendAverage').html(Math.round(attendance) + "%");

      var attendRateChart = $("#attendRateChart");


      var attendRateChartShow = new Chart(attendRateChart, {
        type: 'line',
        data: {
          labels: data.attendanceLabel,
          datasets: [{
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)'
                ],
                pointHoverRadius: 20,
                pointRadius: 10,
                fill: false,
                borderWidth: 1,
                showLine: false,
                data: data.attendanceValue
                ,
          }]
        },
        options: {
          title: {
            display: true,
            text: '스터디 구성원 출석율',
            fontStyle: 'normal',
            fontSize: 14,
            padding: 40
          },
          legend: false
          ,
          elements: {
            point: {
              pointStyle: 'circle'
            }
          },
          responsive: true,
          tooltips: {
            mode: 'index',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: true,
                drawBorder: true,
                drawOnChartArea: false,
              },
              scaleLabel: {
                display: false,
                labelString: 'Month'
              }
            }],
            yAxes: [{
              gridLines: {
                display: false,
                drawBorder: false,
                drawOnChartArea: false,
              },
              scaleLabel: {
                display: false,
                labelString: 'Value'
              },
              ticks: {
                min: 0,
                max: 100,
                display: false
              }
            }]
          }
        }
      });
    }
  });

}


$(document.body).bind('loaded-studyInfo', () => {

  $("#board-div").attr('hidden',false);
  
  // 값을 넣어준 뒤, 프로그래스 바를 초기화해야 실행이 원활하게 된다.
  var horizontalProgressBars = $.HSCore.components.HSProgressBar.init('.js-hr-progress-bar', {
    direction: 'horizontal',
    indicatorSelector: '.js-hr-progress-bar-indicator'
  });
  
  $('.ui.dropdown.memberDropdown')
  .dropdown({
    on: 'hover',
    onChange: function(value, text, $selectedItem) {
      $('#studyMemberRate').rateit('value', value);
    }
  });

  $('.studyMemberRate').rateit();

  //차트를 준비합니다람쥐.
  loadChart(studyNo);

});


$('#applyAdd-btn').click(function(e){

  if($( "#userGoal" ).val().length <= 30){

    $.getJSON('../../app/json/study/appliedStudy?studyNo=' + studyNo + '&determination='+ $( "#userGoal" ).val(),
            function(data) {
      if(data.status == "success"){
        Swal.fire({
          type: 'success',
          title: '가입신청을 완료했습니다!',
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          location.reload();
        }
        );
      }else{
        Swal.fire({
          type: 'error',
          title: errorTitle,
          text: '가입신청에 실패했습니다!'
        }).then((result) => {
          $('#applyModal').modal('toggle');
        }
        );
      }
    });

  }else{
    Swal.fire({
      type: 'error',
      title: errorTitle,
      text: '올바른 양식에 맞게 입력해주세요!'
    });
  }
});

//목표체크
$( "#userGoal" ).keyup(function(){
  if($( "#userGoal" ).val().length > 30){
    $("#userGoal").attr("data-toggle","tooltip");
    $("#userGoal").attr("data-trigger","hover focus");
    $("#userGoal").attr("data-placement","bottom");
    $("#userGoal").attr("data-html", true);
    $("#userGoal").attr("title","30자 이내로<br>목표를 입력해주세요!");
    $('#userGoal').tooltip('enable');
    $('#userGoal').tooltip('show');
  } else{
    if($("#userGoal").attr("data-toggle")){
      $('#userGoal').tooltip('disable');
      $('#userGoal').tooltip('hide');
    }
  }
});

//클릭 이벤트 등록 함수

function heartClick() {

  $('#heart-btn').click(function(e) {
    e.preventDefault();
    if(!heartClicked){
      $.getJSON('../../app/json/study/pickedStudy?studyNo=' + studyNo + '&insertRemove='+ !heartClicked,
              function(data) {
        if(data.status == "success"){
          $('#heart-btn').removeClass('u-btn-outline-dribbble');
          $('#heart-btn').addClass('g-bg-dribbble');
          $('#heart-btn').addClass('g-color-white');
          heartClicked = true;
        } else{
          Swal.fire({
            type: 'error',
            title: errorTitle,
            text: '찜하기를 실패했습니다!'
          });
        }
      });
    } else{
      $.getJSON('../../app/json/study/pickedStudy?studyNo=' + studyNo + '&insertRemove='+ !heartClicked,
              function(data) {
        if(data.status == "success"){
          $('#heart-btn').addClass('u-btn-outline-dribbble');
          $('#heart-btn').removeClass('g-bg-dribbble');
          $('#heart-btn').removeClass('g-color-white');
          heartClicked = false;
        } else{
          Swal.fire({
            type: 'error',
            title: errorTitle,
            text: '찜하기 취소를 실패했습니다!'
          });
        }
      });
    }
  });

}

function applyClick() {
  $('#apply-btn').click(function(e) {
    e.preventDefault();
    $('#applyModal').modal('toggle');
  });
}

function messageClick() {
  $('#sendMessage-btn').click(function(e) {
    e.preventDefault();
  });
}

$("#message-add").load("/studyboot/html/message/messageAddModal.html", function(e) {
  $('#sendMessage-btn').click((e) => {
    
    $('#study-message-add-nick').attr('nick-name', leaderName);
    $('#addModal').modal('show');
  });
});
