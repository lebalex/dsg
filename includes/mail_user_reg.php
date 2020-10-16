
<html>
    <head>
<style type="text/css">
    .wrap {
    width: 699px;
    margin: 10px auto 15px auto;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 12px;
    background-color: snow;
}
</style>
    </head>
    <body style="background-color: silver;">
        <div class="wrap">
            <div style="padding: 30px;">
            вы зарегистрировались на сайте DSG Комплект
            <div>
                <h3>
                    <a href="https://www.dsgkomplekt.ru"><img src="https://www.dsgkomplekt.ru/img/core-img/logo_dsg.png"/></a>
                </h3>
            </div>
            <div><h4>Ваши регистрационные данные</h4></div>
<table>

    <tr><td>Имя:</td><td><?=$name?></td></tr>
    <tr><td>email:</td><td><?=$email?></td></tr>
    <tr><td>Телефон:</td><td><?=$phone?></td></tr>
    <tr><td>Ваш пароль:</td><td><?=$password?></td></tr>
</table>
<div style="padding-top: 10px;">

Вы можете сменить пароль пройдя по этой ссылке <a href="https://www.dsgkomplekt.ru/change_pwd/<?=$insert_id_user?>/<?=$pwd_hash?>">сменить пароль</a>
     </div>
     <div style="padding-top: 10px;">
                            <h6>+7(3952)768-765</h6>
                            <h6>+7(901)65 88 765</h6>
                            <h6><a href="mailto:dsgkomplekt@mail.ru">dsgkomplekt@mail.ru</a></h6>
                        </div>
<div style="padding-top: 10px;">
С уважением, сотрудники DSG Комплект
</div>
</div>
        </div>
        
    </body>
</html>
