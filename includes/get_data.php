<?php
include_once 'functions.php';
sec_session_start();
header("Content-Type: application/json; charset=UTF-8");
//$obj = $_GET["x"];
$obj = getParam('x', '-1');
$categ_id = getParam('categ_id', '-1');
$product= getParam('product', '-1');




if ($obj == "get_categ") {
    if (!isset($_SESSION['categories'])) {
        $stmt = $mysqli->prepare("select id, name, img from dsg_categ where active=1 order by id");
        $stmt->execute();
        $result = $stmt->get_result();
        $outp = $result->fetch_all(MYSQLI_ASSOC);
        $_SESSION['categories'] = $outp;
        //echo json_encode($outp);
    }
    echo  json_encode($_SESSION['categories']);
}
else if ($obj == "get_categ_db") {
        $stmt = $mysqli->prepare("select id, name, img from dsg_categ where active=1 order by id");
        $stmt->execute();
        $result = $stmt->get_result();
        $outp = $result->fetch_all(MYSQLI_ASSOC);
        $_SESSION['categories'] = $outp;
        echo json_encode($outp);

}
else if ($obj == "get_keywords") {
    if (!isset($_SESSION['keywords'])) {
        $stmt = $mysqli->prepare("select name from dsg_products where active=1 order by id");
        $stmt->execute();
        $result = $stmt->get_result();
        $outp = $result->fetch_all(MYSQLI_ASSOC);
        $_SESSION['keywords'] = $outp;
        //echo json_encode($outp);
    }
    echo  json_encode($_SESSION['keywords']);
}
else if($obj =="get_top_products")
{
    $out2 = array();
    $stmt = $mysqli->prepare("select  id_categ, id, name, img, coast from dsg_products where active=1 ORDER BY RAND() LIMIT 5");
        $stmt->execute();
        $result = $stmt->get_result();
        //$outp = $result->fetch_all(MYSQLI_ASSOC);

        while ($value = $result->fetch_row()) {

            $active='';
            if (isset($_SESSION['favouritet'])) {
            foreach ($_SESSION['favouritet'] as $id=>$count){
                if($value[1]==$id) $active='active';
            }
        }
            $out2[] = array('id_categ'=>$value[0], 'id'=>$value[1], 'name'=>$value[2], 'img'=>$value[3], 'coast'=>$value[4], 'active'=>$active);
            
            //$log = date('Y-m-d H:i:s') .$value['id_categ'].$value['id'].$value['name'].$value['img'].$value['coast'].$active;
            //file_put_contents('D:/log.txt', $log . PHP_EOL, FILE_APPEND);
        }


        echo json_encode($out2);
}
else if($obj =="get_all_products")
{
    $categ_predicat="";
    if($categ_id!='-1') $categ_predicat=" and id_categ=".$categ_id;
    $product_predicat="";
    if($product!='-1') $product_predicat=" and id=".$product;
    $out2 = array();
    $stmt = $mysqli->prepare("select  id_categ, id, name, img, coast, count, oem from dsg_products where active=1 ".$categ_predicat.$product_predicat);
    
        $stmt->execute();
        $result = $stmt->get_result();
        //$outp = $result->fetch_all(MYSQLI_ASSOC);
        while ($value = $result->fetch_row()) {

            $active='';
            if (isset($_SESSION['favouritet'])) {
            foreach ($_SESSION['favouritet'] as $id=>$count){
                if($value[1]==$id) $active='active';
            // $log = date('Y-m-d H:i:s') .' '.$value[1].' '.$id;
            //file_put_contents('D:/log.txt', $log . PHP_EOL, FILE_APPEND);
            }
        }
            $out2[] = array('id_categ'=>$value[0], 'id'=>$value[1], 'name'=>$value[2], 'img'=>$value[3], 'coast'=>$value[4], 
            'count'=>$value[5], 'oem'=>$value[6], 
            
            'active'=>$active);
    }
        echo json_encode($out2);
}
else if($obj =="get_all_products_db")
{
    $categ_predicat="";
    if($categ_id!='-1') $categ_predicat=" and id_categ=".$categ_id;

    $stmt = $mysqli->prepare("select  id_categ, id, name, img, coast, count, oem from dsg_products where active=1 ".$categ_predicat);
    
        $stmt->execute();
        $result = $stmt->get_result();
        $outp = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($outp);
}else if($obj =="get_favor_products")
{
    $user_id = getParam('user_id', -1);

    if (!empty($_SESSION['favouritet'])) {
        $id_array = array();
        
        if($product!='-1'){
            $id_array[] = $product;
        }else{
            foreach ($_SESSION['favouritet'] as $id=>$count){ // пробегаем по содержимому, вычилсяя сумму и количество
                $id_array[] = $id;	 
                    }
            }

                    $array = implode("','",$id_array);
                    $stmt = $mysqli->prepare("select  id_categ, id, name, img, coast, count, oem, 'active' as active from dsg_products where active=1 and id IN ('".$array."') ");
                    $stmt->execute();
        $result = $stmt->get_result();
        $outp = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($outp);

}else
    echo json_encode(-1);

}else if($obj =="get_cart_products")
{
    $user_id = getParam('user_id', -1);

    if (!empty($_SESSION['cart'])) {
        $out2 = array();
        $id_array = array();
        
        if($product!='-1'){
            $id_array[] = $product;
        }else{
            foreach ($_SESSION['cart'] as $id=>$count){ // пробегаем по содержимому, вычилсяя сумму и количество
                $id_array[] = $id;	 

                    }
            }
            
                    $array = implode("','",$id_array);
                    $stmt = $mysqli->prepare("select  id_categ, id, name, img, coast, count, oem from dsg_products where active=1 and id IN ('".$array."') ");
                    $stmt->execute();
        $result = $stmt->get_result();
        while ($value = $result->fetch_row()) {

            if (isset($_SESSION['cart'][$value[1]])) {
                $c=$_SESSION['cart'][$value[1]];
                if($c>$value[5])
                $c=$value[5];

                $out2[] = array('id_categ'=>$value[0], 'id'=>$value[1], 'name'=>$value[2], 'img'=>$value[3], 'coast'=>$value[4], 
            'balance'=>$value[5], 'oem'=>$value[6], 
            
            'count'=>$c);

        }
    }

        //$outp = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($out2);

}else
    echo json_encode(-1);

}


    //$age = array("Peter"=>35, "Ben"=>37, "Joe"=>43);

//echo json_encode($age);



/*
$stmt = $mysqli->prepare("SELECT name FROM customers LIMIT ?");
$stmt->bind_param("s", $obj->limit);
$stmt->execute();
$result = $stmt->get_result();
$outp = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($outp);*/
