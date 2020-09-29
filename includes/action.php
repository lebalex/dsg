<?php
include_once 'functions.php';
require 'sendmessage.php';
include_once 'psl-config.php';	

$action = getParam('action', '');


if($action=="message")
{
  $name = '';
  $email = '';
  $phone = '';
  $message = '';	

  $name = getParam('first_name', '');
  $email = getParam('email_address', '');
  $phone = getParam('phone_number', '');
  $message = getParam('comments', '');
  $captcha_token = getParam('token', '');
  $captcha_action=$action;
  $cart = array(
    "code" => -1
  );

  /*if (isset($_POST['token']) && isset($_POST['action'])) {
    $captcha_token = filter_input(INPUT_POST,'token');
    $captcha_action = filter_input(INPUT_POST,'action');


    $name = filter_input(INPUT_POST, 'name');
    $email = filter_input(INPUT_POST, 'mail');
    $phone = filter_input(INPUT_POST, 'phone');
    $message = filter_input(INPUT_POST, 'message');

} else {
    die('Капча работает некорректно. Обратитесь к администратору!');
}*/
 
$url = 'https://www.google.com/recaptcha/api/siteverify';
$params = [
    'secret' => '6LfIitEZAAAAAMx_Ioc_aPqwW3roI6VNtNn42dzS',
    'response' => $captcha_token,
    'remoteip' => $_SERVER['REMOTE_ADDR']
];
 
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
 
$response = curl_exec($ch);
if(!empty($response)) $decoded_response = json_decode($response);
 
$success = false;
 
if ($decoded_response && $decoded_response->success && $decoded_response->action == $captcha_action && $decoded_response->score > 0) {
    $success = $decoded_response->success;
    $r = sendMessage('Сообщение с сайта DSG Комплект', "Имя: ".$name." <br/>  Email: ".$email." <br/> Тел: ".$phone." <br/> Сообщение: ".$message, null);

    $cart = array(
      "code" => 0,"error" => $r
    );
   /* if()
    {
      $cart = array(
        "code" => 1,"error" => ""
      );
    }else
    {
      $cart = array(
        "code" => 0,
        "error" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"
      );
    }
    
  } else {
    // 
    $cart = array(
      "code" => 2,"error"=>"прописываем действие, если пользователь оказался ботом"
    );
}*/



echo json_encode( $cart );

}




?>





