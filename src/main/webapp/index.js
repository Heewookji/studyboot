
$(window).scroll(function(obj) {
    
	const currentScrollPercentage = getCurrentScrollPercentage()
	if(currentScrollPercentage > 90){
	    $('#header-child').prop('hidden', false);
	}else{
	    $('#header-child').prop('hidden', true);
	}
});

function getCurrentScrollPercentage(){
    return (window.scrollY + window.innerHeight) / document.body.clientHeight * 100
    }
