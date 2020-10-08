(function ($) {
    'use strict';
$("#loginform").on("submit", function(e) {
    e.preventDefault();
    var form = $(this);
    var url = form.attr('action');
    //console.log(url);
    //console.log($('#login').val());
    $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(),
            success: function(data) {
                //console.log(data);
                if(data.code===0){
                    //alert(data.error);
                    //sessionStorage.setItem('name', data.name);
                    $('.modal').modal('hide');
                    $('#count_in_favouritet').text(data.favouritet);
                    $('#login_exit_bth').html(`<a href="/users/account"><img src="/img/core-img/user_login.svg" alt="" title="${data.name}"></a>`);
                    $('#login_exit_bth').after(`<div class="cart-area" id="exit-area"><a href="/logout" id="essenceCartBtn"><img src="/img/core-img/door-exit.svg" alt=""></a>`);
                }else{
                    $('#login').addClass('is-invalid');
                    $('#p').addClass('is-invalid');
                }

            }
        });
})
})(jQuery);