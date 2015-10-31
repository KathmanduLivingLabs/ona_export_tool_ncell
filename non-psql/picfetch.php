<?php

$arr = file_get_contents("arraylist.txt");
$arr = explode(" ", $arr);

foreach($arr as $k=>$i){
	exec("./picfetch.sh ".$i);
	if(!($k%500)) echo $k;
}

?>
