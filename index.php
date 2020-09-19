<?php
include_once 'header.php';
?>

<!-- ##### Welcome Area Start ##### -->
<section class="welcome_area bg-img background-overlay" style="background-image: url(/img/bg-img/bg-1a.jpg);">
    <div class="container h-100">
        <div class="row h-100 align-items-center">
            <div class="col-12">
                <div class="hero-content">
                    <h2>DSG Комплект</h2>
                    <a href="catalog" class="btn essence-btn">Посмотреть каталог</a>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- ##### Welcome Area End ##### -->
<script lang="JavaScript">
    function createDiv(name, id, img) {
        return '<div class="col-12 col-sm-6 col-md-4">' +
            '<div class="single-product-wrapper">' +
            '<div class="product-img">' +
            '<img src="/img/categ-img/' + img + '" alt="">' +
            '<img class="hover-img" src="/img/categ-img/black_gr.jpg" alt="">' +
            '<div class="catagory-content">' +
            '<span>' + name + '</span>' +
            '</div>' +
            '</div>' +
            '<div class="product-description">' +
            '<div class="hover-content">' +
            '<div class="add-to-cart-btn">' +
            '<a href="/catalog/' + id + '" class="btn essence-btn">В каталог</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
    $.getJSON('/includes/get_data.php?x=get_categ', function(data) {
        data.forEach(function(obj) {
            document.getElementById('catagory_area').innerHTML += createDiv(obj.name, obj.id, obj.img);
        });
        document.getElementById('catagory_area').innerHTML += createDiv('Весь каталог', '', 'other.jpg');
    });
</script>

<div class="top_catagory_area section-padding-80-0 clearfix">
    <div class="container">
        <div class="row justify-content-center" id="catagory_area">
            <!-- Single Catagory -->
        </div>
    </div>
</div>

<script lang="JavaScript">
    function createDivTopProduct(name, id, img, coast, id_categ) {
        if (img === null) img = "other.jpg";
        if (coast === null) coast = 0;
        return '<div class="single-product-wrapper">' +
            '<div class="product-img">' +
            '<img src="/img/product-img/' + img + '" alt="">' +
            '<div class="product-favourite"><a href="#" class="favme fa fa-heart"></a></div>' +
            '</div>' +
            '<div class="product-description">' +
            '<a href="/catalog/' + id_categ + '/' + id + '">' +
            '<h6>' + name + '</h6>' +
            '</a>' +
            '<p class="product-price">' + coast + '</p>' +
            '<div class="hover-content">' +
            '<div class="add-to-cart-btn"><a href="#" class="btn essence-btn">В корзину</a></div>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
    $.getJSON('/includes/get_data.php?x=get_top_products', function(data) {
        var context = '';
        data.forEach(function(obj) {
            context += createDivTopProduct(obj.name, obj.id, obj.img, obj.coast, obj.id_categ);

        });
        var carousel = $('.owl-carousel')
        carousel.trigger('destroy.owl.carousel');
        carousel.find('.owl-stage-outer').children().unwrap();
        carousel.removeClass("owl-center owl-loaded owl-text-select-on");
        carousel.html(context);
        carousel.owlCarousel({
            items: 4,
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true
        });
    });
</script>



<!-- ##### New Arrivals Area Start ##### -->
<section class="new_arrivals_area section-padding-0-80 clearfix">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="section-heading text-center">
                    <h2>Популярные товары</h2>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="popular-products-slides owl-carousel">

                </div>
            </div>
        </div>
    </div>



</section>



<script>
    /*$(document).ready(function() {



        $.ajax({
            url: '/includes/get_data.php?x=get_top_products',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                var content = "";
                $.each(data, function(k, v) {
                    content += '<div class="item"><img src="/img/product-img/product-4.jpg" alt=""></div>';

                });
            }
        });







    });*/
</script>





<!-- 2gis -->
<div class="text-center">
    <a class="dg-widget-link" href="http://2gis.ru/irkutsk/firm/70000001020973347/center/104.19401407241821,52.25881997928739/zoom/16?utm_medium=widget-source&utm_campaign=firmsonmap&utm_source=bigMap">Посмотреть на карте Иркутска</a>
    <div class="dg-widget-link">
        <a href="http://2gis.ru/irkutsk/firm/70000001020973347/photos/70000001020973347/center/104.19401407241821,52.25881997928739/zoom/17?utm_medium=widget-source&utm_campaign=firmsonmap&utm_source=photos">Фотографии компании</a>
    </div>
    <div class="dg-widget-link"><a href="http://2gis.ru/irkutsk/center/104.194017,52.258566/zoom/16/routeTab/rsType/bus/to/104.194017,52.258566╎VAGON, автосервис?utm_medium=widget-source&utm_campaign=firmsonmap&utm_source=route">Найти проезд до VAGON, автосервис</a>
    </div>
    <script charset="utf-8" src="https://widgets.2gis.com/js/DGWidgetLoader.js"></script>
    <script charset="utf-8">
        new DGWidgetLoader({
            "width": '100%',
            "height": 600,
            "borderColor": "#a3a3a3",
            "pos": {
                "lat": 52.25881997928739,
                "lon": 104.19401407241821,
                "zoom": 16
            },
            "opt": {
                "city": "irkutsk"
            },
            "org": [{
                "id": "70000001020973347"
            }]
        });
    </script>
    <noscript style="color:#c00;font-size:16px;font-weight:bold;">Виджет карты использует JavaScript. Включите его в настройках вашего браузера.</noscript>
</div>





<?php
include_once 'footer.php';
?>