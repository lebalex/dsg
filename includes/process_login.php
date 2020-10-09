<?php

include_once 'php-jwt-master/src/BeforeValidException.php';
include_once 'php-jwt-master/src/ExpiredException.php';
include_once 'php-jwt-master/src/SignatureInvalidException.php';
include_once 'php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

date_default_timezone_set('Europe/Moscow');
 
// переменные, используемые для JWT 
$key = "cfqnLkzLheptq";
$iss = "https://www.dsgkomplekt.ru";
$aud = "https://www.dsgkomplekt.ru";
$iat = 1356999524;
$nbf = 1357000000;

include_once 'functions.php';
header("Content-Type: application/json; charset=UTF-8");
 
sec_session_start();
 
if (isset($_POST['login'], $_POST['p'])) {
    $login = $_POST['login'];
    $password = $_POST['p'];

    if (login($login, $password) == true) {
        $jwt = createToken();
         $cart = array("code" => 0,"name" => $_SESSION['name'], "favouritet"=>getFavouritetDataCount(), "jwt" => $jwt);
    } else {
        logout();
        $cart = array("code" => -1,"error" => '');
    }
    echo json_encode( $cart );
} else if(isset($_POST['jwt'])){
    $jwt = $_POST['jwt'];
    if($jwt!=null){
    try{
        $decoded = JWT::decode($jwt, $key, array('HS256'));
        if(check_user_token($decoded->data))
        {
            $jwt = createToken();
            $cart = array("code" => 0,"name" => $_SESSION['name'], "favouritet"=>getFavouritetDataCount(), "jwt" => $jwt);
        }else{
            logout();
            $cart = array("code" => -1,"error" => '');
        }
    }catch (Exception $e) {
        logout();
        $cart = array("code" => -1,"error" => $e);
    }
    }else
    $cart = array("code" => -1,"error" => 'not jwt');
    
    echo json_encode( $cart );

} else {
    
    echo 'Invalid Request';
}

function createToken()
{
    global $key;
    global $iss;
    global $aud;
    global $iat;
    global $nbf;
    try{
    $token = array(
        "iss" => $iss,
        "aud" => $aud,
        "iat" => $iat,
        "nbf" => $nbf,
        "data" => array(
            "id" => $_SESSION['user_id'],
            "name" => $_SESSION['name'],
            "login_string" => $_SESSION['login_string'],
            "email" => $_SESSION['login']
        )
     );
     $jwt = JWT::encode($token, $key);
     return $jwt;
    }catch(Exception $e)
    {
        return $e;
    }
}


?>