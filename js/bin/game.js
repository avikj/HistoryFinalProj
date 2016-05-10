$(document).ready( function(){
	var firebaseRef = new Firebase('https://japanception.firebaseio.com/users');
	var gameData = [{
			desc: "After multiple intercepted messages, "
			+"you realize Germany is planning to ally with several "
			+"other countries to attack Tokyo! You must avoid all attacks on your country. What is your next move?",
			options: [
				{value: "Blame the Allies", points: 20},
				{value: "Attack Germany", points: 50},
				{value: "Ignore the message", points: 0}
			]
		},
		{
			desc: "The government of Japan has decided to attack Germany! "
			+"They want to use Kamikaze strikes to attack Berlin "
			+"and completely destroy the German Third Reich and end World War II. "
			+"A strong, determined person must carry out this operation to ensure its success. Who should lead this mission?",
			options: [
				{value: "The top military commander", points: 30},
				{value: "A random citizen - Anish Patchipala", points: -10},
				{value: "I, the emperor of Japan", points: 50}
			]
		},
		{
			desc: "Now you are ready for the attack! Your advisors say the plan is crazy - the emperor should not attack Berlin! What do you want to do?", 
			options: [
				{value: "Abort the mission entirely", points: -20},
				{value: "Forget the advisors", points: 50},
				{value: "Call off the attack temporarily", points: 20}
			]
		}
	]; 


	
	var level = 0;
	var name = sessionStorage.getItem('japanception-name') ? sessionStorage.getItem('japanception-name') : 'guest'; 
	var score = sessionStorage.getItem('japanception-score') ? parseInt(sessionStorage.getItem('japanception-score')) : 0;
	sessionStorage.removeItem('japanception-score');
	sessionStorage.removeItem('japanception-name');
	var clicked = false;
	nextQuestion();
	$('.response').click(function(){
		if(!clicked){
			clicked = true;
			score += $(this).data('points') ? $(this).data('points'): 0;
			$('#score-display').html('score: '+score);
			level++;
			if(level == gameData.length){
				firebaseRef.push({
					name: name,
					score: score,
					timestamp: Date.now()
				});
				setTimeout(function(){
					$('#response-wrapper, #desc').remove();
				}, 300);
			}else{

				setTimeout(function(){
					nextQuestion();
				}, 300);
			}
		}
	});

	function nextQuestion(){

		$('#desc').addClass('animated bounceOut');
		$('#desc').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$('#desc').html(gameData[level].desc);
			$('#desc').removeClass('animated bounceOut');
			$('#desc').addClass('animated bounceIn');
			$('#desc').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$('#desc').removeClass('animated bounceIn');
				clicked = false;
			});
		});		

		$('#response0').addClass('animated bounceOut');
		$('#response0').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$('#response0').html(createCardHtml(gameData[level].options[0].value));
			$('#response0').data('points', gameData[level].options[0].points);
			$('#response0').removeClass('animated bounceOut');
			$('#response0').addClass('animated bounceIn');
			$('#response0').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$('#response0').removeClass('animated bounceIn');
			});
		});		

		$('#response1').addClass('animated bounceOut');
		$('#response1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$('#response1').html(createCardHtml(gameData[level].options[1].value));
			$('#response1').data('points', gameData[level].options[1].points);
			$('#response1').removeClass('animated bounceOut');
			$('#response1').addClass('animated bounceIn');
			$('#response1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$('#response1').removeClass('animated bounceIn');
			});
		});		

		$('#response2').addClass('animated bounceOut');
		$('#response2').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$('#response2').html(createCardHtml(gameData[level].options[2].value));
			$('#response2').data('points', gameData[level].options[2].points);
			$('#response2').removeClass('animated bounceOut');
			$('#response2').addClass('animated bounceIn');
			$('#response2').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$('#response2').removeClass('animated bounceIn');
			});
		});		
	}

	
});

function createCardHtml(response){
	return '<p class="flow-text">'+response+'</p>'
}