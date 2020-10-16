<?php

include_once 'functions.php';
require 'sendmessage.php';
sec_session_start();
date_default_timezone_set('Europe/Moscow');
header("Content-Type: application/json; charset=UTF-8");

$obj = getParam('x', '-1');
$product = htmlspecialchars(strip_tags(getParam('product', '-1')));



if ($obj == 'addchart') {

    /*$stmt = $mysqli->prepare("select  id_categ, id, name, img, coast from dsg_products where active=1 ORDER BY RAND() LIMIT 5");
        $stmt->execute();
        $result = $stmt->get_result();
        $outp = $result->fetch_all(MYSQLI_ASSOC);*/

    if (!isset($_SESSION['cart'][$product])) {
        $_SESSION['cart'][$product] = 1;
    } else {
        $_SESSION['cart'][$product] = $_SESSION['cart'][$product] + 1;
    }


    echo json_encode(getCartDataCount());
}
if ($obj == 'delchart') {

    if (isset($_SESSION['cart'][$product])) {
        $_SESSION['cart'][$product] = $_SESSION['cart'][$product] - 1;
        if ($_SESSION['cart'][$product] === 0)
            unset($_SESSION['cart'][$product]);
    }
    echo json_encode(getCartDataCount());
}
if ($obj == 'delchart_product') {

    if (isset($_SESSION['cart'][$product])) {
        $_SESSION['cart'][$product] = 0;


        /*$log = date('Y-m-d H:i:s') .' '.$product.' '.$_SESSION['cart'][$product];
            file_put_contents('D:/log.txt', $log . PHP_EOL, FILE_APPEND);*/

        unset($_SESSION['cart'][$product]);
    }
    echo json_encode(getCartDataCount());
}
if ($obj == 'addFavouritet') {
    $add = 1;
    if (!isset($_SESSION['favouritet'][$product])) {
        $_SESSION['favouritet'][$product] = 1;
        /*вставим в БД */
        if (isset($_SESSION['user_id'])) {
            try {
                $stmt = $mysqli->prepare("insert into dsg_favouritet values (" . $_SESSION['user_id'] . "," . $product . ")");
                $stmt->execute();
                $stmt->close();
            } catch (Exception $e) {
            }
        }
    } else {
        unset($_SESSION['favouritet'][$product]);
        /*удалим из БД */
        if (isset($_SESSION['user_id'])) {
            try {
                $stmt = $mysqli->prepare("delete from dsg_favouritet where id_user=" . $_SESSION['user_id'] . " and id_product=" . $product);
                $stmt->execute();
                $stmt->close();
            } catch (Exception $e) {
            }
        }
        $add = -1;
    }

    //$res[] = array('add'=>$add, 'count'=>getFavouritetDataCount());
    $array = ['add' => $add, 'count' => getFavouritetDataCount()];
    echo json_encode($array);
}
if ($obj == 'editcateg') {
    $id = htmlspecialchars(strip_tags(getParam('id', -1)));
    $name = htmlspecialchars(strip_tags(getParam('name', '-1')));
    $target_dir = TARGET_DIR_CATEG;
    if (substr_count(php_uname(), 'Win') > 0) $target_dir = TARGET_DIR_CATEG_W;
    $fileName = null;
    $error = '-1';
    if ($_FILES != null) {
        if (basename($_FILES["img"]["name"]) != null) {
            $target_file = $target_dir . basename($_FILES["img"]["name"]);
            $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
            $check = getimagesize($_FILES["img"]["tmp_name"]);
            if ($check !== false) {
                //echo "File is an image - " . $check["mime"] . ".";
                $i_id_random = rand(1, 10000000);

                $fileName = $i_id_random . "_img." . $imageFileType;
                $target_file = $target_dir . $fileName;
                if (!move_uploaded_file($_FILES["img"]["tmp_name"], $target_file)) {
                    $fileName = null;
                }
            } else {
                //echo "File is not an image.";
                $fileName = null;
            }
        }
    }

    if ($fileName != null) {
        if ($id > -1) $update_stmt = $mysqli->prepare("update dsg_categ set name=?, img=? where id=?");
        else {
            $update_stmt = $mysqli->prepare("insert into dsg_categ (name,img,active) values (?,?,?)");
            $id = 1;
        }

        if (!$update_stmt->bind_param('ssi', $name, $fileName, $id)) {
            $error = "Не удалось привязать параметры: (" . $update_stmt->errno . ") " . $update_stmt->error;
        }
        if (!$update_stmt->execute()) {
            $error = "Не удалось выполнить запрос: (" . $update_stmt->errno . ") " . $update_stmt->error;
        }
    } else {
        if ($id > -1) $update_stmt = $mysqli->prepare("update dsg_categ set name=? where id=?");
        else {
            $update_stmt = $mysqli->prepare("insert into dsg_categ (name,active) values (?,?)");
            $id = 1;
        }
        if (!$update_stmt->bind_param('si', $name, $id)) {
            $error = "Не удалось привязать параметры: (" . $update_stmt->errno . ") " . $update_stmt->error;
        }
        if (!$update_stmt->execute()) {
            $error = "Не удалось выполнить запрос: (" . $update_stmt->errno . ") " . $update_stmt->error;
        }
    }
    $update_stmt->close();

    echo $error;
}
if ($obj == 'delcateg') {
    $id = htmlspecialchars(strip_tags(getParam('id', -1)));
    $error = '-1';
    $update_stmt = $mysqli->prepare("update dsg_categ set active=0 where id=?");
    if (!$update_stmt->bind_param('i', $id)) {
        $error = "Не удалось привязать параметры: (" . $update_stmt->errno . ") " . $update_stmt->error;
    }
    if (!$update_stmt->execute()) {
        $error = "Не удалось выполнить запрос: (" . $update_stmt->errno . ") " . $update_stmt->error;
    }
    $update_stmt->close();
    echo $error;
}
if ($obj == 'delproduct') {
    $id = htmlspecialchars(strip_tags(getParam('id', -1)));
    $error = '-1';
    $update_stmt = $mysqli->prepare("update dsg_products set active=NOT active where id=?");
    if (!$update_stmt->bind_param('i', $id)) {
        $error = "Не удалось привязать параметры: (" . $update_stmt->errno . ") " . $update_stmt->error;
    }
    if (!$update_stmt->execute()) {
        $error = "Не удалось выполнить запрос: (" . $update_stmt->errno . ") " . $update_stmt->error;
    }
    $update_stmt->close();
    echo $error;
}
if ($obj == 'editproduct') {
    $id_categ = htmlspecialchars(strip_tags(getParam('id_categ', -1)));
    $id = htmlspecialchars(strip_tags(getParam('id', -1)));
    $name = htmlspecialchars(strip_tags(getParam('name', '')));
    $oem = htmlspecialchars(strip_tags(getParam('oem', '')));
    $count = htmlspecialchars(strip_tags(getParam('count', '0')));
    $coast = htmlspecialchars(strip_tags(getParam('coast', '0')));
    $description = htmlspecialchars(strip_tags(getParam('description', '')));

    $target_dir = TARGET_DIR_PRODUCT;
    if (substr_count(php_uname(), 'Win') > 0) $target_dir = TARGET_DIR_PRODUCT_W;
    $fileName = null;
    $error = '-1';
    if ($_FILES != null) {
        if (basename($_FILES["img"]["name"]) != null) {
            $target_file = $target_dir . basename($_FILES["img"]["name"]);
            $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
            $check = getimagesize($_FILES["img"]["tmp_name"]);
            if ($check !== false) {
                //echo "File is an image - " . $check["mime"] . ".";
                $i_id_random = rand(1, 10000000);

                $fileName = $i_id_random . "_img." . $imageFileType;
                $target_file = $target_dir . $fileName;
                if (!move_uploaded_file($_FILES["img"]["tmp_name"], $target_file)) {
                    $fileName = null;
                }
            } else {
                //echo "File is not an image.";
                $fileName = null;
            }
        }
    }

    if ($fileName != null) {
        if ($id > -1) $update_stmt = $mysqli->prepare("update dsg_products set name=?, oem=?, count=?, coast=?, img=?, description=? where id=?");
        else {
            $update_stmt = $mysqli->prepare("insert into dsg_products (name, oem, count, coast, img, description, id_categ) values (?,?,?,?,?,?,?)");
            $id = $id_categ;
        }

        if (!$update_stmt->bind_param('ssidssi', $name, $oem, $count, $coast, $fileName, $description, $id)) {
            $error = "Не удалось привязать параметры: (" . $update_stmt->errno . ") " . $update_stmt->error;
        }
        if (!$update_stmt->execute()) {
            $error = "Не удалось выполнить запрос: (" . $update_stmt->errno . ") " . $update_stmt->error;
        }
    } else {
        if ($id > -1) $update_stmt = $mysqli->prepare("update dsg_products set name=?, oem=?, count=?, coast=?, description=? where id=?");
        else {
            $update_stmt = $mysqli->prepare("insert into dsg_products (name, oem, count, coast, description, id_categ) values (?,?,?,?,?,?)");
            $id = $id_categ;
        }
        if (!$update_stmt->bind_param('ssidsi', $name, $oem, $count, $coast, $description, $id)) {
            $error = "Не удалось привязать параметры: (" . $update_stmt->errno . ") " . $update_stmt->error;
        }
        if (!$update_stmt->execute()) {
            $error = "Не удалось выполнить запрос: (" . $update_stmt->errno . ") " . $update_stmt->error;
        }
    }
    $update_stmt->close();


    echo $error;
}
if ($obj == 'setchangepwd') {
    $name = htmlspecialchars(strip_tags(getParam('id', -1)));
    $p1 = htmlspecialchars(strip_tags(getParam('p1', '')));
    $p2 = htmlspecialchars(strip_tags(getParam('p2', '')));
    $error = null;
    if (strlen($p1) < 100) $p1 = hash('sha512', $p1);

    if ($result = $mysqli->query("select * from dsg_users where id=" . $name . " and pwd='" . $p1 . "'")) {
        if ($result->num_rows == 1) {
            $insert_stmt = $mysqli->prepare("update dsg_users set pwd=? where id=?");
            $pwd_hash = hash('sha512', $p2);
            if (!$insert_stmt->bind_param('si', $pwd_hash, $name)) {
                $error = "Не удалось выполнить запрос: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
            }

            if (!$insert_stmt->execute()) {
                $error = "Не удалось выполнить запрос: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
            }
            $insert_stmt->close();
        } else {
            $error = "Пользователь не найден!";
        }
    } else {
        $error = "Не удалось выполнить запрос: " . $result;
    }

    if ($error != null)
        $result = ['code' => -1, 'error' => $error];
    else
        $result = ['code' => 0, 'error' => ''];

    echo json_encode($result);
}
if ($obj == 'set_exec_order') {
    $id_order = htmlspecialchars(strip_tags(getParam('id_order', -1)));
    $description_manager = htmlspecialchars(strip_tags(getParam('description_manager', '')));
    $itemExec = htmlspecialchars(strip_tags(getParam('itemExec', 0)));
    $insert_stmt = $mysqli->prepare("update dsg_orders set exec=?, descript_manager=?, date_manager=NOW() + INTERVAL 12 HOUR where id=?");
    $insert_stmt->bind_param('isi', $itemExec, $description_manager, $id_order);
    $insert_stmt->execute();
    $insert_stmt->close();
}
if ($obj == 'setorder') {

    $result = ['code' => 0, 'error' => ''];

    $insert_id_user = htmlspecialchars(strip_tags(getParam('id', -1)));
    $name = htmlspecialchars(strip_tags(getParam('name', '')));
    $phone = htmlspecialchars(strip_tags(getParam('phone', '')));
    $email = htmlspecialchars(strip_tags(getParam('email', '')));
    $description = htmlspecialchars(strip_tags(getParam('description', '')));
    $registration = htmlspecialchars(strip_tags(getParam('registration', 0)));
    $items = getParam('items', '');

    //$log = date('Y-m-d H:i:s') . ' ' . $name . ' ' . $phone . ' ' . $email . ' ' . $description . ' ' . $registration;
    //    file_put_contents('D:/log.txt', $log . PHP_EOL, FILE_APPEND);


    $error_boolean = false;
    /*регистрируем покупателя либо присваиваем пароль, либо нет*/

    $pwd_hash = null;
    if ($registration === 'true') {
        $password = rand_passwd();
        $pwd_hash = hash('sha512', $password);
        $registration = 1;
    } else $registration = 0;

    if ($insert_id_user == -1) {
        $insert_stmt = $mysqli->prepare("insert into dsg_users (name, phone, email, pwd, registr) values (?,?,?,?,?)");
        if (!$insert_stmt->bind_param('ssssi', $name, $phone, $email, $pwd_hash, $registration)) {
            $error .= "Не удалось привязать параметры: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
            $result = ['code' => -1, 'error' => $error];
            $error_boolean = true;
        }
        if (!$insert_stmt->execute()) {
            $error .= "Не удалось выполнить запрос: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
            $result = ['code' => -1, 'error' => $error];
            $error_boolean = true;
        } else {
            //$mysqli->insert_id
            $insert_id_user = $insert_stmt->insert_id;
        }
    }


    /*заносим заказ в БД*/
    $insert_id_order = 0;
    $insert_stmt = $mysqli->prepare("insert into dsg_orders (id_user, description) values (?,?)");
    if (!$insert_stmt->bind_param('is', $insert_id_user, $description)) {
        $error .= "Не удалось привязать параметры: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
        $result = ['code' => -1, 'error' => $error];
        $error_boolean = true;
    }
    if (!$insert_stmt->execute()) {
        $error .= "Не удалось выполнить запрос: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
        $result = ['code' => -1, 'error' => $error];
        $error_boolean = true;
    } else {
        //$mysqli->insert_id
        $insert_id_order = $insert_stmt->insert_id;
        $result = ['code' => $insert_id_order, 'error' => ''];
    }

    $arr_items = json_decode($items);
    $insert_stmt = $mysqli->prepare("insert into dsg_order_details (id_order, id_products, count, price) values (?,?,?,?)");
    foreach ($arr_items as $item) {
        if (!$insert_stmt->bind_param('iiid', $insert_id_order, $item->id, $item->count, $item->coast)) {
            $error .= "Не удалось привязать параметры: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
            $result = ['code' => -1, 'error' => $error];
        }
        if (!$insert_stmt->execute()) {
            $error .= "Не удалось выполнить запрос: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
            $result = ['code' => -1, 'error' => $error];
            $error_boolean = true;
        }
    }
    $insert_stmt->close();

    /*формируем почту и отправляем */

    /*$message = 'Имя: ' . $name . ' <br/>  Email: ' . $email . ' <br/> Тел: ' . $phone . ' <br/> Комvентарий к заказу: ' . $description . ' <br/>';
    $message .= 'Заказ №' . $insert_id_order;
    $message .= '<table border="1"><tr><td>Наименование</td><td>OEM</td><td>Кол-во</td><td>Цена</td></tr>';
    $sum = 0;
    foreach ($arr_items as $item) {
        $sum += ($item->count * $item->coast);
        $message .= '<tr><td>' . $item->name . '</td><td>' . $item->oem . '</td><td>' . $item->count . '</td><td>' . $item->coast . '</td></tr>';
    }
    $message .= '</table>';
    $message .= 'На сумму ' . $sum;*/
    $message = renderTemplate('mail_user_order.php', ['name' => $name,'email' => $email,'phone' => $phone,'description' => $description,
    'order_number' => 'Заказ №' . $insert_id_order,'items' => $arr_items]);

    /*$result = ['code' => -1, 'error' => $message];*/

    $r = sendMessage('Заказ с сайта DSG Комплект', $message, $email, 0);
    if ($r != 'Message sent!')
        $result = ['code' => -1, 'error' => $r];
    else
        $result = ['code' => $insert_id_order, 'error' => $r];

    /*вы зарегистрировались, необходимо сменить пароль */
    if ($registration === 1) {
        /*$message = 'Имя: ' . $name . ' <br/>  Email: ' . $email . ' <br/> Тел: ' . $phone . ' <br/>' . ' <br/> Ваш пароль: ' . $password . ' <br/>';
        $message .= 'Вы можете сменить пароль пройдя по этой ссылке <a href="https://www.dsgkomplekt.ru/change_pwd/' . $insert_id_user . '/' . $pwd_hash . '">сменить пароль</a>';
        $message .= '<br/><br/>С уважением, сотрудники DSG Комплект';*/
        $message = renderTemplate('mail_user_reg.php', ['name' => $name,'email' => $email,'phone' => $phone,'password' => $password,
        'insert_id_user' =>  $insert_id_user,'pwd_hash' => $pwd_hash]);

        $r = sendMessage('вы зарегистрировались на сайте DSG Комплект', $message, $email, 1);
        if ($r != 'Message sent!')
            $result = ['code' => -1, 'error' => $r];
    }

    /*удалим содержимое карзины*/
    unset($_SESSION['cart']);

    //$error.=$message;


    echo json_encode($result);
    //echo $error;
}
if ($obj == 'save_account') {

    $result = ['code' => 0, 'error' => ''];
    if (isset($_SESSION['user_id'])) {

        $id = htmlspecialchars(strip_tags(getParam('id', -1)));
        $name = htmlspecialchars(strip_tags(getParam('name', '')));
        $phone = htmlspecialchars(strip_tags(getParam('phone', '')));
        $email = htmlspecialchars(strip_tags(getParam('email', '')));
        //$log = date('Y-m-d H:i:s') . ' ' . $name . ' ' . $phone . ' ' . $email . ' ' . $id . ' ' . $_SESSION['user_id'];
        //file_put_contents('D:/log.txt', $log . PHP_EOL, FILE_APPEND);
        if ($email != '') {
            $insert_stmt = $mysqli->prepare("update dsg_users set name=?, phone=?, email=? where id=?");
            if (!$insert_stmt->bind_param('sssi', $name, $phone, $email, $id)) {
                $error .= "Не удалось привязать параметры: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
                $result = ['code' => -1, 'error' => $error];
            }
            if (!$insert_stmt->execute()) {
                $error .= "Не удалось выполнить запрос: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
                $result = ['code' => -1, 'error' => $error];
            }
            $insert_stmt->close();
        }
    } else {
        logout();
    }
    echo json_encode($result);
}
if ($obj == 'restore_pwd') {
    $email = htmlspecialchars(strip_tags(getParam('email', '')));
    $result = ['code' => 0, 'error' => 'Пользователь с таким email не найден!'];


    if ($stmt = $mysqli->prepare("SELECT id, name, phone FROM dsg_users WHERE registr=1 and email = ? LIMIT 1")) {
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($user_id, $name, $phone);
        $stmt->fetch();
        $stmt->close();


        $password = rand_passwd();
        $pwd_hash = hash('sha512', $password);
        $update_user = 0;


        $insert_stmt = $mysqli->prepare("update dsg_users set pwd=? where email=? and id=?");
        if (!$insert_stmt->bind_param('ssi', $pwd_hash, $email, $user_id)) {
            $error .= "Не удалось привязать параметры: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
            $result = ['code' => -1, 'error' => $error];
        }
        if (!$insert_stmt->execute()) {
            $error .= "Не удалось выполнить запрос: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
            $result = ['code' => -1, 'error' => $error];
        } else {
            $update_user = $mysqli->affected_rows;
            if ($update_user != 0) {
                $result = ['code' => $update_user, 'error' => $pwd_hash];

                /*$message = 'Имя: ' . $name . ' <br/>  Email: ' . $email . ' <br/> Тел: ' . $phone . ' <br/>' . ' <br/> Ваш пароль: ' . $password . ' <br/>';
                $message .= 'Вы можете сменить пароль пройдя по этой ссылке <a href="https://www.dsgkomplekt.ru/change_pwd/' . $user_id . '/' . $pwd_hash . '">сменить пароль</a>';
                $message .= '<br/><br/>С уважением, сотрудники DSG Комплект';*/

                $message = renderTemplate('mail_user_reg.php', ['name' => $name,'email' => $email,'phone' => $phone,'password' => $password,
                'insert_id_user' =>  $user_id,'pwd_hash' => $pwd_hash]);

                $r = sendMessage('восстановление пароля на сайте DSG Комплект', $message, $email, 1);
                if ($r != 'Message sent!')
                    $result = ['code' => -1, 'error' => $r];
            }
        }
        $insert_stmt->close();
    }

    echo json_encode($result);
}
if ($obj == 'edituser_discont') {
    $id = htmlspecialchars(strip_tags(getParam('id', -1)));
    $discont = htmlspecialchars(strip_tags(getParam('discont', 0)));
    $result = ['code' => 0, 'error' => ''];
    $insert_stmt = $mysqli->prepare("update dsg_users set discont=? where id=?");
    if (!$insert_stmt->bind_param('ii', $discont, $id)) {
        $error .= "Не удалось привязать параметры: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
        $result = ['code' => -1, 'error' => $error];
    }
    if (!$insert_stmt->execute()) {
        $error .= "Не удалось выполнить запрос: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
        $result = ['code' => -1, 'error' => $error];
    }
    echo json_encode($result);
}
if ($obj == 'registration') {
    $name = htmlspecialchars(strip_tags(getParam('name', '')));
    $email = htmlspecialchars(strip_tags(getParam('email', '')));
    $phone = htmlspecialchars(strip_tags(getParam('phone', '')));
    $pwd = htmlspecialchars(strip_tags(getParam('pwd', '')));
    $captcha_token = htmlspecialchars(strip_tags(getParam('token', '')));
    $captcha_action = htmlspecialchars(strip_tags(getParam('action', '')));
    $result = ['code' => 0, 'error' => ''];


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
    if (!empty($response)) $decoded_response = json_decode($response);

    $success = false;

    if ($decoded_response && $decoded_response->success && $decoded_response->action == $captcha_action && $decoded_response->score > 0) {


        if ($stmt = $mysqli->prepare("SELECT id FROM dsg_users WHERE registr=1 and email = ? LIMIT 1")) {
            $stmt->bind_param('s', $email);
            $stmt->execute();
            $stmt->store_result();
            $stmt->bind_result($user_id);
            $stmt->fetch();
            $stmt->close();


            if ($user_id == null) {
                $pwd_hash = hash('sha512', $pwd);
                $update_user = 0;


                $insert_stmt = $mysqli->prepare("insert into dsg_users (name, phone, email, pwd, registr) values(?,?,?,?,1)");
                if (!$insert_stmt->bind_param('ssss', $name, $phone, $email, $pwd_hash)) {
                    $error .= "Не удалось привязать параметры: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
                    $result = ['code' => -1, 'error' => $error];
                }
                if (!$insert_stmt->execute()) {
                    $error .= "Не удалось выполнить запрос: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
                    $result = ['code' => -1, 'error' => $error];
                } else {

                    $insert_id_user = $insert_stmt->insert_id;
                    
                    /*$message = 'Поздравляем, Вы только что зарегистрировались на сайте <a href="https://www.dsgkomplekt.ru">DSG Комплект</a><br/>';

                    $message .= 'Имя: ' . $name . ' <br/>  Email: ' . $email . ' <br/> Тел: ' . $phone . ' <br/>' . ' <br/> Ваш пароль: ' . $pwd . ' <br/>';
                    $message .= '<br/><br/>С уважением, сотрудники DSG Комплект';*/
                    $message = renderTemplate('mail_user_reg.php', ['name' => $name,'email' => $email,'phone' => $phone,'password' => $pwd,
                'insert_id_user' =>  $insert_id_user,'pwd_hash' => $pwd_hash]);
                    $r = sendMessage('Регистрация на сайте DSG Комплект', $message, $email, 1);
                    if ($r != 'Message sent!')
                        $result = ['code' => -1, 'error' => $r];
                }
                $insert_stmt->close();
            } else {
                $result = ['code' => -1, 'error' => 'Пользователь с таким email уже зарегистрирован!'];
            }
        }
    }else{
        $result = ['code' => -1, 'error' => 'Регистрация ТОЛЬКО для ЛЮДЕЙ! Роботам нельзя регистрироваться!'];
    }
    echo json_encode($result);
}
