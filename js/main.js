$(window).load(function() {
	$('.slidedown_head').click(function(){
		$(this).next('.slidedown_body').slideToggle();
		$(this).find('i').toggleClass('fa-minus-circle')
	});
});

