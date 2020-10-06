class FavorList extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoadedP: false,
      itemsProduct:[],
      items:[],

    };
  }
    componentDidMount() {
        fetch("/includes/get_data.php?x=get_categ")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: result
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
      this.ProductLists()
  }

  ProductLists() {
    fetch(`/includes/get_data.php?x=get_favor_products`)
      .then(res => res.json())
      .then(
        (result) => {
            //console.log(result);
            if(result===-1){
                this.setState({
            isLoadedP: true,

          });
            }else{
          this.setState({
            isLoadedP: true,
            itemsProduct: result
          });
        }
        },
        (error) => {
          this.setState({
            isLoadedP: true,
            error
          });
        }
      )
  }

  EmptyFavor() {
      if(this.state.itemsProduct.length===0)
        return (
            <div><p>У Вас пока пусто</p></div>
        );
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
    const { error, isLoadedP, itemsProduct } = this.state;

    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoadedP) {
      return <div className="row">Загрузка...</div>
    } else {
      return (
        <div className="row">

            <div className="col-12 col-md-4 col-lg-12">
                <div className="shop_grid_product_area">
                    <div className="row">
                        <div className="col-12">
                            <div className="product-topbar d-flex align-items-center justify-content-between">
                                <div className="total-products">
                                <p><span>{itemsProduct.length}</span> товаров</p>
                                </div>
                                <div className="product-sorting d-flex">
                                        <p>Избранное</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row" id="products_list">


                    {itemsProduct.map(item => (
                      <ProductOne  key={item.id} items={item} url={`/catalog/${item.id_categ}/${item.id}`} />
                    ))}
                    {this.EmptyFavor()}
                    

                    </div>

                </div>
            </div>
</div>
          
          
      );
    }
}
}