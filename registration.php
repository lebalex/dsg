<?php


include_once 'header.php';



$title_page="Регистрация на сайте DSG Комплект";
$video_file="vag2";
include_once 'video_baner.php';

?>


<section class="shop_grid_area section-padding-0-80">
    <div class="overlay3 container" id="data_page">









    </div>
    <script src="https://www.google.com/recaptcha/api.js?render=6LfIitEZAAAAAJQRx8lSEiZJqeF56fvMlLBv4Exv"></script>
                    <script>
                        grecaptcha.ready(function() {
                            grecaptcha.execute('6LfIitEZAAAAAJQRx8lSEiZJqeF56fvMlLBv4Exv', {
                                    action: 'message'
                                })
                                .then(function(token) {
                                    if (token) {
                                        document.getElementById('token').value = token;
                                    }
                                });
                        });
                    </script>
</section>
<script src="/js/jsmin/Registration.js"></script>


<?php
include_once 'agreement.php';
include_once 'footer.php';
?>
