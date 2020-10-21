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


include_once 'functions.php';
header("Content-Type: application/json; charset=UTF-8");
 
sec_session_start();
 
if (isset($_POST['login'], $_POST['p'])) {
    $login = $_POST['login'];
    $password = $_POST['p'];

    if (login($login, $password) == true) {
        $jwt = createToken();
         $cart = array("code" => 0,"name" => $_SESSION['user']->getName(), "favouritet"=>getFavouritetDataCount(), "jwt" => $jwt);
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
        /*if(check_user_token($decoded->data))*/
        if(quick_check_user($decoded->data))
        {
            $jwt = createToken();
            $cart = array("code" => 0,"name" => $_SESSION['user']->getName(), "favouritet"=>getFavouritetDataCount(), "jwt" => $jwt);
        }else{
            logout(false);
            $cart = array("code" => -3,"error" => 'check_user_token - false');
        }
    }catch (Exception $e) {
        logout(false);
        $cart = array("code" => -2,"error" => $e->getMessage());
    }
    }else{
        logout(false);
        $cart = array("code" => -1,"error" => 'not jwt');
    }
    
    echo json_encode( $cart );

} else {
    
    echo 'Invalid Request';
}

function createToken()
{
    global $key;
    global $iss;
    global $aud;
    $iat = time()+10;
    $nbf = time()+20;
    $exp = time() + (60*60*24);//сутки
    try{
    $token = array(
        "iss" => $iss,
        "aud" => $aud,
        "iat" => $iat,
        "nbf" => $nbf,
        "exp" => $exp,
        "data" => array(
            "id" => $_SESSION['user']->getUser_id(),
            "name" => $_SESSION['user']->getName(),
            "login_string" => $_SESSION['user']->getLogin_string(),
            "email" => $_SESSION['user']->getLogin()
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