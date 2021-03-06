import { Carousel } from 'react-responsive-carousel';
import "../../css/carousel.css";

export class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavouritet: (this.props.items.active === 'active') ? true : false,
      vImg: 'noPhoto.png'
    };
  }

  AddChart(product_id) {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'x=addchart&product=' + product_id
    };
    fetch('/includes/set_data.php', requestOptions)
      .then(function (response) {
        return response.json();
      }).then(function (data) {
        //console.log('AddChart:', data);
        $('#count_in_chart').text(data);
      });
  }

  addFavouritet(product_id) {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'x=addFavouritet&product=' + product_id
    };
    fetch('/includes/set_data.php', requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result.add);
          //console.log(result.count);
          $('#count_in_favouritet').text(result.count);
          this.setState({ isFavouritet: (result.add === -1) ? false : true });

        },
        (error) => {

        }
      )
  }
  getImage(img) {
    if (img === null) return '/img/product-img/noPhoto.png';
    else {
      return '/img/product-img/' + img.split(';')[0];
    }
  }
  parseImg(imgs) {
    if (imgs != null) {
      let arrayOfImgs = imgs.split(';');
      return arrayOfImgs;
    } else {
      return imgs;
    }
  }
  viewImg(img) {
    this.setState({ vImg: img })
  }


  render() {

    let item = this.props.items
    //console.log(item);
    $('#title_page').text(this.props.categ_name + '/' + item.name);

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
                  <a href='/catalog' className='nav-link-span scroll'>
                    <span>Каталог</span>
                  </a><span class="nav-link-span">/</span>
                  <a href={`/catalog/${this.props.id_categ}`} className='nav-link-span scroll'>
                    <span>{this.props.categ_name}</span>
                  </a>
                </div>

              </div>
            </div>
          </div>
          <div className="row" id="products_list">
            <div className="col-12 col-sm-6 col-lg-4">
              <div className="single-product-wrapper">
                <div className="product-img">
                  {/*<img src={this.getImage(item.img)} alt="" />*/}
                  {(item.img != null && item.img != '') ?
                    <Carousel showArrows={false}  showStatus={false}>

                      {(item.img != null && item.img != '') ? this.parseImg(item.img).map((it, index) => (

                        <div>
                          <img src={`/img/product-img/${it}`} alt="" />
                        </div>
                      )) : ''}


                    </Carousel> : <img src={this.getImage(item.img)} alt="" />}
                  <div className="product-favourite">
                    <a onClick={() => this.addFavouritet(item.id)} className={`favme ${(this.state.isFavouritet) ? 'active' : ''} fa fa-heart`}></a>
                  </div>
                </div>

              </div>
              {/*(item.img != null && item.img != '') ? this.parseImg(item.img).map((it, index) => (

                <a onClick={() => this.viewImg(it)} data-toggle="modal" data-target="#exampleModal">
                  <img width="100px" src={`/img/product-img/${it}`} alt="" />
                </a>
              )) : ''*/}



            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <div className="single-product-wrapper">

                <div className="product-description">
                  <h6>{item.name}</h6>
                  {item.description}
                  <p className="color">OEM: {item.oem}</p>
                  <p className="color">Остаток: {item.count}</p>
                  <p className="price">{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', }).format(item.coast)}</p>
                </div>

                <div className="product-description">

                    <div className="add-to-cart-btn">
                      <button onClick={() => this.AddChart(item.id)} className="btn essence-btn">В корзину</button>
                    </div>

                </div>



              </div>
            </div>

          </div>
        </div>
        {/** 

        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div id="carouselExample" class="carousel slide" data-ride="carousel">
                  <Carousel>
                    {(item.img != null && item.img != '') ? this.parseImg(item.img).map((it, index) => (

                      <div>
                        <img src={`/img/product-img/${it}`} alt="" />
                      </div>
                    )) : ''}
                  </Carousel>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
              </div>
            </div>
          </div>
        </div>
*/}

      </div>



    );
  }

}