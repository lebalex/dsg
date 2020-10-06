<?php


include_once 'header.php';



$title_page="Восстановление пароля";
$video_file="vag2";
include_once 'video_baner.php';

?>


<section class="shop_grid_area section-padding-0-80">
    <div class="overlay3 container" id="data_page">

    </div>
</section>
<script type="text/babel" src="/js/RestorePwd.js"></script>
<script type="text/babel">ReactDOM.render(<RestorePwd />, document.getElementById('data_page')  );</script>


<?php
include_once 'footer.php';
?>
