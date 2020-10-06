<?php
include_once 'header.php';
$error = getParam('error', 0);
$errorText='';
if($error==='authenticated')
{
    $errorText='Не правильный логин или пароль';
}
?>
<div class="container" style="border: solid 0px;min-width: 800px">
    <div class="row" style="border: solid 0px">

        <div class="col-sm-12" style="border: solid 0px">
            <h3 align="center" style="margin: 20px;">
                <span class="strongtext">Произошла ошибка</span>
            </h3>
            <p class="error"><?=$errorText?></p>
        </div>
    </div>

</div>
<!--для div class="container-->

<?php
include_once 'footer.php';
?>