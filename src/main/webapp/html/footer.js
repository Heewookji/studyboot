
$( document ).ready(function() {
    $("#js-footer").load("/studyboot/html/footer.html", function(){
	$(document.body).trigger('loaded-footer');
    });
});


$(document.body).bind('loaded-footer', () => {
    $('#photo1').click((e) => {
	e.preventDefault();
	$("#name").html("Name");
	$("#address").html("Address");
	$("#phone").html("Phone");
	$("#email").html("Email");
       
	
    });
    
    $('#photo2').click((e) => {
	e.preventDefault();
	$("#name").html("Name");
	$("#address").html("Address");
	$("#phone").html("Phone");
	$("#email").html("Email");
	
    });
    
    $('#photo3').click((e) => {
	e.preventDefault();
	
	$("#name").html("Name");
	$("#address").html("Address");
	$("#phone").html("Phone");
	$("#email").html("Email");
	
    });
    
    $('#photo4').click((e) => {
	e.preventDefault();
	$("#name").html("");
	$("#address").html("");
	$("#phone").html("");
	$("#email").html("");
    });
    
    $('#photo5').click((e) => {
	e.preventDefault();
	$("#name").html("Name");
	$("#address").html("Address");
	$("#phone").html("Phone");
	$("#email").html("Email");
	
    });
});