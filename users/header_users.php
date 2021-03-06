<?php
include_once '../includes/functions.php';
sec_session_start();

include_once 'auth.php';
    
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="news_keywords" content="">
    <title>DSG Комплект - Личный кабинет</title>



    <link rel="icon" href="/img/core-img/favicon.ico">


    <link rel="stylesheet" href="/css/core-style.css">
    <link rel="stylesheet" href="/style.css">
    <link rel="stylesheet" href="/css/fontello.css">


    <!-- jQuery (Necessary for All JavaScript Plugins) -->
    <script src="/js/jquery/jquery-2.2.4.min.js"></script>


    <!--script src="/js/react/react.development.js" crossorigin></script>
    <script src="/js/react/react-dom.development.js" crossorigin></script-->
    <script src="/js/react/react.production.min.js" crossorigin></script>
    <script src="/js/react/react-dom.production.min.js" crossorigin></script>

    <!--script src="/js/react/babel.min.js"--></script>

</head>

<body>
    <!-- ##### Header Area Start ##### -->
    <header class="header_area">
        <div class="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
            <!-- Classy Menu -->
            <nav class="classy-navbar" id="essenceNav">
                <!-- Logo -->
                <a class="nav-brand" href="/index"><img src="/img/core-img/logo_dsg.png" alt=""></a>
                <!-- Navbar Toggler -->
                <div class="classy-navbar-toggler">
                    <span class="navbarToggler"><span></span><span></span><span></span></span>
                </div>
                <!-- Menu -->
                <div class="classy-menu">
                    <!-- close btn -->
                    <div class="classycloseIcon">
                        <div class="cross-wrap"><span class="top"></span><span class="bottom"></span></div>
                    </div>
                    <!-- Nav Start -->

                    <div class="classynav">
                        <ul>
                            <li><a href="/users/account">Профиль</a></li>
                            <li><a href="/users/orders">Заказы</a></li>
                        </ul>
                    </div>
                    <!-- Nav End -->
                </div>
            </nav>
            <div class="header-meta d-flex clearfix justify-content-end">
                                <!-- Favourite Area -->
                <div class="favourite-area">
                    <a href="/favor"><img src="/img/core-img/heart.svg" alt=""><span id="count_in_favouritet"><?= getFavouritetDataCount() ?></span></a>
                </div>
                <div class="cart-area">
                    <a href="/cart" id="essenceCartBtn"><img src="/img/core-img/bag.svg" alt=""> <span id="count_in_chart"><?= getCartDataCount() ?></span></a>
                </div>
                <div class="cart-area">
                <a href="/logout" id="logoutBtn"><img src="/img/core-img/door-exit.svg" alt=""></a>
                </div>
            </div>


        </div>

    </header>

    <script type="text/javascript" src="/js/jsmin/header.min.js"></script>