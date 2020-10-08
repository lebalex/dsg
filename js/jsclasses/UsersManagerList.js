export class UsersManagerList extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      onlyReg:true,
      items:[],
      search_user:'',
      u_idx:-1,
      u_id:-1,
      u_name:'',
      u_phone:'',
      u_email:'',
      u_discont:0,

    };
    this.save = this.save.bind(this);
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
            items: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
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
  openUser(idx) {
    //console.log(this.state.items[idx].id);
    if(this.state.items[idx].registr!=0)
    this.setState({
      u_idx:idx,
            u_id:this.state.items[idx].id,
            u_name:this.state.items[idx].name,
            u_phone:this.state.items[idx].phone,
            u_email:this.state.items[idx].email,
            u_discont:this.state.items[idx].discont,
            edit_card_user:true});
  }
  changeDiscont(e)
  {
    this.setState({ u_discont: e.target.value })
  }

  save(event)
  {
    const formData = new FormData()
        formData.append('x', 'edituser_discont')
        formData.append('id', this.state.u_id)
        formData.append('discont', this.state.u_discont)
    fetch('/includes/set_data.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
        if(data!=0)
            console.log(data)

            var tmp=this.state.items[this.state.u_idx];
            tmp.discont = this.state.u_discont;
            const newList = this.state.items.map(o => {
              if (o.id === this.state.u_id) {
                return tmp;
              }
              return o;
            });

            this.setState({items:newList})


    })
    .catch(error => {
      console.error(error)
    })
    $('.modal').modal('hide');
    event.preventDefault();
  }
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else  {
      return (

<div>


                <div className="col-12">
                    <div className="product-topbar d-flex align-items-center justify-content-between">
                        <div className="mt-3">

                            <div className="custom-control custom-checkbox d-block mb-2">
                                <input type="checkbox" className="custom-control-input" id="customOnlyReg" checked={this.state.onlyReg}
                                onChange={(e)=> this.setState({onlyReg:!this.state.onlyReg})}/>
                                <label className="custom-control-label" htmlFor="customOnlyReg">Только зарегистрированные клиенты</label>
                            </div>



                        </div>
                        <div className="product-sorting d-flex">
                            <input type="search" name="search" id="headerSearch" placeholder="поиск по ФИО и email" onChange={(e)=> this.changeSearch(e)}/>
                            <button className="btn edit-btn-icon" onClick={()=> this.loadData()}><i className="fa fa-search" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>


<table className="table table-hover" >
  <thead>
    <tr>
      <th scope="col" className="border-top-0 border-right border-bottom-0">ФИО</th>
      <th width="200px" scope="col" className="border-top-0 border-right border-bottom-0">Телефон</th>
      <th width="200px" scope="col" className="border-top-0 border-right border-bottom-0">Email</th>
      <th width="100px" scope="col" className="border-top-0 border-right border-bottom-0">Скидка</th>
      <th width="100px" scope="col" className="border-top-0 border-right border-bottom-0">Рег на сайте</th>
      <th width="200px" scope="col" className="border-top-0 border-right border-bottom-0 border-right-0">Дата</th>
    </tr>
  </thead>
  <tbody>

{(this.state.onlyReg)?

          items.map((item, index) => (
            (item.registr===1)?
             (<tr key={index} onClick={() => this.openUser(index)} data-toggle="modal" data-target=".bd-edit-modal-lg">
      <td scope="row" className="border-right border-bottom-0">{item.name}</td>
      <td className="border-right border-bottom-0">{item.phone}</td>
      <td className="border-right border-bottom-0"><a href={`mailto:${item.email}`}>{item.email}</a></td>
      <td className="border-right border-bottom-0">{(item.discont===0)?'':item.discont+'%'}</td>
      <td className="border-right border-bottom-0">{this.registr(item.registr)}</td>
      <td className="border-right border-bottom-0 border-right-0">{item.dt}</td>
    </tr>):'')):
          items.map((item, index) => (
             <tr key={index} onClick={() => this.openUser(index)}>
      <td scope="row" className="border-right border-bottom-0">{item.name}</td>
      <td className="border-right border-bottom-0">{item.phone}</td>
      <td className="border-right border-bottom-0"><a href={`mailto:${item.email}`}>{item.email}</a></td>
      <td className="border-right border-bottom-0">{(item.discont===0)?'':item.discont+'%'}</td>
      <td className="border-right border-bottom-0">{this.registr(item.registr)}</td>
      <td className="border-right border-bottom-0 border-right-0">{item.dt}</td>
    </tr>))



    }
          </tbody>
</table>


<div className="modal fade bd-edit-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">Карточка клиента</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form className="needs-validation" onSubmit={this.save}>
                  <div className="modal-body">

                    <div className="form-group">
                      <label htmlFor="user_name">ФИО</label>
                      <input type="text" name="user_name" id="user_name" className="form-control" value={this.state.u_name} readOnly
                        placeholder="ФИО" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="user_tel">Телефон</label>
                      <input type="tel" name="user_tel" id="user_tel" className="form-control" value={this.state.u_phone} readOnly
                        placeholder="Телефон" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="user_email">Email</label>
                      <input type="text" name="user_email" id="user_email" className="form-control" value={this.state.u_email}  readOnly
                        placeholder="Email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="discont">Скидка в %</label>
                      <input type="number" name="discont" id="discont" className="form-control" value={(this.state.u_discont===null)?0:this.state.u_discont}
                       onChange={(e) => this.changeDiscont(e)}
                        placeholder="Скидка в %" />
                    </div>

                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" type="submit">Сохранить</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                  </div>
                </form>
              </div>
            </div>
          </div>




</div>
);
    }
}

}
ReactDOM.render(<UsersManagerList />, document.getElementById('editableField'));