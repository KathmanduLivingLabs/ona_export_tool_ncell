<?php
	$dir = '/var/www/sida/ona-data-date-filtered-archives/non-psql/sidaOutput/';
	$scanned_directory = array_diff(scandir($dir), array('..', '.'));

	$dir_name = $_GET['dir_name'];

	if($dir_name == 'init') {
		foreach($scanned_directory as $item) {
			echo $item + ',';
		}
	} else {
			$dir += $dir_name;
			$scanned_directory = array_diff(scandir($dir), array('..', '.'));
			foreach($scanned_directory as $item) {
				echo $item + ',';
			}
	}
 ?>

