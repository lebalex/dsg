<?php

include_once 'db_connect.php';
include_once 'functions.php';
sec_session_start();
header("Content-Type: application/json; charset=UTF-8");

$obj = getParam('x', '-1');
$product = getParam('product', '-1');



 if($obj=='addchart')
 {

    /*$stmt = $mysqli->prepare("select  id_categ, id, name, img, coast from dsg_products where active=1 ORDER BY RAND() LIMIT 5");
        $stmt->execute();
        $result = $stmt->get_result();
        $outp = $result->fetch_all(MYSQLI_ASSOC);*/

        if (!isset($_SESSION['cart'][$product])) 
        {
            $_SESSION['cart'][$product] = 1;
        }else
        {
            $_SESSION['cart'][$product]=$_SESSION['cart'][$product]+1;
        }

        
     echo json_encode(getCartDataCount());
 }
 if($obj=='addFavouritet')
 {
    $add=1;
        if (!isset($_SESSION['favouritet'][$product])) 
        {
            $_SESSION['favouritet'][$product] = 1;
        }else
        {
            unset($_SESSION['favouritet'][$product]);
            $add=-1;
        }

        
     echo json_encode($add);
 }
