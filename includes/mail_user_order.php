
<html>
    <head>
</style>
    </head>
    <body style="background-color: silver;">
        <div style="width: 699px;background-color: snow;font-size: 12px;font-family: Verdana, Arial, Helvetica, sans-serif;margin: 10px auto 15px auto;">
            <div style="padding: 30px;">
            Ваш заказ в DSG Комплект
            <div>
                <h3>
                    <a href="https://www.dsgkomplekt.ru"><img src="https://www.dsgkomplekt.ru/img/core-img/logo_dsg.png"/></a>
                </h3>
            </div>
            <div><h4>Спасибо за Ваш заказ.</h4></div>
<table>

    <tr><td>Имя:</td><td><?=$name?></td></tr>
    <tr><td>email:</td><td><?=$email?></td></tr>
    <tr><td>Телефон:</td><td><?=$phone?></td></tr>
    <tr><td>Комvентарий к заказу:</td><td><?=$description?></td></tr>
</table>
<div style="padding-top: 10px;"></div>
<div><h4><?=$order_number?></h4></div>
<table border="1"><tr><th style="text-align: left;">Наименование</th><th style="text-align: left;">OEM</th><th style="text-align: left;">Кол-во</th><th style="text-align: left;">Цена</th></tr>
<?php $sum=0;
foreach ($items as $item): ?>
    <tr><td><?=$item->name?></td><td><?=$item->oem?></td><td><?=$item->count?></td><td><?=$item->coast?></td></tr>
<?php 
$sum += ($item->count * $item->coast);
endforeach; ?>
</table>

<div><h4>Итого:<?=$sum?></h4></div>
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
