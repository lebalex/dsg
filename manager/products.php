<?php
include_once 'header_manager.php';
?>

<section class="new_arrivals_area section-padding-20-0 clearfix">
    <div class="container">
        <div class="row">
            <div class="col-12" id="editableField">

                <!---->
                <div>
                    <div class="col-12">
                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="customOnlyReg" checked="">
                                        <label class="custom-control-label" for="customOnlyReg">Только зарегистрированные клиенты</label>
                                    </div>

                        <div class="product-topbar d-flex align-items-center justify-content-between">
                            <div class="mt-3">
                                <div class="form-group">
                                    <label>Категории: </label><select class="select-categ form-control" id="lang">
                                        <option value="1">DQ200</option>
                                        <option value="2">DQ250</option>
                                        <option value="3">DL501</option>
                                        <option value="4">DQ500</option>
                                    </select>
                                </div>



                            </div>
                            <div class="mt-5"><label>Поиск: </label>
                                <div class="mt-1 d-flex">
                                    <div class="form-group"><input class="form-control" type="search" name="search" id="headerSearch" placeholder="поиск по названиею и OEM" value="" style="width: 300px;"></div>
                                    <div class="form-group"><button class="btn bg-transparent" style="margin-left: -40px; z-index: 100;"><i class="fa fa-times"></i></button></div>
                                    <div class="form-group"><button class="btn edit-btn-search-icon"><i class="fa fa-search" aria-hidden="true"></i></button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row"><button class="btn edit-btn" data-toggle="modal" data-target=".bd-edit-modal-lg"><i class="icon-plus"></i>добавить</button></div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" class="border-top-0 border-right border-bottom-0">Название</th>
                                <th width="200px" scope="col" class="border-top-0 border-right border-bottom-0">OEM</th>
                                <th width="70px" scope="col" class="border-top-0 border-right border-bottom-0">Остаток</th>
                                <th width="70px" scope="col" class="border-top-0 border-right border-bottom-0">Цена</th>
                                <th width="100px" scope="col" class="border-top-0 border-right border-bottom-0">Изображение</th>
                                <th width="200px" scope="col" class="border-top-0 border-right border-bottom-0 border-right-0"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">Гидравл. Масло в Мех-рон</td>
                                <td class="border-right border-bottom-0">G004000m2</td>
                                <td class="border-right border-bottom-0">3</td>
                                <td class="border-right border-bottom-0">1250.00</td>
                                <td class="border-right border-bottom-0"><img width="100px" src="/img/product-img/1197880_img.jpg" alt=""></td>
                                <td class="border-right border-bottom-0 border-right-0"><button data-toggle="modal" data-target=".bd-edit-modal-lg" class="btn edit-btn-icon"><i class="icon-pencil"></i></button><button class="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i class="icon-trash-empty"></i></button></td>
                            </tr>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">Прокладка под Мехатрон</td>
                                <td class="border-right border-bottom-0">0AM927377</td>
                                <td class="border-right border-bottom-0">2</td>
                                <td class="border-right border-bottom-0"></td>
                                <td class="border-right border-bottom-0"><img width="100px" src="/img/product-img/noPhoto.png" alt=""></td>
                                <td class="border-right border-bottom-0 border-right-0"><button data-toggle="modal" data-target=".bd-edit-modal-lg" class="btn edit-btn-icon"><i class="icon-pencil"></i></button><button class="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i class="icon-trash-empty"></i></button></td>
                            </tr>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">Прокладка под Мехатрон</td>
                                <td class="border-right border-bottom-0">a09m72737</td>
                                <td class="border-right border-bottom-0">5</td>
                                <td class="border-right border-bottom-0"></td>
                                <td class="border-right border-bottom-0"><img width="100px" src="/img/product-img/noPhoto.png" alt=""></td>
                                <td class="border-right border-bottom-0 border-right-0"><button data-toggle="modal" data-target=".bd-edit-modal-lg" class="btn edit-btn-icon"><i class="icon-pencil"></i></button><button class="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i class="icon-trash-empty"></i></button></td>
                            </tr>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">Комплект сцепления 0AM с 2009</td>
                                <td class="border-right border-bottom-0">602 0001 00</td>
                                <td class="border-right border-bottom-0">2</td>
                                <td class="border-right border-bottom-0"></td>
                                <td class="border-right border-bottom-0"><img width="100px" src="/img/product-img/noPhoto.png" alt=""></td>
                                <td class="border-right border-bottom-0 border-right-0"><button data-toggle="modal" data-target=".bd-edit-modal-lg" class="btn edit-btn-icon"><i class="icon-pencil"></i></button><button class="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i class="icon-trash-empty"></i></button></td>
                            </tr>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">Комплект сцепления 0AM с 2011</td>
                                <td class="border-right border-bottom-0">602 0006 00</td>
                                <td class="border-right border-bottom-0">2</td>
                                <td class="border-right border-bottom-0"></td>
                                <td class="border-right border-bottom-0"><img width="100px" src="/img/product-img/noPhoto.png" alt=""></td>
                                <td class="border-right border-bottom-0 border-right-0"><button data-toggle="modal" data-target=".bd-edit-modal-lg" class="btn edit-btn-icon"><i class="icon-pencil"></i></button><button class="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i class="icon-trash-empty"></i></button></td>
                            </tr>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">Масло КП DQ 200(запр.2 L)</td>
                                <td class="border-right border-bottom-0">G055512A2</td>
                                <td class="border-right border-bottom-0">4</td>
                                <td class="border-right border-bottom-0"></td>
                                <td class="border-right border-bottom-0"><img width="100px" src="/img/product-img/noPhoto.png" alt=""></td>
                                <td class="border-right border-bottom-0 border-right-0"><button data-toggle="modal" data-target=".bd-edit-modal-lg" class="btn edit-btn-icon"><i class="icon-pencil"></i></button><button class="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i class="icon-trash-empty"></i></button></td>
                            </tr>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">Винты с цилиндрической головкой</td>
                                <td class="border-right border-bottom-0">WHT 001 922</td>
                                <td class="border-right border-bottom-0">4</td>
                                <td class="border-right border-bottom-0"></td>
                                <td class="border-right border-bottom-0"><img width="100px" src="/img/product-img/noPhoto.png" alt=""></td>
                                <td class="border-right border-bottom-0 border-right-0"><button data-toggle="modal" data-target=".bd-edit-modal-lg" class="btn edit-btn-icon"><i class="icon-pencil"></i></button><button class="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i class="icon-trash-empty"></i></button></td>
                            </tr>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">Винт с цилиндрической головкой с внутренней головкой с несколькими зубьями</td>
                                <td class="border-right border-bottom-0">01X 301 127 c</td>
                                <td class="border-right border-bottom-0">17</td>
                                <td class="border-right border-bottom-0"></td>
                                <td class="border-right border-bottom-0"><img width="100px" src="/img/product-img/noPhoto.png" alt=""></td>
                                <td class="border-right border-bottom-0 border-right-0"><button data-toggle="modal" data-target=".bd-edit-modal-lg" class="btn edit-btn-icon"><i class="icon-pencil"></i></button><button class="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i class="icon-trash-empty"></i></button></td>
                            </tr>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">Уплотнительная крышка</td>
                                <td class="border-right border-bottom-0">0AM 301 212A</td>
                                <td class="border-right border-bottom-0">1</td>
                                <td class="border-right border-bottom-0"></td>
                                <td class="border-right border-bottom-0"><img width="100px" src="/img/product-img/noPhoto.png" alt=""></td>
                                <td class="border-right border-bottom-0 border-right-0"><button data-toggle="modal" data-target=".bd-edit-modal-lg" class="btn edit-btn-icon"><i class="icon-pencil"></i></button><button class="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i class="icon-trash-empty"></i></button></td>
                            </tr>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">Винт с цилиндрической головкой с внутренней головкой с несколькими зубьями</td>
                                <td class="border-right border-bottom-0">N 911 743 01</td>
                                <td class="border-right border-bottom-0">25</td>
                                <td class="border-right border-bottom-0"></td>
                                <td class="border-right border-bottom-0"><img width="100px" src="/img/product-img/noPhoto.png" alt=""></td>
                                <td class="border-right border-bottom-0 border-right-0"><button data-toggle="modal" data-target=".bd-edit-modal-lg" class="btn edit-btn-icon"><i class="icon-pencil"></i></button><button class="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i class="icon-trash-empty"></i></button></td>
                            </tr>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">Уплотнение вала</td>
                                <td class="border-right border-bottom-0">0AM 301 733 L</td>
                                <td class="border-right border-bottom-0">1</td>
                                <td class="border-right border-bottom-0"></td>
                                <td class="border-right border-bottom-0"><img width="100px" src="/img/product-img/noPhoto.png" alt=""></td>
                                <td class="border-right border-bottom-0 border-right-0"><button data-toggle="modal" data-target=".bd-edit-modal-lg" class="btn edit-btn-icon"><i class="icon-pencil"></i></button><button class="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i class="icon-trash-empty"></i></button></td>
                            </tr>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">Винт с цилиндрической головкой с внутренним шестигранником</td>
                                <td class="border-right border-bottom-0">02E 409 359</td>
                                <td class="border-right border-bottom-0">20</td>
                                <td class="border-right border-bottom-0"></td>
                                <td class="border-right border-bottom-0"><img width="100px" src="/img/product-img/noPhoto.png" alt=""></td>
                                <td class="border-right border-bottom-0 border-right-0"><button data-toggle="modal" data-target=".bd-edit-modal-lg" class="btn edit-btn-icon"><i class="icon-pencil"></i></button><button class="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i class="icon-trash-empty"></i></button></td>
                            </tr>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">стопорное</td>
                                <td class="border-right border-bottom-0">N 106 616 01</td>
                                <td class="border-right border-bottom-0">1</td>
                                <td class="border-right border-bottom-0"></td>
                                <td class="border-right border-bottom-0"><img width="100px" src="/img/product-img/noPhoto.png" alt=""></td>
                                <td class="border-right border-bottom-0 border-right-0"><button data-toggle="modal" data-target=".bd-edit-modal-lg" class="btn edit-btn-icon"><i class="icon-pencil"></i></button><button class="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i class="icon-trash-empty"></i></button></td>
                            </tr>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">Стопорное кольцо приводного вала</td>
                                <td class="border-right border-bottom-0">02E 311 467</td>
                                <td class="border-right border-bottom-0">1</td>
                                <td class="border-right border-bottom-0"></td>
                                <td class="border-right border-bottom-0"><img width="100px" src="/img/product-img/noPhoto.png" alt=""></td>
                                <td class="border-right border-bottom-0 border-right-0"><button data-toggle="modal" data-target=".bd-edit-modal-lg" class="btn edit-btn-icon"><i class="icon-pencil"></i></button><button class="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i class="icon-trash-empty"></i></button></td>
                            </tr>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">Винт с цилиндрической головкой с внутренней головкой с несколькими зубьями</td>
                                <td class="border-right border-bottom-0">N 101 961 03</td>
                                <td class="border-right border-bottom-0">25</td>
                                <td class="border-right border-bottom-0"></td>
                                <td class="border-right border-bottom-0"><img width="100px" src="/img/product-img/noPhoto.png" alt=""></td>
                                <td class="border-right border-bottom-0 border-right-0"><button data-toggle="modal" data-target=".bd-edit-modal-lg" class="btn edit-btn-icon"><i class="icon-pencil"></i></button><button class="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i class="icon-trash-empty"></i></button></td>
                            </tr>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">Сдвиг вилка 6. / р.</td>
                                <td class="border-right border-bottom-0">0AM 311 562 K</td>
                                <td class="border-right border-bottom-0">1</td>
                                <td class="border-right border-bottom-0"></td>
                                <td class="border-right border-bottom-0"><img width="100px" src="/img/product-img/noPhoto.png" alt=""></td>
                                <td class="border-right border-bottom-0 border-right-0"><button data-toggle="modal" data-target=".bd-edit-modal-lg" class="btn edit-btn-icon"><i class="icon-pencil"></i></button><button class="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i class="icon-trash-empty"></i></button></td>
                            </tr>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">герметики</td>
                                <td class="border-right border-bottom-0">D 176 600 M1</td>
                                <td class="border-right border-bottom-0">1</td>
                                <td class="border-right border-bottom-0"></td>
                                <td class="border-right border-bottom-0"><img width="100px" src="/img/product-img/noPhoto.png" alt=""></td>
                                <td class="border-right border-bottom-0 border-right-0"><button data-toggle="modal" data-target=".bd-edit-modal-lg" class="btn edit-btn-icon"><i class="icon-pencil"></i></button><button class="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i class="icon-trash-empty"></i></button></td>
                            </tr>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">Винтовая пробка</td>
                                <td class="border-right border-bottom-0">N 100 371 05</td>
                                <td class="border-right border-bottom-0">1</td>
                                <td class="border-right border-bottom-0"></td>
                                <td class="border-right border-bottom-0"><img width="100px" src="/img/product-img/noPhoto.png" alt=""></td>
                                <td class="border-right border-bottom-0 border-right-0"><button data-toggle="modal" data-target=".bd-edit-modal-lg" class="btn edit-btn-icon"><i class="icon-pencil"></i></button><button class="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i class="icon-trash-empty"></i></button></td>
                            </tr>
                            <tr>
                                <td scope="row" class="border-right border-bottom-0">Игольчатый подшипник</td>
                                <td class="border-right border-bottom-0">06B 105 313 ​​D</td>
                                <td class="border-right border-bottom-0">1</td>
                                <td class="border-right border-bottom-0"></td>
                                <td class="border-right border-bottom-0"><img width="100px" src="/img/product-img/noPhoto.png" alt=""></td>
                                <td class="border-right border-bottom-0 border-right-0"><button data-toggle="modal" data-target=".bd-edit-modal-lg" class="btn edit-btn-icon"><i class="icon-pencil"></i></button><button class="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i class="icon-trash-empty"></i></button></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="modal fade bd-edit-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Добавить (изменить) товар</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                </div>
                                <form class="needs-validation">
                                    <div class="modal-body">
                                        <div class="form-group"><label for="name_prod">Наименование</label><input type="text" name="name_prod" id="name_prod" class="form-control" required="" placeholder="Наименование" value=""></div>
                                        <div class="form-group"><label for="oem_prod">OEM</label><input type="text" name="oem_prod" id="oem_prod" class="form-control" required="" placeholder="oem" value=""></div>
                                        <div class="form-group"><label for="count_prod">Остаток</label><input type="number" name="count_prod" id="count_prod" class="form-control" required="" placeholder="остаток" value=""></div>
                                        <div class="form-group"><label for="coast_prod">Цена</label><input type="number" name="coast_prod" id="coast_prod" class="form-control" required="" placeholder="цена" value=""></div><label for="email_address">Описание</label><textarea rows="5" cols="90" class="form-control"></textarea>
                                        <div class="form-group"><label>Изображение</label><input type="file" class="form-control" placeholder="Изображение"></div>
                                    </div>
                                    <div class="modal-footer"><button type="submit" class="btn btn-primary">Сохранить</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="modalYesNo" tabindex="-1" role="dialog" aria-labelledby="modalYesNoTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Предупреждение</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                </div>
                                <div class="modal-body">Вы желаете удалить товар?</div>
                                <div class="modal-footer"><button type="button" class="btn btn-danger" data-dismiss="modal">Да</button><button type="button" class="btn btn-primary" data-dismiss="modal">Нет</button></div>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </div>


</section>
<script src="/js/jsmin/ProductsManagerList.js"></script>
<!--script type="text/babel">ReactDOM.render(<ProductsManagerList />,   document.getElementById('editableField') );</script-->
<?php include_once 'footer_manager.php'; ?>