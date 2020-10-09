<?php
include_once '../includes/psl-config.php';
include_once '../includes/db_connect.php';
include_once '../includes/functions.php';


if (!check_user_session(['id' => $_SESSION['user_id'], 'email' => $_SESSION['login'], 'name' => $_SESSION['name'], 'login_string' => $_SESSION['login_string']])) {
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


