<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: text/plain');

$authString1 = $_POST['auth1'];
$authString2 = $_POST['auth2'];

$validAuth1 = exec("./authgen1.sh");
$validAuth2 = exec("./authgen2.sh");

$authString2Calc = exec("echo $authString2 | openssl enc -base64 -d | openssl enc -aes-256-cbc -k $validAuth2 -d");

$clientAddr = $_SERVER['REMOTE_ADDR'];

if($authString1 == $validAuth1 && $authString2Calc == $validAuth2){
	if(preg_match("/\d+\.\d+\.\d+\.\d+/",$clientAddr, $result)){
		file_put_contents($clientAddr, 'true');
	
	echo "true";
}else{
	echo "false";
}
}else{
	echo "false";
}

?>
