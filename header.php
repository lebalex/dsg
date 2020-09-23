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


        <!-- jQuery (Necessary for All JavaScript Plugins) -->
    <script src="/js/jquery/jquery-2.2.4.min.js"></script>
    <script src="/js/jquery/jquery.tmpl.js"></script>
    <script type="text/javascript" src="/js/owl.carousel.min.js"></script>



    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
    <!--script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script-->

    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

    

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
                                <ul class="dropdown" id="menu_categ">

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
                    <a href="#"><img src="/img/core-img/heart.svg" alt=""><span id="count_in_favouritet"><?=getFavouritetDataCount()?></span></a>
                </div>
                <!-- User Login Info -->
                <div class="user-login-info">
                    <a href="#"><img src="/img/core-img/user.svg" alt=""></a>
                </div>
                <!-- Cart Area -->
                <div class="cart-area">
                    <a href="#" id="essenceCartBtn"><img src="/img/core-img/bag.svg" alt=""> <span id="count_in_chart"><?=getCartDataCount()?></span></a>
                </div>
            </div>

        </div>

    </header>



    <!--script lang="JavaScript">
        $(document).ready(function() {
            $.getJSON('/includes/get_data.php?x=get_categ', function(data) {
                /*var txt = '';
                data.forEach(function(obj) {
                    txt += '<li><a href="/catalog/' + obj.id + '">' + obj.name + '</a></li>';
                });
                $('#menu_categ').html(txt);*/

                /*var m = '<li><a href="/catalog/${id}">${name}</a></li>';
                $.template("movieTemplate", m);
                data.forEach(function(obj) {
                    $.tmpl("movieTemplate", obj).appendTo("#menu_categ");
                });*/

            });
        });
    </script-->


  




    <script type="text/babel">
class CategListSimple extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
    componentDidMount() {
    fetch("/includes/get_data.php?x=get_categ")
      .then(res => res.json())
      .then(
        (result) => {
            //console.log(result);
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (

          items.map(item => (
            <li key={item.id}><a href={`/catalog/${item.id}`}>{item.name}</a>
            </li>
          ))

      );
    }
}

}

ReactDOM.render(
  <CategListSimple toWhat="мир" />,
  document.getElementById('menu_categ')
);



    </script>