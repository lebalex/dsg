(function ($) {
    'use strict';
    if(sessionStorage.getItem("sid")===null)
    {
        check()
    }
    function check()
    {
        /*console.log(localStorage.getItem("jwt"))*/
        $.ajax({
            type: "POST",
            url: "/includes/process_login.php",
            data: {
                jwt: localStorage.getItem("jwt")
            },
            success: function (data) {
                /*console.log(data)*/
                sessionStorage.setItem("sid",data)
                if(data.code===0)
                {
                    /*console.log(data.code);
                    console.log('ok')*/
                    $('#count_in_favouritet').text(data.favouritet);
                    $('#login_exit_bth').html('<a href="/users/account"><img src="/img/core-img/user_login.svg" alt="" title="Личный кабинет - ${data.name}"></a>');
                    $('#exit-area').html('<a href="/logout"  id="logoutBtn"><img src="/img/core-img/door-exit.svg" alt="">');
                }else
                {
                    $('#count_in_favouritet').text('');
                    $('#login_exit_bth').html('<a href="#1" style="color:#18479f;font-size:13px" data-toggle="modal" data-target="#myLogin">\
                        <img src="/img/core-img/user.svg" alt="" title="Вход для зарегистрированных пользователей"></a>');
                        $('#exit-area').html('');


                    localStorage.removeItem('jwt');
                }
            },
            error: function(xhr) { 
                localStorage.removeItem('jwt');sessionStorage.removeItem('sid');
            },
            complete: function() {
                /*console.log('complete')*/
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
                    $('#login_exit_bth').html('<a href="/users/account"><img src="/img/core-img/user_login.svg" alt="" title="Личный кабинет - ${data.name}"></a>');
                    $('#exit-area').html('<a href="/logout"  id="logoutBtn"><img src="/img/core-img/door-exit.svg" alt="">');
                } else {
                    $('#login').addClass('is-invalid');
                    $('#p').addClass('is-invalid');
                    localStorage.removeItem('jwt');
                }

            },
            error: function(xhr) { 
                localStorage.removeItem('jwt');sessionStorage.removeItem('sid');
            }
        });
    })
})(jQuery);