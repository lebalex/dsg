<?php

include_once 'header.php';
$categ_id = getParam('categ_id', -1);
$product_id= getParam('product', -1);


$title_page="Каталог";
$video_file="vag2";
include_once 'video_baner.php';

?>


<section class="shop_grid_area section-padding-0-80">
    <div class="overlay3 container" id="categ_page">
        <div class="row">
            <div class="col-lg-3 ">
                <div class="sidemenu-container">
                    <div class="wrapperWidthFixedSrollBlock">
                        <div class="selector-fixedSrollBlock menu-navigation" id='navigation'>
                            <div class="selector-fixedSrollBlock-real-heigh">
                                <div class="row">
                                    <ul class='nav' id="menu_categ_left">
                                        <!--меню категорий слева-->
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!---------------------------->
            <div class="col-12 col-md-8 col-lg-9">
                <div class="shop_grid_product_area">
                    <div class="row">
                        <div class="col-12">
                            <div class="product-topbar d-flex align-items-center justify-content-between">
                                <!-- Total Products -->
                                <div class="total-products">
                                    <!--p><span>0</span> товаров</p-->
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="row" id="products_list">

                        <!-- Single Product -->


                                    <!--p class="product-price"><span class="old-price">$7500.00</span> $5500.00</p-->



                    </div>

                </div>
            </div>


        </div>
    </div>
</section>

<script type="text/babel">

class CategListSimpleLeft extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoadedP: false,
      items: [],
      itemsProduct:[],
      categ_id:<?=$categ_id?>,
      product_id:<?=$product_id?>
    };
  }
    componentDidMount() {
    fetch("/includes/get_data.php?x=get_categ")
      .then(res => res.json())
      .then(
        (result) => {
            //console.log(result);
          this.setState({
            items: result
          });
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          this.setState({
            error
          });
        }
      )
      this.ProductLists(this.state.categ_id,this.state.product_id)
  }

  ProductLists(c,p) {
    fetch(`/includes/get_data.php?x=get_all_products&categ_id=${c}&product=${p}`)
      .then(res => res.json())
      .then(
        (result) => {
            //console.log(result);
          this.setState({
            categ_id: c, 
            product_id: p,
            isLoadedP: true,
            itemsProduct: result
          });
          //$('.total-products').html('<p><span>'+result.length+'</span> товаров</p>');
          //console.log(totalproducts);
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          this.setState({
            isLoadedP: true,
            error
          });
        }
      )
  }
  


  ChangCateg(c) {
    this.ProductLists(c,-1)
  }
  ChangProduct(p) {
    this.ProductLists(this.state.categ_id, p)
  }
  MenuLeft(items)
  {
      return <div className="col-lg-3 ">
                <div className="sidemenu-container">
                    <div className="wrapperWidthFixedSrollBlock">
                        <div className="selector-fixedSrollBlock menu-navigation" id='navigation'>
                            <div className="selector-fixedSrollBlock-real-heigh">
                                <div className="row">
                                    <ul className='nav' id="menu_categ_left">
                                   { items.map(item => (
            <li className='col-12  on-ic' key={item.id}><a href='#' onClick={() => this.ChangCateg(item.id)} className='nav-link scroll'><span className="text">{item.name}</span></a></li>
          ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
  }
  getCategName(categ_id)
  {
      let d="Все товары";
      this.state.items.forEach(function(item, i, arr) {
          if(item.id===categ_id) d = item.name;
        });
        return d;
  }
  render() {
    //console.log(this.state.categ_id,this.state.product_id);
    //this.ProductLists(this.state.categ_id,this.state.product_id)
    const { error, isLoadedP, items, itemsProduct } = this.state;

    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoadedP) {
      return <div className="row">Загрузка...</div>
    } else if (this.state.product_id!=-1) {
      return <div className="row">
                {this.MenuLeft(items)}
                <ProductOne items={itemsProduct}/>
                </div>
    }else {
      return (
        <div className="row">
        {this.MenuLeft(items)}

            <div className="col-12 col-md-8 col-lg-9">
                <div className="shop_grid_product_area">
                    <div className="row">
                        <div className="col-12">
                            <div className="product-topbar d-flex align-items-center justify-content-between">
                                <div className="total-products">
                                <p><span>{itemsProduct.length}</span> товаров</p>
                                </div>
                                <div className="product-sorting d-flex">
                                        <p>{this.getCategName(this.state.categ_id)}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row" id="products_list">


                    {itemsProduct.map(item => (
                      <ProductOne  key={item.id} items={item}/>
                    ))}
                    

                    </div>

                </div>
            </div>
</div>
          
          
      );
    }
}
}
ReactDOM.render(
  <CategListSimpleLeft />,
  document.getElementById('categ_page')
);
class ProductOne extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      isFavouritet: (this.props.items.active==='active')?true:false
    };
  }

AddChart(product_id) {

      const requestOptions = {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
          body: 'x=addchart&product='+product_id
        };
    fetch('/includes/set_data.php', requestOptions)
      .then(function(response) {
      return response.json();
      }).then(function(data) {
        //console.log('AddChart:', data);
        $('#count_in_chart').text(data);
      });
}

addFavouritet(product_id) {

    const requestOptions = {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
    body: 'x=addFavouritet&product='+product_id
    };
  fetch('/includes/set_data.php', requestOptions)
  .then(res => res.json())
      .then(
        (result) => {
          //console.log(result.add);
          //console.log(result.count);
          $('#count_in_favouritet').text(result.count);
          this.setState({isFavouritet:(result.add===-1)?false:true});

        },
        (error) => {

        }
      )
}

  
  render() {

    let item = this.props.items


      return (

            <div className="col-12 col-sm-6 col-lg-4" key={item.id}>
                            <div className="single-product-wrapper">
                                <div className="product-img">

                                    <img src={getImage(item.img)} alt=""/>
                                    <div className="product-favourite">
                                        <a onClick={() => this.addFavouritet( item.id )}  className={`favme ${(this.state.isFavouritet)?'active':''} fa fa-heart`}></a>
                                    </div>
                                </div>
                                <div className="product-description">
                                    <a href="#"  onClick={() => this.ChangProduct(item.id)}>
                                        <h6>{item.name}</h6>
                                    </a>
                                    <p className="product-price">{item.coast}</p>
                                    <div className="hover-content">
                                        <div className="add-to-cart-btn">
                                        <button onClick={() => this.AddChart( item.id )} className="btn essence-btn">В корзину</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


      );
    }

}

function getImage(img)
{
if(img===null) return '/img/product-img/noPhoto.png';
else return img;
}
</script>

<?php
include_once 'footer.php';
?>