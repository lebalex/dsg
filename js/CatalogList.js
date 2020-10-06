class CatalogList extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoadedP: false,
      items: [],
      itemsProduct:[],
      categ_id:this.props.categ_id,
      product_id:this.props.product_id
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
    //console.log(c,p);
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

  clickProduct = (p) => {
    //console.log(p);
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
//console.log('r: '+this.state.product_id+', '+itemsProduct);
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoadedP) {
      return <div className="row">Загрузка...</div>
    } else if (this.state.product_id!=-1) {
      return <div className="row">
              {
                <ProductDetail  items={itemsProduct[0]} id_categ={itemsProduct[0].id_categ} categ_name={this.getCategName(itemsProduct[0].id_categ)}/>
              }
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
                      <ProductOne  key={item.id} items={item} onClickProduct={() => this.clickProduct(item.id)}/>
                    ))}
                    </div>
                </div>
            </div>
</div>
          
          
      );
    }
}
}