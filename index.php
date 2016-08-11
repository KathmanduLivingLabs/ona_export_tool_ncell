<?php

header("Access-Control-Allow-Origin: *");

$requestURI    = $_SERVER['REQUEST_URI'];
$requestScript = $_SERVER['SCRIPT_NAME'];

if (preg_match("/auth.php/", $requestURI)) {
	include_once "auth.php";
	exit();
}

include_once '.'.$requestScript;

?>