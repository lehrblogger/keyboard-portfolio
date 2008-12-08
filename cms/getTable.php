<?php
	require('keyboardLogin.php');
	
	// show all errors
	ini_set('display_errors', true);
	ini_set('display_startup_errors', true);
	error_reporting( E_ALL );

  	dbConnect();
//	$columnNameQuery = "SHOW COLUMNS FROM " . $table;
//	$columnArray = dbArray( $columnNameQuery );
//	$numColumns = mysql_num_rows( dbQuery( $columnNameQuery ) );
	
//	$columnNameArray;
//	$key_charLoc = 0;
//	for ($i = 0; $i < $numColumns - 1; $i++ ) {
//		$columnNameArray[$i] = $columnArray[$i];
//	}

  	$selectAllQuery = "SELECT * FROM " . $table . " ORDER BY row,col";
	$numRows = mysql_num_rows( dbQuery( $selectAllQuery ) );
	
//	$rows[0] = $columnNameArray;
	for ($i = 0; $i <= $numRows; $i++) {
		$query = "SELECT * FROM " . $table ." ORDER BY row,col LIMIT " . $i . ", 1";
		$rows[$i + 1] = dbAssocArray( $query );
	}

  	dbClose();

	echo json_encode($rows);
?>