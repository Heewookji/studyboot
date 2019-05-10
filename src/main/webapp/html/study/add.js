document.querySelector('#add-btn').onclick = () => {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4 || xhr.status != 200) {
      return;
    }
    var data = JSON.parse(xhr.responseText);
    
    if (data.status == 'success') {
      location.href = 'index.html';
      
    } else {
      console.log(data.message);
    }
  };
  
  xhr.open('POST', '../../app/json/study/add', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
  var name = document.querySelector('#name').value,
      cls = document.querySelector('#cls').value,
      address = document.querySelector('#address').value,
      goal = document.querySelector('#goal').value,
      photo = document.querySelector('#photo').value,
      day = document.querySelector('#day').value,
      personnel = document.querySelector('#personnel').value,
      startDate = document.querySelector('#startDate').value,
      endDate = document.querySelector('#endDate').value,
      contents = document.querySelector('#contents').value;
  
  xhr.send(
      'name=' + encodeURIComponent(name) +
      '&cls=' + encodeURIComponent(cls) +
      '&address=' + encodeURIComponent(address) +
      '&goal=' + encodeURIComponent(goal) +
      '&photo=' + encodeURIComponent(photo) +
      '&day=' + encodeURIComponent(day) +
      '&personnel=' + encodeURIComponent(personnel) +
      '&startDate=' + encodeURIComponent(startDate) +
      '&endDate=' + encodeURIComponent(endDate) +
      '&contents=' + encodeURIComponent(contents));
}; // add-btn















