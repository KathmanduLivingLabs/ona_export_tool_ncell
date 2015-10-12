<?php

$startDate = $_GET['startdate'];
$endDate = $_GET['enddate'];
$tableName = $_GET['tablename'];
$tableIDs = file_get_contents("tableIDs.json");
$tableIDs = json_decode($tableIDs, true);

//&& preg_match("/(\d{4})-(\d{2})-(\d{2})/", $enddate, $results)
if(preg_match("/(\d{4})-(\d{2})-(\d{2})/", $startDate, $results) && preg_match("/(\d{4})-(\d{2})-(\d{2})/", $endDate, $results) && $tableIDs[$tableName]){
	echo exec('./ona-get-data-and-run-extractor.sh '.$startDate.' '.$endDate.' '.$tableName.' '.$tableIDs[$tableName]);
}else{
	echo "no";
}

?>