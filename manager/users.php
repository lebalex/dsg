<?php
include_once 'header_manager.php';
?>

<section class="new_arrivals_area section-padding-80-0 clearfix">
    <div class="container">
        <div class="row">
            <div class="col-12" id="editableField">

            </div>
        </div>
    </div>
</section>

<script type="text/babel">
    class UsersList extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items:[],
      search_user:''

    };
  }
    componentDidMount() {
    this.loadData();
  }
  loadData()
  {
    fetch("/includes/get_data.php?x=get_users&name="+this.state.search_user)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  registr(exec)
  {
    if(exec==0) return '';
    else return <i className="icon-ok"/>
  }
  changeSearch(e)
  {
    this.setState({ search_user: e.target.value })
  }
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else  {
      return (

<div className="row section-heading">
<input type="search" name="search" id="headerSearch" placeholder="поиск" onChange={(e) => this.changeSearch(e)}/>
                        <button className="btn edit-btn-icon" onClick={() => this.loadData()}><i className="fa fa-search" aria-hidden="true"></i></button>

<table className="table table-hover" >
  <thead>
    <tr>
      <th scope="col" className="border-top-0 border-right border-bottom-0">ФИО</th>
      <th width="200px" scope="col" className="border-top-0 border-right border-bottom-0">Телефон</th>
      <th width="200px" scope="col" className="border-top-0 border-right border-bottom-0">Email</th>
      <th width="100px" scope="col" className="border-top-0 border-right border-bottom-0">Рег на сайте</th>
      <th width="200px" scope="col" className="border-top-0 border-right border-bottom-0 border-right-0">Дата</th>
    </tr>
  </thead>
  <tbody>


          {items.map((item, index) => (
            <tr key={index} >
      <td scope="row" className="border-right border-bottom-0">{item.name}</td>
      <td className="border-right border-bottom-0">{item.phone}</td>
      <td className="border-right border-bottom-0"><a href={`mailto:${item.email}`}>{item.email}</a></td>
      <td className="border-right border-bottom-0">{this.registr(item.registr)}</td>
      <td className="border-right border-bottom-0 border-right-0">{item.dt}</td>
    </tr>



          ))}
          </tbody>
</table>
</div>
);
    }
}

}



  
  ReactDOM.render(
    <UsersList />,
    document.getElementById('editableField')
  );

  
  
  </script>


<?php include_once 'footer_manager.php'; ?>