<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: text/plain');

$authString1 = $_POST['auth1'];
$authString2 = $_POST['auth2'];

if(!($authString1 && $authString2)){
	echo "false";
	exit();
}

if(preg_match("/\W/", $authString1, $c)){
	echo "false";
	exit();
}

$validAuth1 = exec("./authgen1.sh $authString1");
$validAuth2 = exec("./authgen2.sh $validAuth1");

$authString2Calc = exec("echo $authString2 | openssl enc -base64 -d | openssl enc -aes-256-cbc -k $validAuth2 -d");

$clientAddr = $_SERVER['REMOTE_ADDR'];

if($authString1 == $validAuth1 && $authString2Calc == $validAuth2){
	if(preg_match("/\d+\.\d+\.\d+\.\d+/",$clientAddr, $result)){
		$logfile = fopen('authlog.log','a');
		file_put_contents($clientAddr, 'true'); //very bad hack; TODO: fix this
		date_default_timezone_set('America/New_York');
		fwrite($logfile,date("Y-m-d h:i:s/a T")."\t".$authString1."\t".$clientAddr."\n");
		fclose($logfile);
	
	echo "true";
}else{
	echo "false";
}
}else{
	echo "false";
}

?>
