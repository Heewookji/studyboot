var myBarChart,
myPieChart,
rateDataset,
atnDataset;


$( document ).ready(function() {
  $("#sb-rateInfo").load("rateInfo.html", function() {
    
    $(document.body).trigger('loaded-rateInfo');
  });
});

$(document.body).bind('loaded-rateInfo', () => {

  $.getJSON('../../app/json/member/rateinfo',
      function(data) {
    
    console.log(data);
    
    data.rateLog.forEach(function(item) {
      console.log(item);
      switch (item.updateDate.split('-')[1]) {
        case '01': console.log(item.rate); break;
        case '02': console.log(item.rate); break;
        case '03': console.log(item.rate); break;
        case '04': console.log(item.rate); break;
        case '05': console.log(item.rate); break;
        case '06': console.log(item.rate); break;
        case '07': console.log(item.rate); break;
        case '08': console.log(item.rate); break;
        case '09': console.log(item.rate); break;
        case '10': console.log(item.rate); break;
        case '11': console.log(item.rate); break;
        case '12': console.log(item.rate); break;
          
      }
    });
    
    rateDataset = {
        label: '평점',
        data: [5, 4.5, 3, 2.5, 4, 2],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
    };
    
    atnDataset = {
        label: '출석률',
        data: [100, 95, 80, 90, 60, 100],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    };
    
    $(document.body).trigger('loaded-rateData');
  });
  
});


$(document.body).bind('loaded-rateData', () => {

  // bar 차트
  var MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월']
  
  var barChartData = {
      labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
      datasets: [rateDataset],
  };
  
  
  var ctx = $('#barChart');
  myBarChart = new Chart(ctx, {
      type: 'bar',
      data: barChartData,
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
                      beginAtZero: true
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
              data: [1, 1, 1],
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
    barChartData.datasets.pop();
    barChartData.datasets.push(rateDataset);
    window.myBarChart.update();
  });

  $('#atnShow-btn').click(() => {
    barChartData.datasets.pop();
    barChartData.datasets.push(atnDataset);
    window.myBarChart.update();
  });
  
  
});





