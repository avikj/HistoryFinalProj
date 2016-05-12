$(document).ready(function(){
  var score = sessionStorage.getItem('japanception-score') ? parseInt(sessionStorage.getItem('japanception-score')) : 0;
  sessionStorage.removeItem('japanception-score');
  var clickedButton = false;
  var dir = 1;
  $slider = $('#slider');
  setInterval(function(){
    if(Math.abs($slider.val()) == 100)
      dir *= -1;
    $slider.val(parseInt($slider.val())+dir);
  }, 5);

  $('#bomb-button').click(function(){
    if(!clickedButton){
      clickedButton = true;
      dir = 0;
      score += 100-Math.abs($slider.val());
      Materialize.toast(getDescription(score), 1000);
      $('#thing').append('<div id="continue-button" class="row"><button class="col m4 offset-m4 btn-large center-align waves-effect animated bounceInUp">Continue</button></div>');
      $('#continue-button').click(function(){
        firebaseRef.push({
          name: sessionStorage.getItem('japanception-name'),
          score: score,
          timestamp: Date.now()
        });
        window.location = 'scoretable.html';
      });
    }
  });

  
});

function getDescription(score){
  if(score > 90)
    return 'Amazing! Your attack dealt maximal damage to Berlin.';
  if(score > 80)
    return 'Nice! Your attack was successful.';
  if(score > 70)
    return 'Your attack did some damage.';
  return 'You completely missed the target!';

}