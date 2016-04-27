<?php
header("Access-Control-Allow-Origin: *");

$startDate = $_GET['startdate'];
$endDate   = $_GET['enddate'];
$tableName = $_GET['tablename'];
$tableIDs  = file_get_contents("tableIDs.json");
$tableIDs  = json_decode($tableIDs, true);
$query     = $_GET['query'];

/*
$clientAddr = $_SERVER['REMOTE_ADDR'];


if(preg_match("/\d+\.\d+\.\d+\.\d+/",$clientAddr, $result) && strlen(file_get_contents($clientAddr))){

//echo "true";
}else{
echo "no";
exit();
}
 */

//&& preg_match("/(\d{4})-(\d{2})-(\d{2})/", $enddate, $results)
if (preg_match("/(\d{4})-(\d{2})-(\d{2})/", $startDate, $results)
	 && preg_match("/(\d{4})-(\d{2})-(\d{2})/", $endDate, $results2) && $tableIDs[$tableName] && $query == 'csvonly') {
	echo explode(" ", exec('./ona-get-data-and-run-extractor-csvonly.sh '.$startDate.' '.$endDate.' '.$tableName.' '.$tableIDs[$tableName]))[0];
} elseif (preg_match("/(\d{4})-(\d{2})-(\d{2})/", $startDate, $results)
	 && preg_match("/(\d{4})-(\d{2})-(\d{2})/", $endDate, $results2) && $tableIDs[$tableName]) {
	echo explode(" ", exec('./ona-get-data-and-run-extractor.sh '.$startDate.' '.$endDate.' '.$tableName.' '.$tableIDs[$tableName]))[0];
} else {
	echo "no";
}

?>
