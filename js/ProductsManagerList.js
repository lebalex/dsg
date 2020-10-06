class ProductsManagerList extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      itemsProduct: [],
      edit:false,
      /*value_name:'',*/
      value_id:-1,
      value_file:null,
      /*value_oem:'',
      value_count:0,
      value_coast:0,*/
      isOpen: false,
      categ_id:0,
      value_select:Product,
    };
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
  loadDate(c){
    fetch(`/includes/get_data.php?x=get_all_products_db&categ_id=${c}`)
      .then(res => res.json())
      .then(
        (result) => {
            //console.log(result);
          this.setState({
            isLoaded: true,
            itemsProduct: result,
            edit:false,
            categ_id:c
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            edit:false,
            error
          });
        }
      )
  }
  edit(index) {
    let tmp = new Product();
      if(index!=-1)
        tmp = this.state.itemsProduct[index];
        if(tmp.description===null)
          tmp.description='';
        //console.log(tmp);
    this.setState({value_select:tmp, edit:true })
  }
  save() {
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
            if(fileField!=undefined) formData.append('img', fileField[0])

            //console.log(this.state.value_select);
  fetch('/includes/set_data.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
      if(data!=-1)
            console.log(data)
    this.loadDate(this.state.categ_id)
  })
  .catch(error => {
    console.error(error)
  })
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
      if(data!=-1)
            console.log(data)
      this.loadDate(this.state.categ_id)
  })
  .catch(error => {
    console.error(error)
  })
  }
  close() {
    this.setState({edit:false})
  }
  changeCateg(e)
  {
    //this.setState({categ_id:e.target.value})
    this.loadDate(e.target.value)
  }
  changeName(e)
  {
      let tmp = new Product();
      tmp = this.state.value_select;
      tmp.name = e.target.value
    this.setState({value_select:tmp})
  }
  changeOem(e)
  {
      let tmp = new Product();
      tmp = this.state.value_select;
      tmp.oem = e.target.value
    this.setState({value_select:tmp})
  }
  changeCount(e)
  {
      let tmp = new Product();
      tmp = this.state.value_select;
      tmp.count = e.target.value
    this.setState({value_select:tmp})
  }
  changeCoast(e)
  {
      let tmp = new Product();
      tmp = this.state.value_select;
      tmp.coast = e.target.value
    this.setState({value_select:tmp})
  }
  changeDescription(e)
  {
      let tmp = new Product();
      tmp = this.state.value_select;
      tmp.description = e.target.value
    this.setState({value_select:tmp})
  }
  changeImg(e)
  {
    this.setState({value_file:e.target.files})

  /**/
  }
  toggleModalDel = (id) => {
    this.setState({
      isOpen: !this.state.isOpen,
      value_id:id
    });
  }
  toggleModalNo = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toggleModalYes = () => {
      this.del(this.state.value_id);
    this.setState({
      isOpen: !this.state.isOpen
    });
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
<div className="row section-heading">
<label>Категории: </label>
<select className="select-categ" id="lang" value={this.state.categ_id} onChange={(e) => this.changeCateg(e)} >
{items.map(item => (
                  <option value={item.id} key={item.id}>{item.name}</option>))}
               </select>
 </div>
 <div className="row">
<button onClick={() => this.edit( -1 )} className="btn edit-btn"><i className="icon-plus"/>добавить</button>
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
      <td className="border-right border-bottom-0"><img width="100px" src={(item.img!=null)?`/img/product-img/${item.img}`:'/img/product-img/noPhoto.png'}  alt=""/></td>
      <td className="border-right border-bottom-0 border-right-0">
        <button onClick={() => this.edit( index )} className="btn edit-btn-icon"><i className="icon-pencil"/></button>
        <button onClick={() => this.toggleModalDel( item.id )} className="btn edit-btn-icon-red"><i className="icon-trash-empty"/></button>


      </td>
    </tr>



          ))}
          </tbody>
</table>

<ModalYesNo show={this.state.isOpen}
            onYes={this.toggleModalYes}
          onNo={this.toggleModalNo}>
          Вы желаете удалить товар?
        </ModalYesNo>


        <div className={`${this.state.edit?'popup_max':'hidden'} `}>
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
                <input type="text" className="textField" value={this.state.value_select.coast} onChange={(e) => this.changeCoast(e)} 
                    placeholder="цена" />
                </div>
                <label>Описание</label>
                <textarea rows="10" cols="90"  className="textField" onChange={(e) => this.changeDescription(e)} value={this.state.value_select.description} ></textarea>
                <div className="form-group"><label>Изображение</label><input type="file" className="textField"  onChange={(e) => this.changeImg(e)} 
                placeholder="Изображение"/></div>
				<div className="form-group">
				<input type="hidden" name="action" value="addCategory"/>
                <button onClick={() => this.save()} className="btn edit-btn">сохранить</button>
                </div>
        </div>
        </div>



          </div>
      );
    }
}

}
class Product{
    static id;
    static name;
    static oem;
    static count;
    static coast;
    static img;
    static description;
    constructor() {
        this.id = -1;
        this.name='';
        this.oem='';
        this.description='';
        this.count=0;
        this.coast=0;
  }
}