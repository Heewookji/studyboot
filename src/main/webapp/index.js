var 
pageNo,
clsNo,
addressNo,
rateValue = 3,
keyword
;
	



$('.cls-btn').click((e) => {
  window.location.href = './html/study/index.html?clsNo='+ $(e.target).attr('data-no') + '&clsTitle=' + $(e.target).text();
});

$('.msg-btn').click((e) => {
  window.location.href = './html/message/index.html'});
  
$('.cal-btn').click((e) => {
    window.location.href = './test/test.html'});

$('.inqry-btn').click((e) => {
    window.location.href = './html/inquiry/index.html'});
    
$('.space-btn').click((e) => {
  window.location.href = './html/space/index.html'});


$('#search-btn').click((e) => {
    pageNo = 1;
    keyword = $("#study-search").val();
    window.location.href = './html/study/index.html?clsNo=' + '&clsTitle=' + '&keyword=' + keyword;
  });