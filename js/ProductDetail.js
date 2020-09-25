class ProductDetail extends React.Component {
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
getImage(img)
{
if(img===null) return '/img/product-img/noPhoto.png';
else return img;
}

  
  render() {

    let item = this.props.items
    //console.log(item);


      return (
            <div className="col-12 col-md-4 col-lg-12">
                <div className="shop_grid_product_area">
                    <div className="row">
                        <div className="col-12">
                            <div className="product-topbar d-flex align-items-center justify-content-between">
                                <div className="total-products">
                                <p>{item.name}</p>
                                </div>
                                <div className="product-sorting d-flex">
                                <a href={`/catalog/${this.props.id_categ}`} className='nav-link scroll'>
                                <span>{this.props.categ_name}</span>
                                </a>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row" id="products_list">
            <div className="col-12 col-sm-6 col-lg-4" key={item.id}>
                            <div className="single-product-wrapper">
                                <div className="product-img">
                                    <img src={this.getImage(item.img)} alt=""/>
                                    <div className="product-favourite">
                                        <a onClick={() => this.addFavouritet( item.id )}  className={`favme ${(this.state.isFavouritet)?'active':''} fa fa-heart`}></a>
                                    </div>
                                </div>
                                <div className="product-description">
                                        <h6>{item.name}</h6>
                                    <p className="product-price">{item.coast}</p>
                                    <div className="hover-content">
                                        <div className="add-to-cart-btn">
                                        <button onClick={() => this.AddChart( item.id )} className="btn essence-btn">В корзину</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
        </div>
    </div>


            
      );
    }

}