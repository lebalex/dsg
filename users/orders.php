<?php
include_once 'header_users.php';
?>

<section class="new_arrivals_area section-padding-80-40 clearfix wrapper">
    <div class="container">
        <div class="row">
            <div class="col-12" id="editableField">

            </div>
        </div>
    </div>


</section>
<script type="text/babel" src="/js/OrdersUserList.js"></script>
<script type="text/babel">ReactDOM.render(<OrdersUserList />,    document.getElementById('editableField'));</script>

<?php include_once '../footer.php'; ?>