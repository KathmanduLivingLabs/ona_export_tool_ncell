<?php
	header("Access-Control-Allow-Origin: *");
	header('Content-Type: text/plain');

	$emis = $_GET['emis'];
	$group = $_GET['group'];

	if(!($emis && $group)){
		echo exec('./ona-list-emis.sh');
	}else{
		if($group=='schools'){
			exec("./htmlgen.sh $emis $group");
		}else if($group=='buildings'){
			exec("./htmlgen.sh $emis $group");
			
			$data = file_get_contents('buildings.json');
			//echo $emis;
			preg_match_all('/'.$emis.'-./', $data, $matches);
			//echo $data;
			echo join(",", $matches[0]);
		}else{
			$emis = preg_replace('/(EMIS)(\\d{2})/', "$1$2$2", $emis);
			exec("./htmlgen.sh $emis $group");

			$data = file_get_contents('building_elements.json');
			//echo $data;
			preg_match_all('/'.$emis.'-\\w+-\\d+/', $data, $matches);
			echo join(",", $matches[0]);
		}
	}
?>