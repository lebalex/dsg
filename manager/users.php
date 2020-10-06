<?php
include_once 'header_manager.php';
?>

<section class="new_arrivals_area section-padding-80-0 clearfix">
    <div class="container">
        <div class="row">
            <div class="col-12" id="editableField">

            </div>
        </div>
    </div>
</section>
<script type="text/babel" src="/js/UsersManagerList.js"></script>
<script type="text/babel">ReactDOM.render(<UsersManagerList />, document.getElementById('editableField'));</script>


<?php include_once 'footer_manager.php'; ?>