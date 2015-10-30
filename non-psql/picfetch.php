<?php

$arr = file_get_contents("arraylist.txt");
$arr = explode(" ", $arr);

foreach($arr as $i){
	exec("./picfetch.sh ".$i);
}

?>
