<?php
include_once 'db_connect.php';
include_once 'functions.php';
 
sec_session_start(); // Our custom secure way of starting a PHP session.
 
if (isset($_POST['login'], $_POST['p'])) {
    $login = $_POST['login'];
    $password = $_POST['p']; // The hashed password.
 
    if (login($login, $password, $mysqli) == true) {
        // Login success 
        //header('Location: ../protected_page.php');
		header('Location: /admin/');
    } else {
        // Login failed 
        header('Location: /error.php?error=1');
		//echo $login." ".$password;
    }
} else {
    // The correct POST variables were not sent to this page. 
    echo 'Invalid Request';
}

?>