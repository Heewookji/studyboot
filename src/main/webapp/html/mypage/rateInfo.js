var myBarChart,
myPieChart,
rateDataset,
atnDataset,
now = new Date(),
year = now.getFullYear(),
month = now.getMonth(),
dropData = 0,
exileData = 0,
finishData = 0,
//핸들바스로 데이터 준비
templateSrc = $('#tr-template').html(),
trGenerator = Handlebars.compile(templateSrc);


loadRateData();

function loadRateData() {
  $.getJSON('../../app/json/member/rateinfo',
      function(data) {
    
    console.log(data);
    
    // 사진을 꼽아준다.
    $('#rate-profilePhoto')
      .attr('src', '/studyboot/upload/images/member/' + data.rateInfo[0].member.photo);
    
    // bar 차트
    // 평점 데이터
    var rateDataList = [0, 0, 0, 0, 0];
    // 출석률 데이터
    var atnDataList = [0, 0, 0, 0, 0];
    var dataIndex = 0; // 데이터가 들어갈 배열의 인덱스
    var i = month - 4;
    
    // 현재 날짜의 월을 기준으로 반복문 돌림 ex) 현재 6월 -> 2월 ~ 6월 까지
    for (i; i <= month; i++) {
      
      // 날짜를 비교해줄 변수 선언
      var year2;
      var month2;
      
      // month가 음수라면 작년 ex) 2018-12
      if (i < 0) {
        year2 = year - 1;
        month2 = 13 + i;
      } else {
        year2 = year;
        month2 = i + 1;
      }
      
      if ((month2 + '').length < 2) { // 2자리가 아니면 0을 붙여준다.
        month2 = '0' + month2;  // ex) 02 ~ 06
      }
      
      // 평점 기록에서 데이터 뽑아내기
      data.rateLog.forEach(function(item) {
        if (year2 == item.updateDate.split('-')[0] && // 업데이트 날짜의 년을 비교
             month2 == item.updateDate.split('-')[1]) { // 업데이트 날짜의 월을 비교
          
          rateDataList.splice(dataIndex, 1, item.rate); // 순서대로 채운다.
        }
      });
      
      var atnPct = 0;
      var count = 0;
      var atnValue = 0;
      
      // 멤버 평가 정보(종료된 스터디)에서 출석률 뽑아내기
      data.rateInfo.forEach(function(item) {
        if (item.endDate != null && // 종료 날짜가 null이 아닌 값만 사용
             year2 == item.endDate.split('-')[0] && // 종료 날짜의 년을 비교
             month2 == item.endDate.split('-')[1]) { // 종료 날짜의 월을 비교
          
          atnPct += item.attendance;
          count++;
        }
      });
      
      atnValue = atnPct / count; // 같은 달 종료된 스터디의 평균 출석률
      if (!isNaN(atnValue)) {
        atnDataList.splice(dataIndex, 1, atnValue);
      }
      
      dataIndex++;
    }
    
    console.log(rateDataList);
    console.log(atnDataList);
    
    rateDataset = {
        label: '평점',
        data: rateDataList,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
    };
    
    atnDataset = {
        label: '출석률',
        data: atnDataList,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    };
    // End bar 차트
    
    // pie 차트
    data.rateInfo.forEach(function(item) {
      
      switch (item.endNo) {
        case 1: finishData++; break;
        case 2: dropData++; break;
        case 3: exileData++; break;
      }
    });
    
    console.log(finishData, dropData, exileData);
    
    $(document.body).trigger('loaded-rateData');
  });
}


$(document.body).bind('loaded-rateData', () => {

  // bar 차트
  // x축 'X월'
  var MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월']
  var monthLabel = [];
  
  // 현재 날짜의 month 포함 ~ 이전 5개월을 monthLabel에 담는다.
  var i = month - 4
  if (i < 0) {
    
    var j = MONTHS.length + i;
    i = 0;
    
    for (j; j < MONTHS.length; j++) {
      monthLabel.push(MONTHS[j]);
    }
  }
  
  for (i; i <= month; i++) {
    monthLabel.push(MONTHS[i]);
  }
  
  // bar차트에 들어갈 데이터를 담는다.
  var barChartData1 = {
      labels: monthLabel,
      datasets: [rateDataset],
  };
  
  var barChartData2 = {
      labels: monthLabel,
      datasets: [atnDataset],
  };
  
  
  var ctx = $('#rate-barChart');
  myBarChart = new Chart(ctx, {
      type: 'bar',
      data: barChartData1,
      options: {
          legend: {
              display: false
          },
          title: {
            display: true,
            text: '평점 및 출석률'
          },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      max: 5
                  }
              }]
          }
      }
  });
  
  var ctx = $('#atn-barChart');
  myBarChart = new Chart(ctx, {
      type: 'bar',
      data: barChartData2,
      options: {
          legend: {
              display: false
          },
          title: {
            display: true,
            text: '평점 및 출석률'
          },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      max: 100
                  }
              }]
          }
      }
  });
  
  // pie 차트
  var ctx = $('#pieChart');
  myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ['완료', '탈퇴', '추방'],
          datasets: [{
              data: [finishData, dropData, exileData],
              backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 206, 86)'
              ]
          }]
      },
      options: {
      }
  });
  
  
  $('#rateShow-btn').click(() => {
    $('#atn-barChart').prop('hidden', true);
    $('#rate-barChart').prop('hidden', false);
  });

  $('#atnShow-btn').click(() => {
    $('#rate-barChart').prop('hidden', true);
    $('#atn-barChart').prop('hidden', false);
  });
  
});


loadHistory();

function loadHistory() {
  $.getJSON('../../app/json/member/history',
      function(data) {
    
    console.log(data.history);
    
  });
}




