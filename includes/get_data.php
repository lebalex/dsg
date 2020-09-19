<?php
include_once 'db_connect.php';

header("Content-Type: application/json; charset=UTF-8");
$obj = $_GET["x"];

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
if ($obj == "get_keywords") {
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
if($obj =="get_top_products")
{
    $stmt = $mysqli->prepare("select  id_categ, id, name, img, coast from dsg_products where active=1 ORDER BY RAND() LIMIT 5");
        $stmt->execute();
        $result = $stmt->get_result();
        $outp = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($outp);
}



/*
$stmt = $mysqli->prepare("SELECT name FROM customers LIMIT ?");
$stmt->bind_param("s", $obj->limit);
$stmt->execute();
$result = $stmt->get_result();
$outp = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($outp);*/
