<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/plain');

$emis  = isset($_GET['emis'])? $_GET['emis']: false;
$query = isset($_GET['query'])? $_GET['query']: false;
//$group = $_GET['group'];
$surveyor_id = isset($_GET['surveyor_id'])? $_GET['surveyor_id']: false;
$session_key = isset($_GET['key'])? $_GET['key']: false;

if ($query == 'gettimestamp') {
	$updateTime = file_get_contents(".updatetime");
	echo time()-$updateTime;
	exit();
}

/*
$clientAddr = $_SERVER['REMOTE_ADDR'];

if (preg_match("/\d+\.\d+\.\d+\.\d+/", $clientAddr, $result) && strlen(file_get_contents($clientAddr))) {

//echo "true";
} else {
echo "no";
exit();
}
 */

function tocSort($a, $b) {
	$a = preg_replace('/.has.*/ui', '', $a);
	$b = preg_replace('/.has.*/ui', '', $b);
	if ($a == $b) {
		return 0;
	}
	return ($a < $b)?-1:1;
}
//echo exec('./ona-list-emis.sh '.$surveyor_id);
if (!($emis)) {
	if ($surveyor_id) {
		echo exec('./ona-list-emis.sh '.$surveyor_id);
	} else {
		echo exec('./ona-list-emis.sh 999');
	}
} elseif(!preg_match('/^EMIS[0-9]{5}[a-zA-Z0-9]{4}$/', $emis)){
	echo "No record selected.";
} else if (!preg_match('/^[a-zA-z]{4,16}-[a-f0-9]{32}$/', $session_key)) {
	echo "Invalid session. Please login again.";
} elseif (preg_match("/EMIS\d+/", $emis, $tmp)) {
	$genDocList = array("$emis.pdf");
	//if($group=='schools'){
	exec("./htmlgen2.sh $emis schools $session_key");
	//}else if($group=='buildings'){
	//exec("./htmlgen2.sh $emis buildings $session_key");

	//$data = file_get_contents('buildings.json');
	//echo $emis;
	//preg_match_all('/'.$emis.'-./', $data, $matches);
	//echo $data;
	//echo join(",", $matches[0]);
	//$genDoc = array_merge($matches);
	//}else{
	//$emis = preg_replace('/(EMIS)(\\d{2})/', "$1$2$2", $emis);
//	exec("./htmlgen2.sh ".preg_replace('/(EMIS)(\\d{2})/', "$1$2$2", $emis)." building_elements $session_key");

	//$data = file_get_contents('building_elements.json');
	//echo $data;
	//preg_match_all('/'.$emis.'-\\w+-\\d+/', $data, $matches);
	//$genDoc = array_merge($matches);
	//echo join(",", $matches2[0]);

	$genDocList = explode(",", preg_replace('/.html/ui', "", exec("ls output/ | grep $emis | grep html | cut -d, -f2- | paste -sd,")));
	//asort($genDocList);
	usort($genDocList, "tocSort");
	$baseFileName = $genDocList[0];

	$tocml       = "<html><head><title>$emis Compiled</title></head><body><style>h4{display: inline-block; margin-left: 20px;}</style><h1>Table of Contents</h1>";
	$tocFileName = $baseFileName."-toc";

	$numPages = 2;

	//var_dump($genDocList);

	foreach ($genDocList as $docName) {
		//exec("html-pdf output/$docName.html output/$docName.pdf");
		//exec('xvfb-run --server-args="-screen 0, 1366x768x24" wkhtmltopdf output/'.$docName.'.html _temp/'.$docName.'.pdf');
		exec('wkhtmltopdf output/'.$docName.'.html _temp/'.$docName.'.pdf');
		//EMIS250050003.html
		//php -r 'echo exec("xvfb-run --server-args=\"-screen 0, 1366x768x24\" --header-left=\"[webpage]\" --header-right=\"[page]/[toPage]\" --top 2cm --header-line wkhtmltopdf output/EMIS210490003-C.html _temp/EMIS210490003-C.pdf");'
		$tocml .= "<div><h4>".preg_replace('/-has-([0-9]+)-(.+)-(.+)-(.+)/ui', " has $1 $2 $3 $4", preg_replace('/_/', '-', str_replace(".pdf", "", $docName)))."</h4>  ................  <h4>".$numPages."</h4></div>";
		$numPages += intval(exec("pdfinfo _temp/$docName.pdf | grep Pages | awk '{print $2}'"));
	}

	$tocml .= "</body></html>";

	file_put_contents("_temp/$tocFileName.html", $tocml);
	//exec("html-pdf _temp/$tocFileName.html _temp/$tocFileName.pdf");
	exec('wkhtmltopdf _temp/'.$tocFileName.'.html _temp/'.$tocFileName.'.pdf');

	$genDocList = $tocFileName.".pdf ".implode(".pdf ", $genDocList).".pdf $emis-compiled.pdf";
	exec("cd _temp; pdfunite $genDocList;");
	header("Content-Type: application/binary");
	header("Content-Disposition: attachment; filename=$emis-compiled.pdf");
	echo file_get_contents("_temp/$emis-compiled.pdf");
	//exec("rm _temp/$emis*");
}

?>
