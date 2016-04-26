<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: text/plain');

$clientAddr          = $_SERVER['REMOTE_ADDR'];
$clientSessionCookie = $_COOKIE['session'];

if (preg_match("/\d+\.\d+\.\d+\.\d+/", $clientAddr, $result)) {
	$validSessionCookieForClient = file_get_contents($clientAddr.'.addr');
	if (!(preg_match("/\w+/", $validSessionCookieForClient, $validCookieHash) && $clientSessionCookie == $validCookieHash[0])) {
		echo "no";
		exit();
	}
} else {
	echo "no";
	exit();
}

var_dump($_SERVER);

?>