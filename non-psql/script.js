$(document).ready(function(){
	var QUERY_URL = 'http://45.55.41.12:8000/script.php'
	var SERVER_URL = 'http://45.55.41.12:8000/'
	var fromDate = '';
	var toDate = ''
	var formType = '';
	new Pikaday({
		field: $('#from_datepicker')[0],
		format: 'YYYY-MM-DD',
		onSelect: function() {
			fromDate = moment(this._d).format('YYYY-MM-DD');
		}
	});
	new Pikaday({
		field: $('#to_datepicker')[0],
		format: 'YYYY-MM-DD',
		onSelect: function() {
			toDate = moment(this._d).format('YYYY-MM-DD');
		}
	});

	$('#submit_btn').click(function(e) {
		var formType = $('.form-type')[0];
		formType = formType.options[formType.selectedIndex].value;
		var query = QUERY_URL + '?startdate=' + fromDate + '&enddate=' +
								toDate + '&tablename=' + formType;
		console.log(query);
		$.get(query, function(data) {
			console.log(data);
			var zipName = data.split(' ')[0];
			$('<a href="' + SERVER_URL + zipName + '">Download Zipped ' + 
					zipName.split('_')[0].toUpperCase() + 'data</a>').appendTo('.container');
		});
	});
});
