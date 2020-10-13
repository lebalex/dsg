<?php
include_once '../includes/functions.php';
sec_session_start();
 
// Unset all session values 
$_SESSION = array();
 
// get session parameters 
$params = session_get_cookie_params();
 
// Delete the actual cookie. 
setcookie(session_name(),
        '', time() - 42000, 
        $params["path"], 
        $params["domain"], 
        $params["secure"], 
        $params["httponly"]);
 
        unset($_COOKIE[session_name()]);
session_destroy();
header('HTTP/1.1 402 Unauthorized');
//header("Status:401 Logout");
header("WWW-Authenticate: Invalidate, Basic realm=logout");

?>
<html>
<head>
<meta http-equiv="refresh" content="0;URL=/index">
</head>
</html>
