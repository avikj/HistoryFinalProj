$(document).ready( function(){
	var firebaseRef = new Firebase('https://japanception.firebaseio.com/users');
	var gameData = [
		{
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

	$('#name-form').submit(function (evt) {
	    evt.preventDefault();
	    if($('#name-input').val() == ''){
			Materialize.toast('Please enter your name.', 1200);
		}else{
			var playerName = $('#name-input').val();
			firebaseRef.push({
				name: playerName,
				score: 0
			});
			Materialize.toast('Added '+playerName+' to db.', 1200);
			$('#intro-description').addClass('animated bounceOutLeft');
			$('#name-form').addClass('animated bounceOutLeft');
			$('#name-form').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$('#name-form, #intro-description').remove();
				play(playerName);
			});
		}
	});

	function play(name){
		var level = 0;
		var score = 0;
		var clicked = false;
		$('#desc').html(gameData[level].desc);
		$('#score-display').html('score: '+score);
		for(var i = 0; i < 3; i++){
			$('#response'+i).html(createCardHtml(gameData[level].options[i].value));
			$('#response'+i).data('points', gameData[level].options[i].points);
		}
		$('.response').click(function(){
			if(!clicked){
				clicked = true;
				score += $(this).data('points');
				$('#score-display').html('score: '+score);
				// alert(score);
				//$('.response').addClass('animated bounceOutLeft');
				setTimeout(function(){
					$('#desc').html(gameData[level].desc);	

					$('#response0').addClass('animated bounceOut');
					$('#response0').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						$('#response0').html(createCardHtml(gameData[level].options[0].value));
						$('#response0').removeClass('animated bounceOut');
						$('#response0').addClass('animated bounceIn');
						$('#response0').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
							$('#response0').removeClass('animated bounceIn');
						});
					});		

					$('#response1').addClass('animated bounceOut');
					$('#response1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						$('#response1').html(createCardHtml(gameData[level].options[1].value));
						$('#response1').removeClass('animated bounceOut');
						$('#response1').addClass('animated bounceIn');
						$('#response1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
							$('#response1').removeClass('animated bounceIn');
						});
					});		

					$('#response2').addClass('animated bounceOut');
					$('#response2').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						$('#response2').html(createCardHtml(gameData[level].options[2].value));
						$('#response2').removeClass('animated bounceOut');
						$('#response2').addClass('animated bounceIn');
						$('#response2').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
							$('#response2').removeClass('animated bounceIn');
						});
					});		
					clicked = false;
				}, 300);

				level++;
				if(level == gameData.length){
					setTimeout(function(){
						$('#response-wrapper, #desc').remove();
					}, 300);
				}
			}
		});
	}

	function createCardHtml(response){
		return '<p class="flow-text">'+response+'</p>'
	}
});