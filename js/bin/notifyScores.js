var firebaseRef = new Firebase('https://japanception.firebaseio.com/users');
var startTime = Date.now();
firebaseRef.on('child_added', function(snapshot){
	var data = snapshot.val();
	if(data.timestamp > startTime)
		Materialize.toast(data.name+' scored '+data.score, 1000);
});