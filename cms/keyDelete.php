<?php
//	require('keyboardLogin.php');
	require('buildHTML.php');
	
	// show all errors
	ini_set('display_errors', true);
	ini_set('display_startup_errors', true);
	error_reporting( E_ALL );

	$key_char = '';

	if( isset($_GET['key_char']) ) $key_char = $_GET['key_char'];  
	
  	dbConnect();
  	$query = "DELETE FROM " . $table ." WHERE key_char='" . $key_char . "'";
  	$result = dbQuery( $query );

  	dbClose();
	rebuildKeyboardHTML();
?>