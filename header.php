<?php
include_once 'includes/functions.php';
sec_session_start();



?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="news_keywords" content="<?=getKeyWords(); ?>">
    <title>DSG Комплект</title>



    <link rel="icon" href="/img/core-img/favicon.ico">


    <link rel="stylesheet" href="/css/core-style.css">
    <link rel="stylesheet" href="/style.css">
    <link rel="stylesheet" href="/css/owl.carousel.css">
    <link rel="stylesheet" href="/css/fontello.css">

    <!--link rel="stylesheet" href="/react-bootstrap-table-all.min.css">
</link-->


    <!-- jQuery (Necessary for All JavaScript Plugins) -->
    <script src="/js/jquery/jquery-2.2.4.min.js"></script>
    <!--script src="/js/jquery/jquery.tmpl.js"></script>
    <script type="text/javascript" src="/js/jquery/jquery.validate.min.js"></script-->
    <script type="text/javascript" src="/js/owl.carousel.min.js"></script>
    

    <script src="/js/react/react.development.js" crossorigin></script>
    <script src="/js/react/react-dom.development.js" crossorigin></script>
    <!--script src="/js/react/react.production.min.js" crossorigin></script>
<script src="/js/react/react-dom.production.min.js" crossorigin></script-->

    <!--script src="/js/react/babel.min.js"></script-->



    <!--script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script-->
    <!--script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script-->

    <!--script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script-->



    <script lang="JavaScript">
        $.getJSON('/includes/get_data.php?x=get_keywords', function(data) {
            var txt = '';
            data.forEach(function(obj) {
                txt += obj.name.replace(' ', ',') + ','
            });
            document.querySelector('meta[name="news_keywords"]').setAttribute("content", txt);
        });
    </script>
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
                            <li><a href="/about">О нас</a></li>
                            <li><a href="/catalog">Каталог</a>
                                <ul class="dropdown" id="menu_categ2">
                                    <?php $items = getCateg();
                                    foreach ($items as $item): ?>
                                        <li><a href="/catalog/<?=$item['id'];?>"><?=$item['name'];?></a></li>
                                    <?php endforeach; ?>
                                </ul>
                            </li>
                            <li><a href="/sale">Доставка</a></li>
                            <li><a href="/contact">Контакты</a></li>
                        </ul>
                    </div>
                    <!-- Nav End -->
                </div>
            </nav>

            <!-- Header Meta Data -->
            <div class="header-meta d-flex clearfix justify-content-end" id="right_btn">
                <!-- Search Area -->
                <div class="search-area">
                    <form action="/search" method="post">
                        <input type="search" name="search" id="headerSearch" placeholder="поиск">
                        <button type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
                    </form>
                </div>
                <!-- Favourite Area -->
                <div class="favourite-area">
                    <a href="/favor"><img src="/img/core-img/heart.svg" alt=""><span id="count_in_favouritet"><?= getFavouritetDataCount() ?></span></a>
                </div>
                <div class="cart-area">
                    <a href="/cart" id="essenceCartBtn"><img src="/img/core-img/bag.svg" alt=""> <span id="count_in_chart"><?= getCartDataCount() ?></span></a>
                </div>


                <!-- User Login Info -->
                <?php
                $user = getUserLoginOrForm();
                if ($user==null):?>
                    <div class="user-login-info" id="login_exit_bth"><a href="#1" style="color:#18479f;font-size:13px" data-toggle="modal" data-target="#myLogin">
                        <img src="/img/core-img/user.svg" alt="" title="Вход для зарегистрированных пользователей"></a></div>
                <? else: ?>
                    <div class="user-login-info" id="login_exit_bth"><a href="/users/account"><img src="/img/core-img/user_login.svg" alt="" title="<?=$user; ?>"></a> \
                    </div><div class="cart-area" id="exit-area"><a href="/logout" id="essenceCartBtn"><img src="/img/core-img/door-exit.svg" alt=""></a></div>';
                <? endif; ?>

            </div>

        </div>

    </header>

    <div class="manager_login">
        <div class="modal fade" id="myLogin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <!--form id="loginform" action="/includes/process_login.php" method="POST"-->
                    <form id="loginform" name="loginform" method="post" action="/includes/process_login.php" accept-charset="utf-8" class="form-horizontal" role="form">
                        <div class="modal-header">
                            <h4 class="modal-title" id="myModalLabel">Вход</h4>
                        </div>

                        <div class="modal-body">
                            <div class="form-group" style="padding:10px 0"><input required type="login" name="login" class="form-control" id="login" placeholder="Логин"></div>
                            <div class="form-group" style="padding:10px 0"><input required type="password" name="p" class="form-control" id="p" placeholder="Пароль"></div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
                            <button type="submit" class="btn btn-primary">Войти</button>
                        </div>

                        <div class="modal-footer">
                        <div class="modal-body">
                        <a style="text-align: left" href="/registration">Регистрация</a>
    </div>
                        
                        <a href="/restore_password">Забыли пароль?</a>
                        </div>

                        <input type="hidden" name="action" value="login">
                    </form>
                </div>
            </div>
        </div>
    </div>

    
    <script type="text/javascript" src="/js/jsmin/header.js"></script>
