<?php
	/*
	header("Access-Control-Allow-Origin: *");

	$dir = '/var/www/sida/ona-data-date-filtered-archives/non-psql/SIDAHTML/';

	$dir_name = $_GET['dir_name'];
	$form_type = 'output_' . $_GET['form_type'];

	if($dir_name == 'init') {
		$dir .= $form_type;
		$scanned_directory = scandir($dir);
		foreach($scanned_directory as $item) {
			echo $item . ',';
		}
	} else {
			$dir .= $form_type . '/' . $dir_name;
			$scanned_directory = scandir($dir);
			foreach($scanned_directory as $item) {
				echo $item . ',';
			}
	}
 */

	header("Access-Control-Allow-Origin: *");

	$dir = '/var/www/sida/ona-data-date-filtered-archives/non-psql/SIDAHTML/';
	$scanned_directory_school = scandir($dir . 'output_school');
	$scanned_directory_buildings = scandir($dir . 'output_buildings');
	$scanned_directory_building_elements = scandir($dir . 'output_building_elements');

	$output = array();
	foreach($scanned_directory_school as $item) {
		if($item == '.' || $item == '..' | $item == '.DS_Store')
			continue;
		$file_inside = scandir($dir . 'output_school' . '/' . $item);
		$temp = array();
		$i = 0;
		foreach($file_inside as $entry) {
			if($entry == '.' || $entry == '..' | $entry == '.DS_Store') {
				$i = $i + 1;
				continue;
			}
			//$output[$item][$i] = $entry;
			$temp[$i] = $entry;
			$i = $i + 1;
		}
		$temp = array_values($temp);
		$output[$item] = $temp;
	}
	foreach($scanned_directory_buildings as $item) {
		if($item == '.' || $item == '..' | $item == '.DS_Store')
			continue;
		$file_inside = scandir($dir . 'output_buildings' . '/' . $item);
		$temp = array();
		$i = 0;
		foreach($file_inside as $entry) {
			if($entry == '.' || $entry == '..' | $entry == '.DS_Store') {
				$i = $i + 1;
				continue;
			}
			$temp[$i] = $entry;
			$i = $i + 1;
		}
		$temp = array_values($temp);
		$output[$item] = $temp;
	}
	foreach($scanned_directory_building_elements as $item) {
		if($item == '.' || $item == '..' | $item == '.DS_Store')
			continue;
		$file_inside = scandir($dir . 'output_building_elements' . '/' . $item);
		$temp = array();
		$i = 0;
		foreach($file_inside as $entry) {
			if($entry == '.' || $entry == '..' | $entry == '.DS_Store') {
				$i = $i + 1;
				continue;
			}
			$temp[$i] = $entry;
			$i = $i + 1;
		}
		$temp = array_values($temp);
		$output[$item] = $temp;
	}

	$json = json_encode($output);
	echo $json;

?>
