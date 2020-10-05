<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';



  $mail = new PHPMailer(true);
  try {
    $mail->isSMTP();
    $mail->SMTPDebug =2;
    $mail->Debugoutput= 'html';                                  // Set mailer to use SMTP
    $mail->Host       = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'lebalexgr@yandex.ru';                     // SMTP username
    $mail->Password   = 'ySjdy27op';                               // SMTP password
    $mail->SMTPSecure = 'PHPMailer::ENCRYPTION_SMTPS';                                  // Enable TLS encryption, `ssl` also accepted
    $mail->Port       = 465;                                    // TCP port to connect to

    $mail->CharSet = 'utf-8';
    $mail->setFrom("lebalexgr@yandex.ru", 'Сообщение с сайта DSG Комплект');

    $mail->addAddress('lebalex@mail.ru');

    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = 'Test';
    $mail->Body = 'Проверка почты';


    //$mail->send();
    if (!$mail->send()) {
      echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
        echo "Message sent!";
    }
    //return '';
  } catch (Exception $e) {
    echo $e->getMessage();
  };

