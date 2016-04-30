$(document).ready(function(){
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
			Materialize.toast('correct', 1000);
		}else if(input == ''){
			Materialize.toast('Enter the decoded text', 1000);
		}else{
			Materialize.toast('incorrect', 1000);
		}
	});
});
