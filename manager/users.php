<?php
include_once 'header_manager.php';
?>

<section class="new_arrivals_area section-padding-80-0 clearfix">
    <div class="container">
        <div class="row">
            <div class="col-12" id="editableField">



                <div class="row section-heading">
                    <div class="col-12">
                        <div class="product-topbar d-flex align-items-center justify-content-between">
                            <div class="mt-3">
                                <div class="custom-control custom-checkbox d-block mb-2"><input type="checkbox" class="custom-control-input" id="customOnlyReg"><label class="custom-control-label" for="customOnlyReg">Только зарегистрированные клиенты</label></div>
                            </div>
                            <div class="product-sorting d-flex"><input type="search" name="search" id="headerSearch" placeholder="поиск по ФИО и email"><button class="btn edit-btn-icon"><i class="fa fa-search" aria-hidden="true"></i></button></div>
                        </div>
                    </div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col" class="border-top-0 border-right border-bottom-0">ФИО</th>
                                <th width="200px" scope="col" class="border-top-0 border-right border-bottom-0">Телефон</th>
                                <th width="200px" scope="col" class="border-top-0 border-right border-bottom-0">Email</th>
                                <th width="100px" scope="col" class="border-top-0 border-right border-bottom-0">Скидка</th>
                                <th width="100px" scope="col" class="border-top-0 border-right border-bottom-0">Рег на сайте</th>
                                <th width="200px" scope="col" class="border-top-0 border-right border-bottom-0 border-right-0">Дата</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">Федор</td>
                                <td class="border-right border-bottom-0">964755123</td>
                                <td class="border-right border-bottom-0"><a href="mailto:fdf@mail.ru">fdf@mail.ru</a></td>
                                <td class="border-right border-bottom-0">10%</td>
                                <td class="border-right border-bottom-0"><i class="icon-ok"></i></td>
                                <td class="border-right border-bottom-0 border-right-0">0000-00-00 00:00:00</td>
                            </tr>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">Test</td>
                                <td class="border-right border-bottom-0">123</td>
                                <td class="border-right border-bottom-0"><a href="mailto:test@test">test@test</a></td>
                                <td class="border-right border-bottom-0">18%</td>
                                <td class="border-right border-bottom-0"><i class="icon-ok"></i></td>
                                <td class="border-right border-bottom-0 border-right-0">2020-10-06 09:09:27</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="hidden ">
                        <div class="modal2">
                            <div class="close_btn" title="Закрыть"><i class="icon-cancel"></i></div>
                            <div class="form-horizontal form-group">
                                <div class="formCaption">Карточка клиента</div>
                            </div>
                            <div class="form-group"></div>
                            <div class="form-group"><label>ФИО</label><input type="text" class="textFieldName" readonly="" placeholder="Наименование" value=""></div>
                            <div class="form-group"><label>Телефон</label><input type="text" class="textField" readonly="" placeholder="oem" value=""></div>
                            <div class="form-group"><label>Email</label><input type="text" class="textField" readonly="" placeholder="остаток" value=""></div>
                            <div class="form-group"><label>Скидка в %</label><input type="number" class="textField" placeholder="скидка в %" value="0"></div>
                            <div class="form-group"><input type="hidden" name="action" value="addCategory"><button class="btn edit-btn">сохранить</button></div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    </div>
</section>
<script src="/js/jsmin/UsersManagerList.js"></script>
<!--script type="text/babel">ReactDOM.render(<UsersManagerList />, document.getElementById('editableField'));</script-->


<?php include_once 'footer_manager.php'; ?>