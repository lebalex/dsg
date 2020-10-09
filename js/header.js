(function ($) {
    'use strict';
    if(sessionStorage.getItem("sid")===null)
    {
        check()
    }
    function check()
    {
        $.ajax({
            type: "POST",
            url: "/includes/process_login.php",
            data: {
                jwt: localStorage.getItem("jwt")
            },
            success: function (data) {
                console.log(data)
                sessionStorage.setItem("sid",data)
                if(data.code===0)
                {
                    $('#count_in_favouritet').text(data.favouritet);
                    $('#login_exit_bth').html(`<a href="/users/account"><img src="/img/core-img/user_login.svg" alt="" title="${data.name}"></a>`);
                    //$('#login_exit_bth').after(`<div class="cart-area" id="exit-area"><a href="/logout"  id="logoutBtn"><img src="/img/core-img/door-exit.svg" alt=""></a>`);
                }
            }
        });
    }

    $('#logoutBtn').on("click", function (e) { localStorage.removeItem('jwt');sessionStorage.removeItem('sid'); })

    $("#loginform").on("submit", function (e) {
        e.preventDefault();
        var form = $(this);
        var url = form.attr('action');
        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(),
            success: function (data) {
                console.log(data);
                if (data.code === 0) {
                    localStorage.setItem('jwt', data.jwt);
                    sessionStorage.setItem("sid",data.jwt)
                    $('.modal').modal('hide');
                    $('#count_in_favouritet').text(data.favouritet);
                    $('#login_exit_bth').html(`<a href="/users/account"><img src="/img/core-img/user_login.svg" alt="" title="${data.name}"></a>`);
                    $('#login_exit_bth').after(`<div class="cart-area" id="exit-area"><a href="/logout"  id="logoutBtn"><img src="/img/core-img/door-exit.svg" alt=""></a>`);
                } else {
                    $('#login').addClass('is-invalid');
                    $('#p').addClass('is-invalid');
                    localStorage.removeItem('jwt');
                }

            }
        });
    })
})(jQuery);