<?php
require 'sendmessage.php';
include_once 'psl-config.php';				
$action= filter_input(INPUT_POST, 'action');				


if($action=="message")
{
  $name = '';
  $email = '';
  $phone = '';
  $message = '';	

  if (isset($_POST['token']) && isset($_POST['action'])) {
    $captcha_token = filter_input(INPUT_POST,'token');
    $captcha_action = filter_input(INPUT_POST,'action');


    $name = filter_input(INPUT_POST, 'name');
    $email = filter_input(INPUT_POST, 'mail');
    $phone = filter_input(INPUT_POST, 'phone');
    $message = filter_input(INPUT_POST, 'message');

} else {
    die('Капча работает некорректно. Обратитесь к администратору!');
}
 
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
    // обрабатываем данные формы, которая защищена капчей
    if(sendMessage('Сообщение с сайта DSG Комплект', "Имя: ".$name." <br/>  Email: ".$email." <br/> Тел: ".$phone." <br/> Сообщение: ".$message, null))
    {
      $cart = array(
        "code" => 1
      );
    }else
    {
      $cart = array(
        "code" => 0,
        "error" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"
      );
    }
    
  } else {
    // прописываем действие, если пользователь оказался ботом
    $cart = array(
      "code" => 2
    );
}
 
//echo json_encode($success);


echo json_encode( $cart );
/*
			
$name = '';
$mail = '';
$phone = '';
$message = '';	
$name = filter_input(INPUT_POST, 'name');
$mail = filter_input(INPUT_POST, 'mail');
$phone = filter_input(INPUT_POST, 'phone');
$message = filter_input(INPUT_POST, 'message');


$to  = DEFAULT_EMAIL;



$subject = "Сообщение с сайта"; 

$message = ' 
<html> 
    <head> 
        <title>Сообщение с сайта</title> 
    </head> 
    <body> 
        <p>Имя:'. $name .'</p> 
		<p>Почта:'.$mail .'</p> 
		<p>Тел:'.$phone .'</p> 
		<p>Сообщение:'. $message .'</p> 
    </body> 
</html>'; 

$headers  = "Content-type: text/html; charset=UTF-8 \r\n"; 


if(mail($to, $subject, $message, $headers))
{
$cart = array(
  "code" => 1,
  "shopperName" => "Ваня Иванов"
);

}else
{
$cart = array(
  "code" => 0,
  "shopperName" => "Ваня Иванов"
);

}

echo json_encode( $cart );	*/
}




?>





