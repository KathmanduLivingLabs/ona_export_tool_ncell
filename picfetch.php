<?php

$arr = file_get_contents("arraylist.txt");
$arr = explode(" ", $arr);

$total = count($arr);

echo "Files to download = ".$total."\n";

$starttime = time();

foreach($arr as $k=>$i){
	exec("./picfetch.sh ".$i);
	if(!($k%500)) {
		$timeelapsed = (time()-$starttime)/60;
		echo $k."/".$total." files downloaded..Time elapsed: ". $timeelapsed." minutes..\n";
	}
}

$timeelapsed = (time()-$starttime)/60;

echo "All files downloaded! Total time taken for operation: ".$timeelapsed." minutes.\n";

?>
