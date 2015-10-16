<?php
	$dir = '/var/www/sida/ona-data-date-filtered-archives/non-psql/sidaOutput/';
	$scanned_directory = array_diff(scandir($dir), array('..', '.'));

	$dir_name = $_GET['dir_name'];
	$form_type = $_Get['form_type'];

	if($dir_name == 'init') {
		$dir += $form_type;
		$scanned_directory = array_diff(scandir($dir), array('..', '.'));
		foreach($scanned_directory as $item) {
			echo $item + ',';
		}
	} else {
			$dir += $form_type + '/' + $dir_name;
			$scanned_directory = array_diff(scandir($dir), array('..', '.'));
			foreach($scanned_directory as $item) {
				echo $item + ',';
			}
	}
 ?>
