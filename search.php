<?php
include_once 'header.php';
$search_string= getParam('search', '');

$title_page="Результаты поиска";
$video_file="vag3";
include_once 'video_baner.php';

?>


<section class="shop_grid_area section-padding-0-80 wrapper">
    <div class="overlay3 container" id="data_page">
        <div class="row">


            <!--div class="col-12 col-sm-6 col-md-12">
                <h6>Результаты поиска</h6>

                <p></p>
            </div-->





        </div>

    </div>
    </section>
    <script>
    var search_string='<?=$search_string?>'
</script>
    <script src="/js/jsmin/SearchProduct.js"></script>
    <?php
    include_once 'footer.php';
    ?>