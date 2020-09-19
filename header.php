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
    <meta name="news_keywords" content="">
    <title>DSG Комплект</title>



    <link rel="icon" href="/img/core-img/favicon.ico">


    <link rel="stylesheet" href="/css/core-style.css">
    <link rel="stylesheet" href="/style.css">
    <link rel="stylesheet" href="/css/owl.carousel.min.css">
    
    <!--script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script-->
    <script src="/js/jquery/jquery-2.2.4.min.js"></script>
    <script type="text/javascript" src="/js/owl.carousel.min.js"></script>
    <script lang="JavaScript">
        $.getJSON('/includes/get_data.php?x=get_keywords', function(data) {
            var txt = '';
            data.forEach(function(obj) {
                txt += obj.name.replace(' ', ',')+','
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
                    <script lang="JavaScript">
                        $.getJSON('/includes/get_data.php?x=get_categ', function(data) {
                            var txt = '';
                            data.forEach(function(obj) {
                                txt += '<li><a href="/catalog/' + obj.id + '">' + obj.name + '</a></li>';
                            });
                            document.getElementById("menu_categ").innerHTML = txt;
                        });

                        /*xmlhttp = new XMLHttpRequest();
                        xmlhttp.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                                var myObj = JSON.parse(this.responseText);
                                var txt='';
                                myObj.forEach(function(obj) { 
                                    txt += '<li><a href="/catalog/'+obj.id+'">'+obj.name+'</a></li>';
                                    });
                                document.getElementById("menu_categ").innerHTML = txt;
                            }
                        };
                        xmlhttp.open("GET", "/includes/get_data.php?x=get_categ", true);
                        xmlhttp.send();*/
                    </script>
                    <div class="classynav">
                        <ul>
                            <li><a href="/about">О нас</a></li>
                            <li><a href="/catalog">Каталог</a>
                                <ul class="dropdown" id="menu_categ">
                                    <!--li><a href="/catalog/1">DQ200</a></li>
                                    <li><a href="/catalog/2">DQ250</a></li>
                                    <li><a href="/catalog/3">DL501</a></li>
                                    <li><a href="/catalog/4">DQ500</a></li-->
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
            <div class="header-meta d-flex clearfix justify-content-end">
                <!-- Search Area -->
                <div class="search-area">
                    <form action="#" method="post">
                        <input type="search" name="search" id="headerSearch" placeholder="поиск">
                        <button type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
                    </form>
                </div>
                <!-- Favourite Area -->
                <div class="favourite-area">
                    <a href="#"><img src="/img/core-img/heart.svg" alt=""></a>
                </div>
                <!-- User Login Info -->
                <div class="user-login-info">
                    <a href="#"><img src="/img/core-img/user.svg" alt=""></a>
                </div>
                <!-- Cart Area -->
                <div class="cart-area">
                    <a href="#" id="essenceCartBtn"><img src="/img/core-img/bag.svg" alt=""> <span>2</span></a>
                </div>
            </div>

        </div>
    </header>