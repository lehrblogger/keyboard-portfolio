<?php
	require('keyboardLogin.php');  //why does this break it with another inclusion?
	
function rebuildKeyboardHTML() {
	$keyboardFile = "../keyboard/index.html";
	$fh = fopen($keyboardFile, 'w');
	
	fwrite($fh, buildHTMlString());
	
	fclose($fh);
}

function buildHTMLContent() {
  	dbConnect();
	
	/*
	$selectAllQuery = "SELECT * FROM " . $table;
	$numRows = ;
	for ($i = 0; $i <= $numRows; $i++) {	
		$query = "SELECT * FROM " . $table ." LIMIT " . $i . ", 1";
		$keyData = dbArray( $query );
						
		$tempContent = "<div id='" . $keyData . "'>" . $keyData['name'] . "</div>";
		$content = $content . $tempContent;
	}
*/
	$content = "";
	
	$sql =  "SELECT * FROM " . dbTable();
	$result = mysql_query($sql);

	while ($row = mysql_fetch_assoc($result)) {
		$tempContent = "
	 		<div id='" . $row["key_char"] . "'>" . "
				"
				. $row["name"] . ": " . $row["text"] . "
			</div>
			";
		$content = $content . $tempContent;
	}
	
 	dbClose();
	return ( $content );
}

function buildHTMLString() {
	$header = "
		<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN'
		  'http://www.w3.org/TR/html4/strict.dtd'>
		<html>
		  <head>
		    <meta http-equiv='Content-type' content='text/html; charset=utf-8'>
		    <title>Keyboard Portfolio (in progress)</title>
		    <link rel='stylesheet' href='keyboard.css' type='text/css' media='screen' title='no title' charset='utf-8'>
		    <script type='text/javascript'>
		    <!--
			if(!console)
		    {
		      var console = {
		        log: function() {},
		        error: function() {},
		        warning: function() {}
		      };
		    }
			-->
		    </script>
			<script src='mootools-1.2-core.js' type='text/javascript' charset='utf-8'></script>
		    <script src='mootools-1.2-more.js' type='text/javascript' charset='utf-8'></script>

			<script src='keyboard.js' type='text/javascript' charset='utf-8'></script>
			<script src='key.js' type='text/javascript' charset='utf-8'></script>
		  </head>
		<body id='main' onload='init()'>
	";
	
	$footer = "
		</body>
		</html>
	";
	
	return ( $header . buildHTMLContent() . $footer );
}

?>

