export class CategList extends React.Component {
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
            /*console.log(result);*/
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
ReactDOM.render(<CategList />,document.getElementById('catagory_area'));