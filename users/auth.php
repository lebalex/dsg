<?php
include_once '../includes/psl-config.php';
include_once '../includes/db_connect.php';
include_once '../includes/functions.php';

$check = false;
if (isset($_SESSION['user']) && get_class($_SESSION['user']) == 'User_Model')
    $check = check_user_session(['id' => $_SESSION['user']->getUser_id(), 'email' => $_SESSION['user']->getLogin(), 'name' => $_SESSION['user']->getName(),
    'login_string' => $_SESSION['user']->getLogin_string()]);
if (!$check) {
    $_SESSION = array();

    // get session parameters 
    $params = session_get_cookie_params();

    // Delete the actual cookie. 
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );

    unset($_COOKIE[session_name()]);
    session_destroy();
    //header('HTTP/1.1 401 Unauthorized');
    //header("Status:401 Logout");
    //header("WWW-Authenticate: Invalidate, Basic realm=logout");
    header('Location: /index');
}


