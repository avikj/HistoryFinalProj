$(document).ready( function(){
	$('#name-form').submit(function (evt) {
	    evt.preventDefault();
	    if($('#name-input').val() == ''){
			Materialize.toast('Please enter your name.', 1200);
		}else{
			$('#intro-description').addClass('animated bounceOutRight');
			$('#name-form').addClass('animated bounceOutLeft');

			sessionStorage.setItem('japanception-name', $('#name-input').val());
			sessionStorage.setItem('japanception-score', 0);

			$('#name-form').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				window.location = ('game.html');
			});
		}
	});

});
