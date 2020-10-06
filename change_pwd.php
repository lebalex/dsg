<?php


include_once 'header.php';
$id = getParam('id', -1);
$pwd = getParam('pwd', '');


$title_page="Смена пароля";
$video_file="vag2";
include_once 'video_baner.php';

?>


<section class="shop_grid_area section-padding-0-80">
    <div class="overlay3 container" id="data_page">

    </div>
</section>
<script type="text/babel" src="/js/ChangePwd.js"></script>
<script type="text/babel">ReactDOM.render(<ChangePwd id='<?=$id?>' pwd='<?=$pwd?>'/>, document.getElementById('data_page'));</script>


<?php
include_once 'footer.php';
?>
