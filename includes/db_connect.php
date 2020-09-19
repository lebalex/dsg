<?php

include_once 'psl-config.php';
 //$mysql = mysql_connect(HOST, USER, PASSWORD);
 //mysql_select_db(DATABASE) ;
 $mysqli = new mysqli(HOST, USER, PASSWORD, DATABASE);
//mysqli_set_charset($mysqli, "utf-8");
$mysqli->set_charset("utf8");
 ?>