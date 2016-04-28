var firebaseRef = new Firebase('https://japanception.firebaseio.com/users');
firebaseRef.on('child_added', function(snapshot){
	Materialize.toast(snapshot.val().name+' scored '+snapshot.val().score, 1000);
});