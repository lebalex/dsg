import { ModalYesNo } from './ModalYesNo';
export class ProductsManagerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      itemsProduct: [],
      value_id: -1,
      value_file: null,
      categ_id: 0,
      value_select: Product,
      search_string: ''
    };
    this.toggleModalYes = this.toggleModalYes.bind(this);
    this.save = this.save.bind(this);
  }
  componentDidMount() {
    fetch("/includes/get_data.php?x=get_categ_db")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: result
          });
          this.loadDate(this.state.items[0].id)
        },
        (error) => {
          this.setState({
            error
          });
        }
      )


  }
  loadDate(c) {
    fetch(`/includes/get_data.php?x=get_all_products_db&categ_id=${c}`)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result);
          this.setState({
            isLoaded: true,
            itemsProduct: result,
            categ_id: c
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
  search() {
    //console.log(this.state.search_string);
    this.setState({
      isLoaded: false
    });
    fetch(`/includes/get_data.php?x=get_search&search_string=${this.state.search_string}`)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result);
          this.setState({
            itemsProduct: result,
            isLoaded: true,
          });
        },
        (error) => {
          this.setState({
            error,
            isLoaded: true,
          });
        }
      )

  }
  searchClear()
  {
    this.setState({
      isLoaded: false,
      search_string: ''
    });
    this.loadDate(this.state.categ_id)
  }
  edit(index) {
    let tmp = new Product();
    if (index != -1)
      tmp = this.state.itemsProduct[index];
    if (tmp.description === null)
      tmp.description = '';
    //console.log(tmp);
    //this.setState({value_select:tmp, edit:true })
    this.setState({ value_select: tmp })
  }
  save(event) {
    //console.log(event)
    const fileField = this.state.value_file
    const formData = new FormData()
    formData.append('x', 'editproduct')
    formData.append('id_categ', this.state.categ_id)
    formData.append('id', this.state.value_select.id)
    formData.append('name', this.state.value_select.name)
    formData.append('oem', this.state.value_select.oem)
    formData.append('count', this.state.value_select.count)
    formData.append('coast', this.state.value_select.coast)
    formData.append('description', this.state.value_select.description)
    if (fileField != undefined) formData.append('img', fileField[0])

    //console.log(this.state.value_select);
    fetch('/includes/set_data.php', {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        console.log(data)
        if (data != -1)
          console.log(data)
          if(this.state.search_string!='')
            this.search();
          else
            this.loadDate(this.state.categ_id)
      })
      .catch(error => {
        console.error(error)
      })
    $('.modal').modal('hide');
    event.preventDefault();
  }

  del(id) {
    console.log(id)
    const formData = new FormData()
    formData.append('x', 'delproduct')
    formData.append('id', id)
    fetch('/includes/set_data.php', {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        if (data != -1)
          console.log(data)
        this.loadDate(this.state.categ_id)
      })
      .catch(error => {
        console.error(error)
      })
  }

  changeCateg(e) {
    this.loadDate(e.target.value)
  }
  changeName(e) {
    let tmp = new Product();
    tmp = this.state.value_select;
    tmp.name = e.target.value
    this.setState({ value_select: tmp })
  }
  changeOem(e) {
    let tmp = new Product();
    tmp = this.state.value_select;
    tmp.oem = e.target.value
    this.setState({ value_select: tmp })
  }
  changeCount(e) {
    let tmp = new Product();
    tmp = this.state.value_select;
    tmp.count = e.target.value
    this.setState({ value_select: tmp })
  }
  changeCoast(e) {
    let tmp = new Product();
    tmp = this.state.value_select;
    tmp.coast = e.target.value
    this.setState({ value_select: tmp })
  }
  changeDescription(e) {
    let tmp = new Product();
    tmp = this.state.value_select;
    tmp.description = e.target.value
    this.setState({ value_select: tmp })
  }
  changeImg(e) {
    this.setState({ value_file: e.target.files })

    /**/
  }
  changeSearch(e)
  {
      this.setState({ search_string: e.target.value })
  }
  onEnterPress(event)
  {
    //console.log(this.state.search_string);
    //console.log(event.key);
    if (event.key === 'Enter') {
      this.search()
    }
  }
  toggleModalDel(id) {
    this.setState({
      value_id: id
    });
  }

  toggleModalYes() {
    this.del(this.state.value_id);
  }

  render() {
    const { error, isLoaded, items, itemsProduct } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <div>

          <div className="col-12">
            <div className="product-topbar d-flex align-items-center justify-content-between">
              <div className="mt-3">

                <label>Категории: </label>
                <select className="select-categ form-control" id="lang" value={this.state.categ_id} onChange={(e) => this.changeCateg(e)} >
                  {items.map(item => (
                    <option value={item.id} key={item.id}>{item.name}</option>))}
                </select>


              </div>
              <div className="mt-5"><label>Поиск: </label>
              <div className="mt-1 d-flex">
                            <div className="form-group">
                                <input className="form-control" type="search" name="search" id="headerSearch"
                                value={this.state.search_string} style={{width:'300px'}} placeholder="поиск по названиею и OEM" 
                                onChange={(e) => this.changeSearch(e)}  onKeyPress={event => this.onEnterPress(event)}/>
    </div>
                            <div className="form-group">
    <button className="btn bg-transparent" style={{marginLeft:'-40px', zIndex: '100'}}  onClick={() => this.searchClear()}>
      <i className="fa fa-times"></i>
    </button>
                            </div>
                            <div className="form-group">
                                <button className="btn edit-btn-search-icon" onClick={() => this.search()}><i className="fa fa-search" aria-hidden="true"></i></button>
                            </div>
                            {/*<div className="form-group">
                            <button className="btn edit-btn-search-icon" onClick={() => this.searchClear()} title="Очистить поиск"><i className="icon-cancel"></i></button>
                  </div>*/}

                        </div>
                        </div>



            </div>
          </div>


          <div className="row">
            <button onClick={() => this.edit(-1)} className="btn edit-btn" data-toggle="modal" data-target=".bd-edit-modal-lg"><i className="icon-plus" />добавить</button>


          </div>
          <table className="table" >
            <thead>
              <tr>
                <th scope="col" className="border-top-0 border-right border-bottom-0">Название</th>
                <th width="200px" scope="col" className="border-top-0 border-right border-bottom-0">OEM</th>
                <th width="70px" scope="col" className="border-top-0 border-right border-bottom-0">Остаток</th>
                <th width="70px" scope="col" className="border-top-0 border-right border-bottom-0">Цена</th>
                <th width="100px" scope="col" className="border-top-0 border-right border-bottom-0">Изображение</th>
                <th width="200px" scope="col" className="border-top-0 border-right border-bottom-0 border-right-0"></th>
              </tr>
            </thead>
            <tbody>


              {itemsProduct.map((item, index) => (
                <tr key={index}>
                  <td scope="row" className="border-right border-bottom-0">{item.name}</td>
                  <td className="border-right border-bottom-0">{item.oem}</td>
                  <td className="border-right border-bottom-0">{item.count}</td>
                  <td className="border-right border-bottom-0">{item.coast}</td>
                  <td className="border-right border-bottom-0"><img width="100px" src={(item.img != null) ? `/img/product-img/${item.img}` : '/img/product-img/noPhoto.png'} alt="" /></td>
                  <td className="border-right border-bottom-0 border-right-0">
                    <button onClick={() => this.edit(index)} data-toggle="modal" data-target=".bd-edit-modal-lg" className="btn edit-btn-icon"><i className="icon-pencil" /></button>
                    <button onClick={() => this.toggleModalDel(item.id)} className="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i className="icon-trash-empty" /></button>



                  </td>
                </tr>



              ))}
            </tbody>
          </table>



          <div className="modal fade bd-edit-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">Добавить (изменить) товар</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form className="needs-validation" onSubmit={this.save}>
                  <div className="modal-body">

                    <div className="form-group">
                      <label htmlFor="name_prod">Наименование</label>
                      <input type="text" name="name_prod" id="name_prod" className="form-control" value={this.state.value_select.name} onChange={(e) => this.changeName(e)} required
                        placeholder="Наименование" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="oem_prod">OEM</label>
                      <input type="text" name="oem_prod" id="oem_prod" className="form-control" value={this.state.value_select.oem} onChange={(e) => this.changeOem(e)} required
                        placeholder="oem" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="count_prod">Остаток</label>
                      <input type="number" name="count_prod" id="count_prod" className="form-control" value={this.state.value_select.count} onChange={(e) => this.changeCount(e)} required
                        placeholder="остаток" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="coast_prod">Цена</label>
                      <input type="number" name="coast_prod" id="coast_prod" className="form-control" value={(this.state.value_select.coast === null) ? 0 : this.state.value_select.coast} onChange={(e) => this.changeCoast(e)} required
                        placeholder="цена" />
                    </div>
                    <label htmlFor="email_address">Описание</label>
                    <textarea rows="5" cols="90" className="form-control" onChange={(e) => this.changeDescription(e)} defaultValue={this.state.value_select.description} ></textarea>
                    <div className="form-group"><label>Изображение</label><input type="file" className="form-control" onChange={(e) => this.changeImg(e)}
                      placeholder="Изображение" /></div>

                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" type="submit">Сохранить</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                  </div>
                </form>
              </div>
            </div>
          </div>



          <ModalYesNo show={true}
            onYes={this.toggleModalYes}
            onNo={this.toggleModalNo} title="Предупреждение">
            Вы желаете удалить товар?
        </ModalYesNo>

          {/*<div className={`${this.state.edit ? 'popup_max' : 'hidden'} `}>
            <div className="modal2">
              <div className="close_btn" title="Закрыть"><i className="icon-cancel" onClick={() => this.close()}></i></div>
              <div className="form-horizontal form-group">
                <div className="formCaption">
                  Добавить (изменить) товар
                </div></div>
              <div className="form-group"></div>
              <div className="form-group">
                <label>Наименование</label>
                <input type="text" className="textFieldName" value={this.state.value_select.name} onChange={(e) => this.changeName(e)}
                  placeholder="Наименование" />
              </div>

              <div className="form-group">
                <label>OEM</label>
                <input type="text" className="textField" value={this.state.value_select.oem} onChange={(e) => this.changeOem(e)}
                  placeholder="oem" />
              </div>
              <div className="form-group">
                <label>Остаток</label>
                <input type="text" className="textField" value={this.state.value_select.count} onChange={(e) => this.changeCount(e)}
                  placeholder="остаток" />
              </div>
              <div className="form-group">
                <label>Цена</label>
                <input type="text" className="textField" value={(this.state.value_select.coast === null) ? 0 : this.state.value_select.coast} onChange={(e) => this.changeCoast(e)}
                  placeholder="цена" />
              </div>
              <label>Описание</label>
              <textarea rows="10" cols="90" className="textField" onChange={(e) => this.changeDescription(e)} defaultValue={this.state.value_select.description} ></textarea>
              <div className="form-group"><label>Изображение</label><input type="file" className="textField" onChange={(e) => this.changeImg(e)}
                placeholder="Изображение" /></div>
              <div className="form-group">
                <input type="hidden" name="action" value="addCategory" />
                <button onClick={() => this.save()} className="btn edit-btn">сохранить</button>
              </div>
            </div>
          </div>*/}



        </div>
      );
    }
  }

}

class Product {
  static id;
  static name;
  static oem;
  static count;
  static coast;
  static img;
  static description;
  constructor() {
    this.id = -1;
    this.name = '';
    this.oem = '';
    this.description = '';
    this.count = 0;
    this.coast = 0;
  }

}
ReactDOM.render(<ProductsManagerList />, document.getElementById('editableField'));