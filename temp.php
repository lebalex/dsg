<?php
include_once 'header.php';
?>


<!-- ##### Welcome Area Start ##### -->
<section class="welcome_area bg-img background-overlay" style="background-image: url(/img/bg-img/bg-1a.jpg);">
    <div class="container h-100">
        <div class="row h-100 align-items-center">
            <div class="col-12">
                <div class="hero-content">
                    <h2>DSG Комплект</h2>
                    <a href="catalog" class="btn essence-btn">Посмотреть каталог</a>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- ##### Welcome Area End ##### -->


<div class="top_catagory_area section-padding-80-0 clearfix">
    <div class="container">
        <div class="row justify-content-center" id="catagory_area">
            <!-- Single Catagory -->
        </div>
    </div>
</div>





<!-- ##### New Arrivals Area Start ##### -->
<section class="new_arrivals_area section-padding-0-80 clearfix">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="section-heading text-center">
                    <h2>Популярные товары</h2>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="popular-products-slides owl-carousel">
                


                </div>
            </div>
        </div>
    </div>
</section>

<script type="text/babel">
class CategList extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
    componentDidMount() {
    fetch("/includes/get_data.php?x=get_categ")
      .then(res => res.json())
      .then(
        (result) => {
            result.push({"name":"Весь каталог", "id":"", "img":"other.jpg"});
            //console.log(result);
          this.setState({
            isLoaded: true,
            items: result
          });
          
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (

          items.map(item => (
            <div className="col-12 col-sm-6 col-md-4" key={item.id}>
            <div className="single-product-wrapper">
            <div className="product-img">
            <div className="product-favourite"><a href="#" className="favme fa fa-heart"></a></div>

            <img src={`/img/categ-img/${item.img}`} alt=""/>
            <img className="hover-img" src="/img/categ-img/black_gr.jpg" alt=""/>
            <div className="catagory-content">
            <span>{item.name}</span>
            </div>
            </div>
            <div className="product-description">
            <div className="hover-content">
            <div className="add-to-cart-btn">
            <a href={`/catalog/${item.id}`} className="btn essence-btn">В каталог</a>
            </div>            
            </div>            
            </div>            
            </div>            
            </div>
          ))

      );
    }
}

}

ReactDOM.render(
  <CategList />,
  document.getElementById('catagory_area')
);
    </script>


<script lang="JavaScript">
    function addChart(product_id)
    {
    $.ajax
    ({ 
        url: '/includes/set_data.php',
        data: {x:"addchart",product: product_id},
        type: 'post',
        success: function(result)
        {
            //alert(result)
            $('#count_in_chart').text(result);
            
        }
    });
    }
    function addFavouritet(e, product_id)
    {
    $.ajax
    ({ 
        url: '/includes/set_data.php',
        data: {x:"addFavouritet",product: product_id},
        type: 'post',
        success: function(result)
        {
            alert(result)
            $(e).toggleClass('active');
            
        }
    });
    }

    
    function createDivTopProduct(name, id, img, coast, id_categ) {
        if (img === null) img = "noPhoto.png";
        if (coast === null) coast = 0;
        return `<div class="single-product-wrapper">
            <div class="product-img">
            <img src="/img/product-img/${img}" alt="">
            <div class="product-favourite"><a onclick="addFavouritet(this, ${id})" class="favme active fa fa-heart"></a></div>
            </div>
            <div class="product-description">
            <a href="/catalog/${id_categ}/${id}">
            <h6>${name}</h6>
            </a>
            <p class="product-price">${coast}</p>
            <div class="hover-content">
            <div class="add-to-cart-btn"><button onclick=addChart(${id}) class="btn essence-btn">В корзину</button>
            </div>
            </div>
            </div>
            </div>`;
    }



        $.getJSON('/includes/get_data.php?x=get_top_products', function(data) {
            var context = '';
            data.forEach(function(obj) {
                context += createDivTopProduct(obj.name, obj.id, obj.img, obj.coast, obj.id_categ);

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
        

</script>

    <!-- ##### Footer Area Start ##### -->
    <?php
include_once 'footer.php';
?>