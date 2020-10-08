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

                <p>DSG Комплект- первый интернет-магазин специализирующейся на продаже комплектующих запчастей к коробкам DSG, автомобилей концерна VAG.  
                    Наше преимущество- это многолетний опыт в ремонте данных автомобилей и желание сделать доступным и не дорогим их обслуживание. 
                    
                </p>
            </div>





        </div>
        <div class="row">
            <div class="col-12 col-sm-6 col-md-6">
                <h6>Мы всегда рады вашим вопросам и предложениям!</h6>
                <div class="messages">
                    <div style="display: none;" class="thanks_form">
                        <h4>Спасибо, ваше сообщение отправлено!</h4>
                    </div>
                </div>
                <div class="messages">
                    <div style="display: none;" class="error_form">
                        <h4>Заполните форму!</h4>
                    </div>
                </div>
                <div class="messages">
                    <div style="display: none;" class="error_form2">
                    </div>
                </div>

                <form id="message_form" name="message_form" method="post" action="/includes/action.php" accept-charset="utf-8" class="form-horizontal" role="form">

                    <div class="col-12 mb-3">
                        <label for="first_name">Имя <span>*</span></label>
                        <input type="text" class="form-control" id="first_name" name="first_name" value="" require>
                    </div>
                    <div class="col-12 mb-3">
                        <label for="phone_number">Телефон</label>
                        <input type="tel" class="form-control" id="phone_number" name="phone_number"  value="">
                    </div>
                    <div class="col-12 mb-3">
                        <label for="last_name">Email<span>*</span></label>
                        <input type="text" class="form-control" id="email_address" name="email_address" value="" require>
                    </div>
                    <div class="col-12 mb-3">
                        <label for="last_name">Коментарий<span>*</span></label>
                        <textarea class='form-control' id="comments" name="comments" require></textarea>
                    </div>
                    <div class="col-12 mb-3">
                        <div class="custom-control custom-checkbox d-block mb-2">
                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label" for="customCheck1">Я согласен на обработку персональных данных!&nbsp;
                                <a data-toggle="modal" data-target="#agreementModalLong">Правила обработки</a></label>



                        </div>
                    </div>
                    <input type="hidden" name="action" value="message">
                    <input type="hidden" name="token" id="token">
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
                    <div class="col-12 mb-3">
                        <input disabled id="sendMassage" type="submit" value="Отправить" class="btn essence-btn" />
                        <div id="submit_img" style="display:none">
                            <img src="/img/core-img/loading.gif" width="70" height="70">
                        </div>

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
                    $("#message_form").submit(function(e) {

                        $('#sendMassage').hide();
                        $('#submit_img').show();
                        e.preventDefault();
                        var form = $(this);
                        var url = form.attr('action');
                        if ($('#first_name').val() != '' && $('#email_address').val() != '' && $('#comments').val() != '') {

                            $.ajax({
                                type: "POST",
                                url: url,
                                data: form.serialize(),
                                success: function(data) {
                                    $('#message_form').hide();
                                    $('.thanks_form').css("display", "block");
                                    $('#submit_img').hide();
                                    if (data.code != 1) {
                                        $('.error_form2').css("display", "block");
                                    }
                                }
                            });
                        } else {
                            $('.error_form').css("display", "block");
                        }
                    });
                </script>
            </div>
        </div>
    </div>
</section>




<?php
include_once 'agreement.php';
include_once 'footer.php';
?>