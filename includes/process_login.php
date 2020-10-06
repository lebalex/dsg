<?php
include_once 'functions.php';
 
sec_session_start(); // Our custom secure way of starting a PHP session.
 
if (isset($_POST['login'], $_POST['p'])) {
    $login = $_POST['login'];
    $password = $_POST['p']; // The hashed password.
 
    if (login($login, $password) == true) {
        // Login success 
        //header('Location: ../protected_page.php');
		header('Location: /users/account');
    } else {
        // Login failed 
        header('Location: /error.php?error=authenticated');
		//echo $login." ".$password;
    }
} else {
    // The correct POST variables were not sent to this page. 
    echo 'Invalid Request';
}

?>