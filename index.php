<?php

header("Access-Control-Allow-Origin: *");

$clientAddr = $_SERVER['REMOTE_ADDR'];
//$clientSessionCookie = $_COOKIE['session'];

$clientSessionCookie = $_GET['key'];

$requestURI    = $_SERVER['REQUEST_URI'];
$requestScript = $_SERVER['SCRIPT_NAME'];
$surveyorID = $_GET['surveyor_id'];

if (preg_match("/auth.php/", $requestURI)) {
	include_once "auth.php";
	exit();
}


if(!$clientSessionCookie){
	header('Content-Type: text/plain');
	echo "no";
	exit();
}

if(!$surveyorID){
	$surveyorID='';
}

$validAuth1 = explode('-',$clientSessionCookie)[0];

$validSurveyorID = exec("./getSurveyorId.sh $validAuth1");

if($surveyorID != $validSurveyorID){
	header('Content-Type: text/plain');
	echo "no";
	exit();
}

/*
if (preg_match("/.php/", $requestURI)) {
include_once $requestURI;
} else if (preg_match("/.jpg/", $requestURI) || preg_match("/.pdf/", $requestURI) || preg_match("/.csv/", $requestURI)) {
header("Pragma: public");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Content-Type: application/force-download");
header("Content-Type: application/octet-stream");
header("Content-Type: application/download");
header('Content-Length: '.filesize(str_replace('/', '', $requestURI)));
header("Content-Disposition: attachment;filename=".str_replace('/', '', $requestURI));
header("Content-Transfer-Encoding: binary ");
echo file_get_contents(str_replace('/', '', $requestURI));
} else if (preg_match("/.html/", $requestURI)) {
header('Content-Type: text/html');
echo file_get_contents(str_replace('/', '', $requestURI));
} else {
header('Content-Type: text/plain');
echo "no";
exit();
}
 */

if (preg_match("/\d+\.\d+\.\d+\.\d+/", $clientAddr, $result)) {
	$validSessionCookieForClient = file_get_contents($clientAddr.'.addr');
	if (preg_match("/\w+-\w+/", $validSessionCookieForClient, $validCookieHash) && $clientSessionCookie == $validCookieHash[0]) {
		if (preg_match("/.php/", $requestURI)) {
			include_once '.'.$requestScript;
		} else if (preg_match("/.jpg/", $requestURI)) {
			header('Content-Type: image/jpeg');
			echo file_get_contents('.'.$requestScript);
		} else if (preg_match("/.pdf/", $requestURI) || preg_match("/.zip/", $requestURI) || preg_match("/.csv/", $requestURI)) {
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");
			header('Content-Length: '.filesize('.'.$requestScript));
			header("Content-Disposition: attachment;filename=".str_replace('/', '', $requestScript));
			header("Content-Transfer-Encoding: binary ");
			echo file_get_contents('.'.$requestScript);
		} else if (preg_match("/.html/", $requestURI)) {
			header('Content-Type: text/html');
			echo file_get_contents('.'.$requestScript);
		} else {
			header('Content-Type: text/plain');
			echo "no";
			exit();
		}
	} else {
		header('Content-Type: text/plain');
		echo "no";
		exit();
	}
} else {
	header('Content-Type: text/plain');
	echo "no";
	exit();
}

?>