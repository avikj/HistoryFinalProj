$(document).ready(function(){
	var tableData = [];
	var firebaseRef = new Firebase('https://japanception.firebaseio.com/users');
	firebaseRef.on('child_added', function(snapshot){
		tableData.push(snapshot.val());
		displayTable();
		console.log(JSON.stringify(snapshot.val(), null, 4));
	});

	function displayTable(){
		var $tableBody = $('#scoretable-body');
		tableData.sort(function(a, b){
			return b.score-a.score;
		});
		$tableBody.empty();
		for(var i = 0; i < tableData.length; i++)
			$tableBody.append(createRow(tableData[i]));''
	}
});

function createRow(data){
	return $('<tr><td class="animated fadeIn">'+
			data.name+
		'</td><td class="animated fadeIn">'
			+data.score+
		'</td></tr>');
}