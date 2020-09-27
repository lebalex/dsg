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
getImage(img)
{
if(img===null) return '/img/product-img/noPhoto.png';
else return img;
}

  
  render() {

    let item = this.props.items
    //console.log(item);


      return (

            <div className="col-12 col-sm-6 col-lg-4" key={item.id}>
                            <div className="single-product-wrapper">
                                <div className="product-img">

                                    <img src={this.getImage(item.img)} alt=""/>
                                    <div className="product-favourite">
                                        <a onClick={() => this.addFavouritet( item.id )}  className={`favme ${(this.state.isFavouritet)?'active':''} fa fa-heart`}></a>
                                    </div>
                                </div>
                                <div className="product-description">
                                    <a href={this.props.url}  onClick={this.props.onClickProduct}  >
                                        <h6>{item.name}</h6>
                                    </a>
                                    <p className="color">OEM: {item.oem}</p>
                                    <p className="price">{new Intl.NumberFormat('ru-RU', {style: 'currency',currency: 'RUB',}).format(item.coast)}</p>
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