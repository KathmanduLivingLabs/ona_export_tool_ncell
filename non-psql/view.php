<?php
	header("Access-Control-Allow-Origin: *");
	//header('Content-Type: text/plain');

	$emis = $_GET['emis'];
	//$group = $_GET['group'];

	function tocSort($a, $b) {
		$a = preg_replace('/-has.*/ui', '', $a);
		$b = preg_replace('/-has.*/ui', '', $b);
	    if ($a == $b) {
	        return 0;
	    }
	    if(){
	    	return ($a < $b) ? -1 : 1;
	    }
	}


	

	if(!($emis) || !preg_match('/EMIS[0-9]+/', $emis)){
		echo "No record selected.";
	}else{
		$genDocList = array("$emis.pdf");
		//if($group=='schools'){
			exec("./htmlgen2.sh $emis schools");
		//}else if($group=='buildings'){
			exec("./htmlgen2.sh $emis buildings");
			
			//$data = file_get_contents('buildings.json');
			//echo $emis;
			//preg_match_all('/'.$emis.'-./', $data, $matches);
			//echo $data;
			//echo join(",", $matches[0]);
			//$genDoc = array_merge($matches);
		//}else{
			//$emis = preg_replace('/(EMIS)(\\d{2})/', "$1$2$2", $emis);
			exec("./htmlgen2.sh ".preg_replace('/(EMIS)(\\d{2})/', "$1$2$2", $emis)." building_elements");

			//$data = file_get_contents('building_elements.json');
			//echo $data;
			//preg_match_all('/'.$emis.'-\\w+-\\d+/', $data, $matches);
			//$genDoc = array_merge($matches);
			//echo join(",", $matches2[0]);

			$genDocList = explode(",",preg_replace('/.html/ui', "", exec("ls output/ | grep $emis | grep html | cut -d, -f2- | paste -sd,")));
			usort($genDocList, "tocSort");
			$baseFileName = $genDocList[0];

			$tocml = "<html><head></head><body><style>h4{display: inline-block; margin-left: 20px;}</style><h1>Table of Contents</h1>";
			$tocFileName = $baseFileName."-toc";

			$contents = "<div class='pagebreak' style='page-break-after: always; margin: 4em 0em; border-bottom: #999999 thin solid;'></div>";

			//$numPages = 2;

			//var_dump($genDocList);

			foreach($genDocList as $docName){
				//exec("html-pdf output/$docName.html output/$docName.pdf");
				//exec('xvfb-run --server-args="-screen 0, 1366x768x24" wkhtmltopdf output/'.$docName.'.html _temp/'.$docName.'.pdf');

				$contents .=file_get_contents("output/$docName.html")."<div class='pagebreak' style='page-break-after: always;'></div>";
				//EMIS250050003.html
				//php -r 'echo exec("xvfb-run --server-args=\"-screen 0, 1366x768x24\" --header-left=\"[webpage]\" --header-right=\"[page]/[toPage]\" --top 2cm --header-line wkhtmltopdf output/EMIS210490003-C.html _temp/EMIS210490003-C.pdf");'
				$tocml .= "<div class='toc'><h4>".preg_replace('/_/', '-', str_replace(".pdf", "", $docName))."</h4></div>";//."</h4>  ................  <h4>".$numPages."</h4></div>";
				//$numPages += intval(exec("pdfinfo _temp/$docName.pdf | grep Pages | awk '{print $2}'"));
			}

			$tocml .= $contents."</body></html>";

			echo preg_replace('/\.\.\/(.+-large.jpg)/ui', "$1", $tocml);;

			//file_put_contents("_temp/$tocFileName.html", $tocml);
			//exec("html-pdf _temp/$tocFileName.html _temp/$tocFileName.pdf");
			//exec('xvfb-run --server-args="-screen 0, 1366x768x24" wkhtmltopdf _temp/'.$tocFileName.'.html _temp/'.$tocFileName.'.pdf');

			//$genDocList = $tocFileName.".pdf ".implode(".pdf ", $genDocList).".pdf $emis-compiled.pdf";
			//exec("cd _temp; pdfunite $genDocList;");
			//header("Content-Type: application/binary");
			//header("Content-Disposition: attachment; filename=$emis-compiled.pdf");
			//echo file_get_contents("_temp/$emis-compiled.pdf");
			//exec("rm _temp/$emis*");
		}

?>
