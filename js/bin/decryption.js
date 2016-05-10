$(document).ready(function(){
	var score = sessionStorage.getItem('japanception-score') ? parseInt(sessionStorage.getItem('japanception-score')) : 0;
	sessionStorage.removeItem('japanception-score');


	var timeLeft = 60;
	displayTime();
	setInterval(function(){
		if(timeLeft > 0)
			timeLeft--;
		if(timeLeft == 0){
			sessionStorage.setItem('japanception-score', 0);
			$('#timer-display').addClass('animated bounceOutLeft');
			$('#desc').addClass('animated bounceOutRight');
			$('#hint-button').addClass('animated bounceOutLeft')
			$('.number-square').addClass('animated bounceOutRight');
			$('#decoded-form').addClass('animated bounceOutLeft');
			$('#decoded-form').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$('#decoded-form, .number-square, #hint-button, #desc, #timer-display').remove();
				$('#wrapper').html('<h3 id="times-up-display" class="center animated bounceInUp">Time\'s Up!<br>'
					+'Luckily, your advisors were able to determine that the message said "Tokyo".</h3>');
				$('#times-up-display').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					setTimeout(function(){
						window.location = 'game.html';
					}, 3000);
				});
			});
			// 
		}
		displayTime();
	}, 1000);
	$('#hint-button').click(function(){
		$('#hint-button').addClass('animated bounceOutLeft');
		$('#hint-button').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$('#hint-button').html('1=a, 2=b, 3=c...');
			$('#hint-button').removeClass('animated bounceOutLeft');
			$('#hint-button').addClass('animated bounceInRight disabled');
			$('#hint-button').prop('disabled', true);
			$('#hint-button').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$('#hint-button').removeClass('animated bounceInRight');
			});
		});
	});

	$('form').submit(function(evt){
		evt.preventDefault();
		var input = $('#decoded-field').val().toLowerCase().trim()
		if(input == 'tokyo'){
			sessionStorage.setItem('japanception-score', timeLeft+90);
			$('#timer-display').addClass('animated bounceOutLeft');
			$('#desc').addClass('animated bounceOutRight');
			$('#hint-button').addClass('animated bounceOutLeft')
			$('.number-square').addClass('animated bounceOutRight');
			$('#decoded-form').addClass('animated bounceOutLeft');
			$('#decoded-form').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$('#decoded-form, .number-square, #hint-button, #desc, #timer-display').remove();
				window.location = 'game.html';
			});
		}else if(input == ''){
			Materialize.toast('Enter the decoded text', 1000);
		}else{
			Materialize.toast('incorrect', 1000);
		}
	});

	function displayTime(){
		var seconds = timeLeft%60+'';
		while(seconds.length < 2)
			seconds = '0'+seconds;
		$('#timer-display').html(Math.floor(timeLeft/60)+':'+seconds);
	}
});
