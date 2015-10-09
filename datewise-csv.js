#!/usr/bin/node

var pg = require('pg');
var fs = require('fs');

var conString = "postgres://" + process.argv[2] +":"+ process.argv[3] + "@localhost:5432/sida";

pg.connect(conString, function(err, client, done) {
	if (err) {
		return console.error('error fetching client from pool', err);
	}

	//client.query('drop table if exists school;');
	//client.query('create table school as select jsonarray_to_hstoreset($1::json) as data;', [dataFile]);
	//client.query('alter table school add column xid serial;');

	client.query("select * from school where ((data->'_version')::timestamp)>$1::timestamp and ((data->'_version')::timestamp)<$2::timestamp;", [process.argv[4], process.argv[5]], function(err, result) {
		//call `done()` to release the client back to the pool
		done();

		if (err) {
			return console.error('error running query', err);
		}
		if(!result.rows[0]){
			console.log("no data for query");
			return;
		}

		console.log(result.rows[0].data);
		//output: 1
		client.end();
		return;
	});
	return;
});