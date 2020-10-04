<?php

include_once 'functions.php';
require 'sendmessage.php';
sec_session_start();
header("Content-Type: application/json; charset=UTF-8");

$obj = getParam('x', '-1');
$product = getParam('product', '-1');



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
    } else {
        unset($_SESSION['favouritet'][$product]);
        $add = -1;
    }

    //$res[] = array('add'=>$add, 'count'=>getFavouritetDataCount());
    $array = ['add' => $add, 'count' => getFavouritetDataCount()];
    echo json_encode($array);
}
if ($obj == 'editcateg') {
    $id = getParam('id', -1);
    $name = getParam('name', '-1');
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


    echo $error;
}
if ($obj == 'delcateg') {
    $id = getParam('id', -1);
    $error = '-1';
    $update_stmt = $mysqli->prepare("update dsg_categ set active=0 where id=?");
    if (!$update_stmt->bind_param('i', $id)) {
        $error = "Не удалось привязать параметры: (" . $update_stmt->errno . ") " . $update_stmt->error;
    }
    if (!$update_stmt->execute()) {
        $error = "Не удалось выполнить запрос: (" . $update_stmt->errno . ") " . $update_stmt->error;
    }
    echo $error;
}
if ($obj == 'delproduct') {
    $id = getParam('id', -1);
    $error = '-1';
    $update_stmt = $mysqli->prepare("update dsg_products set active=0 where id=?");
    if (!$update_stmt->bind_param('i', $id)) {
        $error = "Не удалось привязать параметры: (" . $update_stmt->errno . ") " . $update_stmt->error;
    }
    if (!$update_stmt->execute()) {
        $error = "Не удалось выполнить запрос: (" . $update_stmt->errno . ") " . $update_stmt->error;
    }
    echo $error;
}
if ($obj == 'editproduct') {
    $id_categ = getParam('id_categ', -1);
    $id = getParam('id', -1);
    $name = getParam('name', '');
    $oem = getParam('oem', '');
    $count = getParam('count', '0');
    $coast = getParam('coast', '0');
    $description = getParam('description', '');

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
            $update_stmt = $mysqli->prepare("insert into dsg_categ (name, oem, count, coast, img, description, id_categ) values (?,?,?,?,?,?,?)");
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


    echo $error;
}
if ($obj == 'setorder') {

    $result = ['code' => 0, 'error' => ''];

    $name = getParam('name', '');
    $phone = getParam('phone', '');
    $email = getParam('email', '');
    $description = getParam('description', '');
    $registration = getParam('registration', 0);
    $items = getParam('items', '');

    //$log = date('Y-m-d H:i:s') . ' ' . $name . ' ' . $phone . ' ' . $email . ' ' . $description . ' ' . $registration;
    //    file_put_contents('D:/log.txt', $log . PHP_EOL, FILE_APPEND);


$error_boolean=false;
    /*регистрируем покупателя либо присваиваем пароль, либо нет*/
    $insert_id_user=0;
    $pwd_hash=null;
    if($registration==='true') {
        $password = generateRandomPassword();
        $pwd_hash = hash('sha512', $password);
        $registration=1;
    }else $registration=0;

    $insert_stmt = $mysqli->prepare("insert into dsg_users (name, phone, email, pwd, registr) values (?,?,?,?,?)");
        if (!$insert_stmt->bind_param('ssssi', $name, $phone, $email, $pwd_hash, $registration)) {
            $error .= "Не удалось привязать параметры: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
            $result = ['code' => -1, 'error' => $error];
            $error_boolean=true;
        }
        if (!$insert_stmt->execute()) {
            $error .= "Не удалось выполнить запрос: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
            $result = ['code' => -1, 'error' => $error];
            $error_boolean=true;
        }else
        {
            //$mysqli->insert_id
            $insert_id_user = $insert_stmt->insert_id;
        }


    /*заносим заказ в БД*/
    $insert_id_order=0;
    $insert_stmt = $mysqli->prepare("insert into dsg_orders (id_user) values (?)");
        if (!$insert_stmt->bind_param('i', $insert_id_user)) {
            $error .= "Не удалось привязать параметры: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
            $result = ['code' => -1, 'error' => $error];
            $error_boolean=true;
        }
        if (!$insert_stmt->execute()) {
            $error .= "Не удалось выполнить запрос: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
            $result = ['code' => -1, 'error' => $error];
            $error_boolean=true;
        }else
        {
            //$mysqli->insert_id
            $insert_id_order = $insert_stmt->insert_id;
        }

    $arr_items = json_decode($items);
    $insert_stmt = $mysqli->prepare("insert into dsg_order_details (id_order, id_products, count, price) values (?,?,?,?)");
    foreach($arr_items as $item){
        if (!$insert_stmt->bind_param('iiid', $insert_id_order, $item->id, $item->count, $item->coast)) {
            $error .= "Не удалось привязать параметры: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
            $result = ['code' => -1, 'error' => $error];
        }
        if (!$insert_stmt->execute()) {
            $error .= "Не удалось выполнить запрос: (" . $insert_stmt->errno . ") " . $insert_stmt->error;
            $result = ['code' => -1, 'error' => $error];
            $error_boolean=true;
        }
    }

    /*формируем почту и отправляем */

    $message='Имя: '.$name.' <br/>  Email: '.$email.' <br/> Тел: '.$phone.' <br/>';
    $message.='Заказ №'.$insert_id_order;
    $message.='<table>';
    $sum=0;
    foreach($arr_items as $item){
        $sum+=($item->count * $item->coast);
        $message.='<tr><td>'.$item->name.'</td><td>'.$item->count.'</td><td>'.$item->coast.'</td></tr>';
    }
    $message.='</table>';
    $message.='На сумму '.$sum;

    $r = sendMessage('Заказ с сайта DSG Комплект', $message, $email);
    if($r!='Message sent!')
        $result = ['code' => -1, 'error' => $r];
    else
        $result = ['code' => $insert_id_order, 'error' => $r];

/*вы зарегистрировались, необходимо сменить пароль */
if($registration===1) {
$message='Имя: '.$name.' <br/>  Email: '.$email.' <br/> Тел: '.$phone.' <br/>'.' <br/> Ваш пароль: '.$password.' <br/>';
$message.='Вы можете сменить пароль пройдя по этой ссылке <a href="https://www.dsgkomplekt.ru/change_pwd/'.$insert_id_user.'">сменить пароль</a>';
$message.='<br/><br/>С уважением, сотрудники DSG Комплект';
    $r = sendMessage('вы зарегистрировались на сайте DSG Комплект', $message, $email);
    if($r!='Message sent!')
        $result = ['code' => -1, 'error' => $r];
}

    /*удалим содержимое карзины*/
        //unset($_SESSION['cart']);

        //$error.=$message;
      

  echo json_encode( $result );
  //echo $error;
}
