$(document).ready(function(){
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
