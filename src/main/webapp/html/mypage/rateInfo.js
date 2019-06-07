
$( document ).ready(function() {
  $("#sb-rateInfo").load("rateInfo.html", function() {
    
    $(document.body).trigger('loaded-rateInfo');
  });
});

$(document.body).bind('loaded-rateInfo', () => {

  
  
  // bar 차트
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  var ctx = $('#barChart');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
              label: 'Dataset 1',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1
          }, {
              label: 'Dataset 2',
              data: [5, 11, 2, 6, 7, 4],
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
          }]
      },
      options: {
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
  var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ['완료', '탈퇴', '추방', '진행중'],
          datasets: [{
              label: '# of Votes',
              data: [1, 1, 1, 3],
              backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 206, 86)',
                  'rgb(200, 200, 200)'
              ]
          }]
      },
      options: {
      }
  });
  
});



