<?php

include_once 'header.php';
$categ_id = getParam('categ_id', -1);
$product_id= getParam('product', -1);


$title_page="Каталог";
$video_file="vag2";
include_once 'video_baner.php';

?>


<section class="shop_grid_area section-padding-0-80">
    <div class="overlay3 container" id="data_page">

                                        <!--меню категорий и товаров-->

    </div>
</section>
<script type="text/babel" src="/js/CatalogList.js"></script>
<script type="text/babel">
  ReactDOM.render(<CatalogList categ_id='<?=$categ_id?>' product_id='<?=$product_id?>' />, document.getElementById('data_page'));
</script>
<script type="text/babel" src="/js/ProductOne.js"></script>
<script type="text/babel" src="/js/ProductDetail.js"></script>
<?php
include_once 'footer.php';
?>