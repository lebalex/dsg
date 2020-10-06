<?php
include_once 'psl-config.php';
include_once 'db_connect.php';

function getParam($name, $default)
{
    $res = filter_input(INPUT_POST, $name);
    if($res==NULL) $res = filter_input(INPUT_GET, $name);
    if($res==NULL) $res=$default;
    return $res;
}
function getChartCount()
{
    if (!isset($_SESSION['chart'])) return ''; else return $_SESSION['chart'];
}
function sec_session_start() {
    $session_name = 'sec_session_id';   // Set a custom session name
    $secure = SECURE;
    // This stops JavaScript being able to access the session id.
    $httponly = true;
    // Forces sessions to only use cookies.
    if (ini_set('session.use_only_cookies', 1) === FALSE) {
        header("Location: ../error.php?err=Could not initiate a safe session (ini_set)");
        exit();
    }
    // Gets current cookies params.
    $cookieParams = session_get_cookie_params();
    session_set_cookie_params($cookieParams["lifetime"],
        $cookieParams["path"], 
        $cookieParams["domain"], 
        $secure,
        $httponly);
    // Sets the session name to the one set above.
    session_name($session_name);
    session_start();            // Start the PHP session 
    session_regenerate_id();    // regenerated the session, delete the old one. 
}

function login($login, $password) {
    // Using prepared statements means that SQL injection is not possible. 
    global $mysqli;
    if ($stmt = $mysqli->prepare("SELECT id, name, email, pwd
        FROM dsg_users
       WHERE registr=1 and email = ?
        LIMIT 1")) {
        $stmt->bind_param('s', $login);  // Bind "$login" to parameter.
        $stmt->execute();    // Execute the prepared query.
        $stmt->store_result();
 
        // get variables from result.
        $stmt->bind_result($user_id, $name, $login, $db_password);
        $stmt->fetch();
        
        $password = hash('sha512', $password);

 
        if ($stmt->num_rows == 1) {

                // Check if the password in the database matches
                // the password the user submitted.
                if ($db_password == $password) {
                    // Password is correct!
                    // Get the user-agent string of the user.
                    $user_browser = $_SERVER['HTTP_USER_AGENT'];
                    // XSS protection as we might print this value
                    $user_id = preg_replace("/[^0-9]+/", "", $user_id);
                    $_SESSION['user_id'] = $user_id;
                    // XSS protection as we might print this value
                    $login = preg_replace("/[^a-zA-Z0-9_\-]+/", 
                                                                "", 
                                                                $login);
                    $_SESSION['login'] = $login;
					$_SESSION['name'] = $name;
					//$_SESSION['role'] = $role;
                    $_SESSION['login_string'] = hash('sha512', 
                              $password . $user_browser);
                    // Login successful.
                    getFavouritet();
                    return true;
                } else {
                    // Password is not correct
                    // We record this attempt in the database
                    /*$now = time();
                    $mysqli->query("INSERT INTO login_attempts(user_id, time)
                                    VALUES ('$user_id', '$now')");*/
                    return false;
                }
            
        } else {
            // No user exists.
            return false;
        }
    }
}
/*function login_check() {
  
}*/
function getFavouritet()
{
    global $mysqli;
    $stmt = $mysqli->prepare("select id_product from dsg_favouritet where id_user = ".$_SESSION['user_id']);
        $stmt->execute();
        $result = $stmt->get_result();
        while ($value = $result->fetch_row()) {
                    $_SESSION['favouritet'][$value[0]] = 1;
    }

    
    $stmt->close();
}

function translit($str) 
{
    $tr = array(
        "А"=>"A","Б"=>"B","В"=>"V","Г"=>"G",
        "Д"=>"D","Е"=>"E","Ж"=>"J","З"=>"Z","И"=>"I",
        "Й"=>"Y","К"=>"K","Л"=>"L","М"=>"M","Н"=>"N",
        "О"=>"O","П"=>"P","Р"=>"R","С"=>"S","Т"=>"T",
        "У"=>"U","Ф"=>"F","Х"=>"H","Ц"=>"TS","Ч"=>"CH",
        "Ш"=>"SH","Щ"=>"SCH","Ъ"=>"","Ы"=>"YI","Ь"=>"",
        "Э"=>"E","Ю"=>"YU","Я"=>"YA","а"=>"a","б"=>"b",
        "в"=>"v","г"=>"g","д"=>"d","е"=>"e","ж"=>"j",
        "з"=>"z","и"=>"i","й"=>"y","к"=>"k","л"=>"l",
        "м"=>"m","н"=>"n","о"=>"o","п"=>"p","р"=>"r",
        "с"=>"s","т"=>"t","у"=>"u","ф"=>"f","х"=>"h",
        "ц"=>"ts","ч"=>"ch","ш"=>"sh","щ"=>"sch","ъ"=>"y",
        "ы"=>"yi","ь"=>"'","э"=>"e","ю"=>"yu","я"=>"ya",
   "."=>"_"," "=>"_","?"=>"_","/"=>"_","\\"=>"_",
   "*"=>"_",":"=>"_","*"=>"_","\""=>"_","<"=>"_",
   ">"=>"_","|"=>"_"
    );
    return strtr($str,$tr);
}

function  getCartDataCount() //Получает данные из БД (цены) и вычисляет общую стоимость содержимого, а также количество
{
    $countAll=0;
    if (!empty($_SESSION['cart'])) {
    foreach ($_SESSION['cart'] as $id=>$count){ // пробегаем по содержимому, вычилсяя сумму и количество
					$countAll+= $count;	 
				}
    }
    return ($countAll===0)?'':$countAll;
}
function  getFavouritetDataCount() {
    $countAll=0;
    if (!empty($_SESSION['favouritet'])) {
    foreach ($_SESSION['favouritet'] as $id=>$count){ // пробегаем по содержимому, вычилсяя сумму и количество
					$countAll+= $count;	 
				}
    }
    return ($countAll===0)?'':$countAll;
}

  function rand_passwd( $length = 8, $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' ) {
    return substr( str_shuffle( $chars ), 0, $length );
}
function getUserLoginOrForm()
{
    if (!isset($_SESSION['name']))
    $result = '<div class="user-login-info"><a href="#1" style="color:#18479f;font-size:13px" data-toggle="modal" data-target="#myLogin"><img src="/img/core-img/user.svg" alt="" \
    title="Вход для зарегистрированных пользователей"></a></div>';
else
    $result = '<div class="user-login-info"><a href="/users/account"><img src="/img/core-img/user_login.svg" alt="" title="'.htmlentities($_SESSION['name']).'"></a> \
    </div><div class="cart-area" id="exit-area"><a href="/logout" id="essenceCartBtn"><img src="/img/core-img/door-exit.svg" alt=""></a></div>';

return $result;
}
function logout()
{
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


?>