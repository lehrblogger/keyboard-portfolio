<?php
//require('keyboardLogin.php');
	require('buildHTML.php');
	
	// show all errors
	ini_set('display_errors', true);
	ini_set('display_startup_errors', true);
	error_reporting( E_ALL );

	$key_char = '';
	$row = '';
	$col = '';
	$type = '';
	$name = '';
	$slug = '';
	$text = '';

	if( isset($_GET['key_char']) ) $key_char = $_GET['key_char'];  
	if( isset($_GET['row']) ) $row = $_GET['row'];
	if( isset($_GET['col']) ) $col = $_GET['col'];
	if( isset($_GET['type']) ) $type = $_GET['type'];
	if( isset($_GET['name']) ) $name = $_GET['name'];
	if( isset($_GET['slug']) ) $slug = $_GET['slug'];
	if( isset($_GET['text']) ) $text = $_GET['text'];

	
  	dbConnect();
  	
	$selectResult = "SELECT key_char FROM " . $table ." WHERE key_char='" . $key_char . "'";
	$selectedRows = dbQuery( $selectResult );
	$update = dbResultIsNotEmpty( $selectedRows );
	if ($update) {
		global $key_char, $row, $col, $type, $name, $slug, $text;
		//update
		$colsToUpdate = "";
		
		if ($row != '') $colsToUpdate = $colsToUpdate . "row='" . $row . "', ";
		if ($col != '') $colsToUpdate = $colsToUpdate . "col='" . $col . "', ";
		if ($type != '') $colsToUpdate = $colsToUpdate . "type='" . $type . "', ";
		if ($name != '') $colsToUpdate = $colsToUpdate . "name='" . $name . "', ";
		if ($slug != '') {
			if (strpos($slug, "%") === false)	{ //dont encode it twice
				$colsToUpdate = $colsToUpdate . "slug='" . urlencode($slug) . "', ";
			} else { 
				$colsToUpdate = $colsToUpdate . "slug='" . $slug . "', ";
			}
		}
		if ($text != '') $colsToUpdate = $colsToUpdate . "text='" . $text . "', ";
		
		$colsToUpdate = $colsToUpdate . "key_char='" . $key_char . "'"; //a hack to resolve the problem of that last comma
		
		$query = "UPDATE " . $table ." SET ". $colsToUpdate . " WHERE key_char='" . $key_char . "'";
		dbQuery( $query );
	} else {
			global $key_char, $row, $col, $type, $name, $slug, $text;
		//add
		$keyData = '( "' . $key_char . '", ' . $row . ', ' . $col . ', "' . $type . '", "' . $name . '", "' . $slug . '", "' . $text . '")';
		$query = "INSERT INTO " . $table ." (key_char, row, col, type, name, slug, text) values " . $keyData;
		dbQuery( $query );
	}
	
  	dbClose();
	rebuildKeyboardHTML();
?>