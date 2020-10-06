<?php
include_once '../includes/psl-config.php';
include_once '../includes/db_connect.php';
if (!check_login()){
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
    //header('HTTP/1.1 401 Unauthorized');
    //header("Status:401 Logout");
    //header("WWW-Authenticate: Invalidate, Basic realm=logout");
    header('Location: /index');
}

function check_login()
{
    if (isset($_SESSION['user_id'],
    $_SESSION['login'],
    $_SESSION['login_string'])) {

        $user_id = $_SESSION['user_id'];
        $login_string = $_SESSION['login_string'];
        $login = $_SESSION['login'];

        // Get the user-agent string of the user.
        $user_browser = $_SERVER['HTTP_USER_AGENT'];
        global $mysqli;
        if ($stmt = $mysqli->prepare("SELECT pwd 
              FROM dsg_users 
              WHERE id = ? LIMIT 1")) {
            // Bind "$user_id" to parameter. 
            $stmt->bind_param('i', $user_id);
            $stmt->execute();   // Execute the prepared query.
            $stmt->store_result();

            if ($stmt->num_rows == 1) {
                // If the user exists get variables from result.
                $stmt->bind_result($password);
                $stmt->fetch();
                $login_check = hash('sha512', $password . $user_browser);

                if ($login_check == $login_string) {
                    // Logged In!!!! 
                    return true;
                } else {
                    // Not logged in 
                    return false;
                }
            } else {
                // Not logged in 
                return false;
            }
        } else {
            // Not logged in 
            return false;
        }
    } else {
        // Not logged in 
        return false;
    }
}
