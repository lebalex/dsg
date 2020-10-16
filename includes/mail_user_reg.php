<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>

<body style="background-color: silver;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td>
                <table style="background-color: snow;font-size: 12px;font-family: Verdana, Arial, Helvetica, sans-serif;margin: 10px auto 15px auto; padding: 10px;" border="0" width="700" cellspacing="0" cellpadding="0" align="center">
                    <tbody>
                        <tr>
                            <td><div style="padding-top: 10px;padding-bottom: 10px;">вы зарегистрировались на сайте DSG Комплект</div></td>
                        </tr>
                        <tr>
                            <td>
                                <h3>
                                    <a href="https://www.dsgkomplekt.ru"><img src="https://www.dsgkomplekt.ru/img/core-img/logo_dsg.png" /></a>
                                </h3>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Ваши регистрационные данные</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table>

                                    <tr>
                                        <td>Имя:</td>
                                        <td><?= $name ?></td>
                                    </tr>
                                    <tr>
                                        <td>email:</td>
                                        <td><?= $email ?></td>
                                    </tr>
                                    <tr>
                                        <td>Телефон:</td>
                                        <td><?= $phone ?></td>
                                    </tr>
                                    <tr>
                                        <td>Ваш пароль:</td>
                                        <td><?= $password ?></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div style="padding-top: 10px;">

                                    Вы можете сменить пароль пройдя по этой ссылке <a href="https://www.dsgkomplekt.ru/change_pwd/<?= $insert_id_user ?>/<?= $pwd_hash ?>">сменить пароль</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style="padding-top: 10px;">
                                    <h5>+7(3952)768-765</h5>
                                    <h5>+7(901)65 88 765</h5>
                                    <h5><a href="mailto:dsgkomplekt@mail.ru">dsgkomplekt@mail.ru</a></h5>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style="padding-top: 10px; padding-bottom: 40px;">
                                    С уважением, сотрудники DSG Комплект
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </table>




</body>

</html>