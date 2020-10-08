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


<div class="top_catagory_area section-padding-80-0 clearfix">
    <div class="container">
        <div class="row justify-content-center" id="catagory_area">
            <!-- Single Catagory -->
        </div>
    </div>
</div>





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
<script src="/js/jsmin/CategList.js"></script>


<script type="text/javascript" src="/js/jsmin/index.js"></script>


<?php
include_once 'footer.php';
?>