<?php

include_once 'functions.php';
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
        if($_SESSION['cart'][$product]===0)
                unset($_SESSION['cart'][$product]);
    }
    echo json_encode(getCartDataCount());
}
if ($obj == 'delchart_product') {

    if (isset($_SESSION['cart'][$product])) {
        $_SESSION['cart'][$product]=0;
                

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
    if(substr_count(php_uname(), 'Win')>0)$target_dir = TARGET_DIR_CATEG_W;
    $fileName=null;
    $error='-1';
    if($_FILES!=null){
    if (basename($_FILES["img"]["name"]) != null) {
        $target_file = $target_dir . basename($_FILES["img"]["name"]);
        $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
        $check = getimagesize($_FILES["img"]["tmp_name"]);
        if($check !== false) {
            //echo "File is an image - " . $check["mime"] . ".";
            $i_id_random = rand(1, 10000000);
        
            $fileName = $i_id_random."_img.".$imageFileType; 
            $target_file = $target_dir . $fileName;
            if (!move_uploaded_file($_FILES["img"]["tmp_name"], $target_file)) {
                $fileName=null;
            }
        } else {
            //echo "File is not an image.";
            $fileName=null;
        }
    }
}

    if($fileName!=null)
    {
        if($id>-1) $update_stmt = $mysqli->prepare("update dsg_categ set name=?, img=? where id=?");
        else{
            $update_stmt = $mysqli->prepare("insert into dsg_categ (name,img,active) values (?,?,?)");
            $id=1;
        }

            if (!$update_stmt->bind_param('ssi', $name,$fileName,$id)) {
                $error="Не удалось привязать параметры: (" . $update_stmt->errno . ") " . $update_stmt->error;
            }
            if (!$update_stmt->execute()) {
                $error="Не удалось выполнить запрос: (" . $update_stmt->errno . ") " . $update_stmt->error;
            }
    }else
    {
        if($id>-1) $update_stmt = $mysqli->prepare("update dsg_categ set name=? where id=?");
        else{
            $update_stmt = $mysqli->prepare("insert into dsg_categ (name,active) values (?,?)");
            $id=1;
        }
        if (!$update_stmt->bind_param('si', $name,$id)) {
            $error="Не удалось привязать параметры: (" . $update_stmt->errno . ") " . $update_stmt->error;
        }
        if (!$update_stmt->execute()) {
            $error="Не удалось выполнить запрос: (" . $update_stmt->errno . ") " . $update_stmt->error;
        }
    }


    echo $error;

}
if ($obj == 'delcateg') {
    $id = getParam('id', -1);
    $error='-1';
    $update_stmt = $mysqli->prepare("update dsg_categ set active=0 where id=?");
    if (!$update_stmt->bind_param('i', $id)) {
        $error="Не удалось привязать параметры: (" . $update_stmt->errno . ") " . $update_stmt->error;
    }
    if (!$update_stmt->execute()) {
        $error="Не удалось выполнить запрос: (" . $update_stmt->errno . ") " . $update_stmt->error;
    }
    echo $error;
}
if ($obj == 'delproduct') {
    $id = getParam('id', -1);
    $error='-1';
    $update_stmt = $mysqli->prepare("update dsg_products set active=0 where id=?");
    if (!$update_stmt->bind_param('i', $id)) {
        $error="Не удалось привязать параметры: (" . $update_stmt->errno . ") " . $update_stmt->error;
    }
    if (!$update_stmt->execute()) {
        $error="Не удалось выполнить запрос: (" . $update_stmt->errno . ") " . $update_stmt->error;
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
    if(substr_count(php_uname(), 'Win')>0)$target_dir = TARGET_DIR_PRODUCT_W;
    $fileName=null;
    $error='-1';
    if($_FILES!=null){
    if (basename($_FILES["img"]["name"]) != null) {
        $target_file = $target_dir . basename($_FILES["img"]["name"]);
        $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
        $check = getimagesize($_FILES["img"]["tmp_name"]);
        if($check !== false) {
            //echo "File is an image - " . $check["mime"] . ".";
            $i_id_random = rand(1, 10000000);
        
            $fileName = $i_id_random."_img.".$imageFileType; 
            $target_file = $target_dir . $fileName;
            if (!move_uploaded_file($_FILES["img"]["tmp_name"], $target_file)) {
                $fileName=null;
            }
        } else {
            //echo "File is not an image.";
            $fileName=null;
        }
    }
}

    if($fileName!=null)
    {
        if($id>-1) $update_stmt = $mysqli->prepare("update dsg_products set name=?, oem=?, count=?, coast=?, img=?, description=? where id=?");
        else{
            $update_stmt = $mysqli->prepare("insert into dsg_categ (name, oem, count, coast, img, description, id_categ) values (?,?,?,?,?,?,?)");
            $id=$id_categ;
        }

            if (!$update_stmt->bind_param('ssidssi', $name,$oem,$count,$coast,$fileName,$description,$id)) {
                $error="Не удалось привязать параметры: (" . $update_stmt->errno . ") " . $update_stmt->error;
            }
            if (!$update_stmt->execute()) {
                $error="Не удалось выполнить запрос: (" . $update_stmt->errno . ") " . $update_stmt->error;
            }
    }else
    {
        if($id>-1) $update_stmt = $mysqli->prepare("update dsg_products set name=?, oem=?, count=?, coast=?, description=? where id=?");
        else{
            $update_stmt = $mysqli->prepare("insert into dsg_products (name, oem, count, coast, description, id_categ) values (?,?,?,?,?,?)");
            $id=$id_categ;
        }
        if (!$update_stmt->bind_param('ssidsi', $name,$oem,$count,$coast,$description,$id)) {
            $error="Не удалось привязать параметры: (" . $update_stmt->errno . ") " . $update_stmt->error;
        }
        if (!$update_stmt->execute()) {
            $error="Не удалось выполнить запрос: (" . $update_stmt->errno . ") " . $update_stmt->error;
        }
    }


    echo $error;

}
