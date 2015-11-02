<?php
	header("Access-Control-Allow-Origin: *");
	header('Content-Type: text/plain');

	$emis = $_GET['emis'];
	$group = $_GET['group'];

	try{
		$updateTime = file_get_contents(".updatetime"); 
	}catch(Exception $e){
		$updateTime = time();
	} 

	if(time()-$updateTime > 86400){
		exec("./fetchPhotos.sh");
		exec("./fetchData.sh");
		$updateTime = time();
		file_put_contents(".updatetime", $updateTime);
	}

	

	if(!($emis)){
		echo exec('./ona-list-emis.sh');
	}else{
		$genDocList = array("$emis.pdf");
		//if($group=='schools'){
			exec("./htmlgen.sh $emis schools");
		//}else if($group=='buildings'){
			exec("./htmlgen.sh $emis buildings");
			
			//$data = file_get_contents('buildings.json');
			//echo $emis;
			//preg_match_all('/'.$emis.'-./', $data, $matches);
			//echo $data;
			//echo join(",", $matches[0]);
			//$genDoc = array_merge($matches);
		//}else{
			//$emis = preg_replace('/(EMIS)(\\d{2})/', "$1$2$2", $emis);
			exec("./htmlgen.sh $emis building_elements");

			//$data = file_get_contents('building_elements.json');
			//echo $data;
			//preg_match_all('/'.$emis.'-\\w+-\\d+/', $data, $matches);
			//$genDoc = array_merge($matches);
			//echo join(",", $matches2[0]);

			$genDocList = explode(",",preg_replace(/.html/giu, "", exec("ls output/ | grep $emis*.html | cut -d, -f2- | paste -sd,")));
			asort($genDocList);
			$baseFileName = array_pop($genDocList);
			array_unshift($genDocList, $baseFileNamebase);

			$tocml = "<html><head></head><body><style></style><h1>Table of Contents</h1>";
			$tocFileName = $baseFileName."-toc";

			foreach($genDocList as $docName){

				exec("html-pdf output/$docName.html output/$docName.pdf");

				$numPages = intval(exec("pdfinfo output/$docName.pdf | grep Pages | awk '{print $2}'"));

				$tocml .= "<div><h4>".str_replace(".html.pdf", "", $docName)."</h4>  ................  <h4>".$numPages."</h4></div>";
			}

			$tocml .= "</body></html>";

			file_put_contents("output/$tocFileName.html", $tocml);
			exec("html-pdf output/$tocFileName.html output/$tocFileName");

			$genDocList = $tocFileName.".pdf ".implode(".pdf ", $genDocList).".pdf $emis-compiled.pdf";
			exec("cd output; pdfunite $genDocList;");
			header('Content-Type: application/binary');
			header('Content-Disposition: attachment');
			echo file_get_contents("output/$emis-compiled.pdf");
		}
	}
?>