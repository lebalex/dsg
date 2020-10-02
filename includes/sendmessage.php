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
      $mail->isSMTP();     
      //$mail->SMTPDebug =2;
      //$mail->Debugoutput= 'html';                                  // Set mailer to use SMTP
      $mail->Host       = 'mail.dsgkomplekt.ru';  // Specify main and backup SMTP servers
      //$mail->SMTPAuth   = true;                                   // Enable SMTP authentication
      //$mail->Username   = '@gmail.com';                     // SMTP username
      //$mail->Password   = '';                               // SMTP password
      //$mail->SMTPSecure = 'tls';                                  // Enable TLS encryption, `ssl` also accepted
      $mail->Port       = 25;                                    // TCP port to connect to
    
      $mail->CharSet = 'utf-8';
      $mail->setFrom("noreplay@dsgkomplekt.ru", 'Сообщение с сайта DSG Комплект');
      $mail->addAddress(DEFAULT_EMAIL);     // Add a recipient
      $mail->addAddress('lebalex@mail.ru'); 
      if($email_client!=null){
        $mail->AddBCC($email_client, "Копия");
        $mail->AddCC($email_client, "Копия");
      }
      $mail->isHTML(true);                                  // Set email format to HTML
      //$mail->Subject = 'Сообщение с сайта ООО РУССКИЕ ТРАДИЦИИ';
      //$mail->Body    =  "Имя: ".$name." <br/>  Email: ".$email." <br/> Тел: ".$phone." <br/> Сообщение: ".$message;
      $mail->Subject = $subject;
      $mail->Body = $message;


        //$mail->send();
        if (!$mail->send()) {
          return "Mailer Error: " . $mail->ErrorInfo;
      } else {
        return "Message sent!";
      }
        //return '';
    } catch (Exception $e) {
      return $e->getMessage();
    };
}