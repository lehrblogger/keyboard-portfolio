<?php
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
	
	$absolutePath = "http://localhost/~palimpsest/keyboard-portfolio/cms/";
?>

<html>
<head>
  <title>Add/Update or Delete a Key</title>
  <link rel="stylesheet" href="http://localhost/~palimpsest/keyboard-portfolio/cms/cms.css"></link>
  <script type="text/javascript">
  <!--
  if(!console)
  {
    var console = {
      log: function() {},
      error: function() {},
      warning: function() {}
    };
  }
  //-->
  </script>
  <script src="http://localhost/~palimpsest/keyboard-portfolio/cms/mootools-1.2-core.js" type="text/javascript" charset="utf-8"></script>
  <script src="http://localhost/~palimpsest/keyboard-portfolio/cms/mootools-1.2-more.js" type="text/javascript" charset="utf-8"></script>
  <script language="javascript" type="text/javascript" src="http://localhost/~palimpsest/keyboard-portfolio/cms/editKey.js"></script>
</head>
<body id="main" onload="init()">

  Key : <input id='key_char' name='key_char' type='text' class='SmallTextField' maxlength="1" value=<? echo $key_char; ?>></input><br/>

  Row : <select id='row' name='row'>	
    <option value =""></option>
	<?php
    for ( $i = 0; $i < 3; $i++ )
    {
        if ( $row == $i) {
            echo "\t<option value=\"" . $i . "\" selected=\"selected\">" . $i . "</option>\n" ;
        } else {
            echo "\t<option value=\"" . $i. "\">" . $i . "</option>\n";
        }
    }
    ?>
  </select><br/>

  Col : <select id='col' name='col'>	
    <option value =""></option>
	<?php
    for ( $i = 0; $i < 11; $i++ )
    {
        if ( $col == $i) {
            echo "\t<option value=\"" . $i . "\" selected=\"selected\">" . $i . "</option>\n" ;
        } else {
            echo "\t<option value=\"" . $i. "\">" . $i . "</option>\n";
        }
    }
    ?>
  </select><br/>
    <!--http://matthom.com/archive/2006/02/13/javascript-set-selected-on-load-->
  Type: <input id='type' name='type' type='text' class='SmallTextField' maxlength="8"  value=<? echo $type; ?>></input><br/>
  Name: <input id='name' name='name' type='text' class='SmallTextField' maxlength="50" value=<? echo $name; ?>></input><br/>
  Slug: <input id='slug' name='slug' type='text' class='SmallTextField' maxlength="50" value=<? echo $slug; ?>></input><br/>
  Text: <textarea id='text' name='text' rows='10' cols='100' maxlength="5000" wrap='virtual' onload="checkCharacterCount(this, $('textCount'))" onkeypress="checkCharacterCount(this, $('textCount'))" onkeyup="checkCharacterCount(this, $('textCount'))"><? echo $text; ?></textarea><br/>
  <span id='textCount' name='textCount'>0</span> of 5000 maximum characters<br/>

  <br/>
  <input id='save' name='save' type='button' value='Add key to/Update key in database'></input>
  <input id='delete' name='delete' type='button' value='Delete key from database'></input>
</body>
</html>

