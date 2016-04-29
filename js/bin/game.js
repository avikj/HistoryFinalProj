$(document).ready( function(){
	var firebaseRef = new Firebase('https://japanception.firebaseio.com/users');
	var gameData = [{
			desc: "What u gonna do to those nazis",
			options: [
				{value: "Spit fire and roast them", points: 20},
				{value: "Eat them", points: 10},
				{value: "Send kamakazi pilots to bomb them", points: 30}
			]
		},
		{
			desc: "When u gonna do that",
			options: [
				{value: "Tomorrow", points: 30},
				{value: "Next week", points: 20},
				{value: "after they attack us", points: 10}
			]
		},
		{
			desc: "Who will lead this offensive?", 
			options: [
				{value: "I will.", points: 30},
				{value: "My most trusted army general", points: 10},
				{value: "Anish Patchipala", points: 20}
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