<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

include_once 'psl-config.php';	

function sendMessage($subject, $message,$email_client){
    $mail = new PHPMailer(true);
    try {
      $mail->isSMTP();                                            // Set mailer to use SMTP
      $mail->Host       = 'smtp.gmail.com';  // Specify main and backup SMTP servers
      $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
      $mail->Username   = 'lebalex.app@gmail.com';                     // SMTP username
      $mail->Password   = 'ySjdy27op';                               // SMTP password
      $mail->SMTPSecure = 'tls';                                  // Enable TLS encryption, `ssl` also accepted
      $mail->Port       = 587;                                    // TCP port to connect to
    
      $mail->CharSet = 'utf-8';
      $mail->setFrom(DEFAULT_EMAIL, 'Сообщение с сайта DSG Комплект');
      $mail->addAddress(DEFAULT_EMAIL);     // Add a recipient
      if($email_client!=null){
        $mail->AddBCC($email_client, "Копия");
        $mail->AddCC($email_client, "Копия");
      }
      $mail->isHTML(true);                                  // Set email format to HTML
      //$mail->Subject = 'Сообщение с сайта ООО РУССКИЕ ТРАДИЦИИ';
      //$mail->Body    =  "Имя: ".$name." <br/>  Email: ".$email." <br/> Тел: ".$phone." <br/> Сообщение: ".$message;
      $mail->Subject = $subject;
      $mail->Body = $message;


        $mail->send();
        return '';
    } catch (Exception $e) {
      return $e->getMessage();
    };
}