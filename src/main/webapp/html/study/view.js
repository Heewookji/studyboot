// 현재 URL을 ?로 나누어 파라미터를 구한다.
var param = location.href.split('?')[1];
// param 변수는 값이 있으면 true를 리턴한다.
if (param) {
  // loadData 함수를 호출한다. param 변수를 =로 나누어 파라미터의 값을 구한다.
  loadData(param.split('=')[1]);
  // bit-new-item 클래스의 태그를 출력하지 않는다.
  }
  
/*
document.querySelector('#delete-btn').onclick = () => {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4 || xhr.status != 200) {
      return;
    }
    var data = JSON.parse(xhr.responseText);
    
    if (data.status == 'success') {
      location.href = 'index.html';
      
    } else {
      alert('삭제 실패입니다!\n' + data.message);
    }
  };
  
  var no = document.querySelector('#no').value;
  xhr.open('GET', '../../app/json/board/delete?no=' + no, true);
  xhr.send();
}; // delete-btn

document.querySelector('#update-btn').onclick = () => {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4 || xhr.status != 200) {
      return;
    }
    var data = JSON.parse(xhr.responseText);
    
    if (data.status == 'success') {
      location.href = 'index.html';
      
    } else {
      alert('변경 실패입니다!\n' + data.message);
    }
  };
  
  xhr.open('POST', '../../app/json/board/update', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
  var no = document.querySelector('#no').value;
  var contents = document.querySelector('#contents').value;
  
  var qs = 'contents=' + encodeURIComponent(contents) + 
      '&no=' + no;
  xhr.send(qs);
}; // update-btn
*/

// 서버에서 데이터를 불러온다.
function loadData(no) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4 || xhr.status != 200) {
      return;
    }
    var data = JSON.parse(xhr.responseText);
    console.log(data);
    document.querySelector('#name').value = data.name;
    document.querySelector('#goal').value = data.goal;
    document.querySelector('#contents').value = data.contents;
    document.querySelector('#day').value = data.day;
    document.querySelector('#cls').value = data.cls;
    document.querySelector('#sdt').value = data.startDate;
    document.querySelector('#edt').value = data.endDate;
    document.querySelector('#prsn').value = data.personnel;
  };
  xhr.open('GET', '../../app/json/study/detail?no=' + no, true);
  xhr.send();
}













