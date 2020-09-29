<?php
include_once 'header.php';


$title_page = "О нас / О магазине / Обратная связь";
$video_file = "vag1";
include_once 'video_baner.php';

?>

<section class="shop_grid_area section-padding-0-80">
    <div class="overlay3 container">
        <div class="row">

            <div class="col-12 col-sm-6 col-md-12">
                <h6>Мы рады приветствовать вас на сайте нашей компании.</h6>

                <p>Наша компания была основана в 2016 году, а наш интернет-магазин стал первым интернет - магазином в России, осуществляющим on-line продажу комплектов для ремонта DSG 7. Компания специализируется на оптовой и розничной продаже ремкомплектов DSG 7 как для мастерских, так и для ремонта DSG своими руками.</p>

                <p>На данный момент мы представляем собой крупную компанию, владеющую интернет–магазином и имеющую в своей сети единый call-центр, который регулирует всю деятельность магазина, отдел продаж, службу доставки, широкий штат квалифицированных сборщиков, собственный склад c постоянным наличием необходимого запаса комплектов.</p>

                <p>За это время у нас сложились партнерские отношения с техцентрами и розничными магазинами, позволяющие предлагать высококачественную продукцию и услуги по конкурентоспособным ценам в каждом регионе России.</p>

                <p>Мы можем гордиться тем, что мы первый интернет - магазин комплектов DSG 7 KINERGO ®</p>


                <p>Мы всегда рады общению с нашими клиентами. Если у вас есть какие-либо пожелания, предложения, замечания, касающиеся работы нашего Интернет-магазина - пишите нам, и мы с благодарностью примем ваше мнение во внимание.</p>
            </div>





        </div>
        <div class="row">
            <div class="col-12 col-sm-6 col-md-6">
                <h6>Мы всегда рады вашим вопросам и предложениям!</h6>
                <div class="messages"><div style="display: none;" class="thanks_form"><h4>Спасибо, ваше сообщение отправлено!</h4></div></div>
                <div class="messages"><div style="display: none;" class="error_form"><h4>Заполните форму!</h4></div></div>
                
                <form id="message_form" name="message_form" method="post" accept-charset="utf-8"  class="form-horizontal" role="form">

                    <div class="col-12 mb-3">
                        <label for="first_name">Имя <span>*</span></label>
                        <input type="text" class="form-control" id="first_name" value="" required>
                    </div>
                    <div class="col-12 mb-3">
                        <label for="phone_number">Телефон</label>
                        <input type="number" class="form-control" id="phone_number" min="0" value="">
                    </div>
                    <div class="col-12 mb-3">
                        <label for="last_name">Email<span>*</span></label>
                        <input type="text" class="form-control" id="email_address" value="" required>
                    </div>
                    <div class="col-12 mb-3">
                        <label for="last_name">Коментарий<span>*</span></label>
                        <textarea class='form-control' id="comments" required></textarea>
                    </div>
                    <div class="col-12 mb-3">
                        <div class="custom-control custom-checkbox d-block mb-2">
                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label" for="customCheck1">Я согласен на обработку персональных данных! <a href="#">Правила обработки</a></label>
                        </div>
                    </div>
                    <input type="hidden" name="token" id="token">
                    <script src="https://www.google.com/recaptcha/api.js?render=6LfIitEZAAAAAJQRx8lSEiZJqeF56fvMlLBv4Exv"></script>
                    <script>
                        grecaptcha.ready(function() {
                            grecaptcha.execute('6LfIitEZAAAAAJQRx8lSEiZJqeF56fvMlLBv4Exv', {
                                    action: 'message'
                                })
                                .then(function(token) {
                                    if (token) {
                                        //console.log(token);
                                        document.getElementById('token').value = token;
                                    }
                                });
                        });
                    </script>


                    <div class="col-12 mb-3">
                        <button disabled id="sendMassage" class="btn essence-btn">Отправить</button>
                    </div>


                </form>
                
                <script lang="JavaScript">
                    $('#customCheck1').click(function() {
                        if ($('#customCheck1').is(':checked')) {

                            $('#sendMassage').prop('disabled', false);
                        } else {
                            $('#sendMassage').prop('disabled', true);
                        }
                    })
                    $('#sendMassage').click(function() {
                        if($('#first_name').val()!='' && $('#email_address').val()!='' && $('#comments').val()!=''){
                        $.ajax({
                            url: '/includes/action.php',
                            data: {
                                action: "message",
                                token: $('#token').val(),
                                name: $('#first_name').val(),
                                mail: $('#email_address').val(),
                                phone: $('#phone_number').val(),
                                message: $('#comments').val(),
                            },
                            type: 'post',
                            success: function(result) {
                                //if()
                                $('#message_form').hide();
                                $('.thanks_form').css("display", "block");
                                alert(result)
                            }
                        });
                    }
                    else{
                        $('.error_form').css("display", "block");
                    }
                    })
                </script>
            </div>
        </div>
    </div>
</section>
<?php
include_once 'footer.php';
?>