import { ProductOne } from './ProductOne';
export class SearchProduct extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoadedP: false,
      itemsProduct:[],
      search_string:this.props.search_string,


    };
  }
    componentDidMount() {
        fetch(`/includes/get_data.php?x=get_search&search_string=${this.state.search_string}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            itemsProduct: result,
            isLoadedP: true,
          });
        },
        (error) => {
          this.setState({
            error,
            isLoadedP: true,
          });
        }
      )

  }



  EmptyFavor() {
      if(this.state.itemsProduct.length===0)
        return (
            <div><p>Ничего не найдено</p></div>
        );
  }


  render() {

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
                                        <p>Результаты поиска</p>
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
ReactDOM.render(
  <SearchProduct search_string={search_string}/>,
  document.getElementById('data_page')
);