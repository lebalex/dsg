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

function login($login, $password, $mysqli) {
    // Using prepared statements means that SQL injection is not possible. 
    if ($stmt = $mysqli->prepare("SELECT user_id, login, pwd, fio, role 
        FROM users
       WHERE login = ?
        LIMIT 1")) {
        $stmt->bind_param('s', $login);  // Bind "$login" to parameter.
        $stmt->execute();    // Execute the prepared query.
        $stmt->store_result();
 
        // get variables from result.
        $stmt->bind_result($user_id, $login, $db_password, $fio, $role);
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
					$_SESSION['fio'] = $fio;
					$_SESSION['role'] = $role;
                    $_SESSION['login_string'] = hash('sha512', 
                              $password . $user_browser);
                    // Login successful.
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
function login_check($mysqli) {
    // Check if all session variables are set 
    if (isset($_SESSION['user_id'], 
                        $_SESSION['login'], 
                        $_SESSION['login_string'])) {
 
        $user_id = $_SESSION['user_id'];
        $login_string = $_SESSION['login_string'];
        $login = $_SESSION['login'];
 
        // Get the user-agent string of the user.
        $user_browser = $_SERVER['HTTP_USER_AGENT'];
 
        if ($stmt = $mysqli->prepare("SELECT pwd 
                                      FROM users 
                                      WHERE user_id = ? LIMIT 1")) {
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
function generateRandomPassword() {
    //Initialize the random password
    $password = '';
  
    //Initialize a random desired length
    $desired_length = rand(8, 12);
  
    for($length = 0; $length < $desired_length; $length++) {
      //Append a random ASCII character (including symbols)
      $password .= chr(rand(32, 126));
    }
  
    return $password;
  }


?>