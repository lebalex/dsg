function addChart(product_id) {
    $.ajax({
        url: '/includes/set_data.php',
        data: {
            x: "addchart",
            product: product_id
        },
        type: 'post',
        success: function(result) {
            //alert(result)
            $('#count_in_chart').text(result);

        }
    });
}

function addFavouritet(e, product_id) {
    $.ajax({
        url: '/includes/set_data.php',
        data: {
            x: "addFavouritet",
            product: product_id
        },
        type: 'post',
        success: function(result) {
            //alert(result)
            $(e).toggleClass('active');

            $('#count_in_favouritet').text(result.count);

        }
    });
}

function createDivTopProduct(name, id, img, coast, id_categ, active) {
    if (img === null) img = "noPhoto.png";
    if (coast === null) coast = 0;
    return `<div class="single-product-wrapper">
        <div class="product-img">
        <img src="/img/product-img/${img}" alt="">
        <div class="product-favourite"><a onclick="addFavouritet(this, ${id})" class="favme ${active} fa fa-heart"></a></div>
        </div>
        <div class="product-description">
        <a href="/catalog/${id_categ}/${id}">
        <h6>${name}</h6>
        </a>
        <p class="product-price">${new Intl.NumberFormat('ru-RU', {style: 'currency',currency: 'RUB',}).format(coast)}</p>
        <div class="hover-content">
        <div class="add-to-cart-btn"><button onclick=addChart(${id}) class="btn essence-btn">В корзину</button>
        </div>        </div>        </div>        </div>`;
}

$(document).ready(function() {

    if ($(window).width() > 800) {
        $.getJSON('/includes/get_data.php?x=get_top_products', function(data) {
            var context = '';
            //console.log(data);
            data.forEach(function(obj) {
                //console.log(obj.img);
                var img = obj.img;
                if(img!=null)
                {
                    img = img.split(';')[0]
                }
                context += createDivTopProduct(obj.name, obj.id, img, obj.coast, obj.id_categ, obj.active);

            });
            var carousel = $('.owl-carousel')
            carousel.trigger('destroy.owl.carousel');
            carousel.find('.owl-stage-outer').children().unwrap();
            carousel.removeClass("owl-center owl-loaded owl-text-select-on");
            carousel.html(context);
            carousel.owlCarousel({
                items: 4,
                margin: 30,
                loop: true,
                nav: false,
                dots: false,
                autoplay: true,
                autoplayTimeout: 5000,
                smartSpeed: 1000,
                responsive: {
                    0: {
                        items: 1
                    },
                    576: {
                        items: 2
                    },
                    768: {
                        items: 3
                    },
                    992: {
                        items: 4
                    }
                }
            });
        });
    }else{
        $('.new_arrivals_area').hide();
    }
});