<?php

// change this to your info, store this file OUTSIDE you public_html folder
$host = 'localhost:3306';  //'172-26-14-225.DYNAPOOL.NYU.EDU:3306';
$username = 'phptester';
$password = 'tak4yin8anck9ic';
$database = 'keyboard';

$table = $database . '.partial_keys';

error_reporting( E_ALL );

function dbConnect() {
  global $username, $password, $database, $host;
  mysql_connect( $host, $username, $password ) or die ("Unable to connect to database for " . $username );
  mysql_select_db( $database ) or die ("Unable to select database " . $database . " for " . $username );
}

function dbQuery( $aQuery ) {
  return mysql_query( $aQuery );
}

function dbTable() {
	global $table;
	return ( $table );
}

function dbArray( $aQuery ) {
  return mysql_fetch_array( dbQuery( $aQuery ) );
}

function dbAssocArray( $aQuery ) {
  return mysql_fetch_assoc( dbQuery( $aQuery ) );
}

function dbClose() {
  mysql_close();
}

function dbResultIsNotEmpty( $result ) {
  return (mysql_num_rows( $result ) != 0);
}

?>