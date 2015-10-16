<?php
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
 ?>
