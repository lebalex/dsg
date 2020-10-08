<?php
include_once 'functions.php';
header("Content-Type: application/json; charset=UTF-8");
 
sec_session_start(); // Our custom secure way of starting a PHP session.
 
if (isset($_POST['login'], $_POST['p'])) {
    $login = $_POST['login'];
    $password = $_POST['p']; // The hashed password.

    if (login($login, $password) == true) {
        //header('Location: /users/account');
        $cart = array("code" => 0,"name" => $_SESSION['name'], "favouritet"=>getFavouritetDataCount());
    } else {
        $cart = array("code" => -1,"error" => '');
        //header('Location: /error.php?error=authenticated');
    }
    echo json_encode( $cart );
} else {
    // The correct POST variables were not sent to this page. 
    echo 'Invalid Request';
}

?>