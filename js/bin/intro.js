$(document).ready( function(){
	$('#name-form').submit(function (evt) {
	    evt.preventDefault();
	  if($('#name-input').val() == ''){
			Materialize.toast('Please enter your group\'s name.', 1200);
		}else if($('#password-input').val() == ''){
			Materialize.toast('Please enter your group\'s password.', 1200);
		}else if(validLogin($('#name-input').val(), $('#password-input').val())){
			$('#intro-description').addClass('animated bounceOutRight');
			$('#name-form').addClass('animated bounceOutLeft');

			sessionStorage.setItem('japanception-name', $('#name-input').val());
			sessionStorage.setItem('japanception-score', 0);
			window.location = 'decryption.html';
		}else{
			Materialize.toast('Invalid credentials! Make sure you spelled your group name and password correctly.', 1200);
		}
	});
});

function validLogin(group, password){
	if(group.length >= 6 && group.substring(0, 6) == 'tester')
		return true;
	switch(group.toLowerCase().trim()){
		case 'savoy':
			return reallyBadHash(password) == 193954;
		case 'bourbon':
			return reallyBadHash(password) == 176838;
		case 'bismarck':
			return reallyBadHash(password) == 177319;
		case 'windsor':
			return reallyBadHash(password) == 180762;
		case 'habsburg':
			return reallyBadHash(password) == 191750;
		default:
			return false;
	}
}

function reallyBadHash(password){
	var result = 9+10;
	for (var i = 1; i < password.length; i++) 
		result += password.charCodeAt(i)*password.charCodeAt(i-1)*i+password.charCodeAt(i)%i;
	return result;
}
