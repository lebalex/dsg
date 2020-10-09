import {ModalYesNo} from './ModalYesNo';
export class CategManagerList extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      value_name:'',
      value_id:-1,
      value_file:null
    };
    this.toggleModalYes = this.toggleModalYes.bind(this);
    this.save = this.save.bind(this);

  }
    componentDidMount() {
        this.loadDate()
  }
  loadDate(){
    fetch("/includes/get_data.php?x=get_categ_db")
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
            error
          });
        }
      )
  }
  edit(id, name) {
    //console.log(name);
    this.setState({value_name:name, edit:true, value_id:id })
  }
  save(event) {
      //console.log(this.state.value_name);
      //console.log(this.state.value_id);
      const fileField = this.state.value_file
        const formData = new FormData()
            formData.append('x', 'editcateg')
            formData.append('id', this.state.value_id)
            formData.append('name', this.state.value_name)
            if(fileField!=undefined) formData.append('img', fileField[0])

  fetch('/includes/set_data.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
      if(data!=-1)
            console.log(data)
    this.loadDate()
  })
  .catch(error => {
    console.error(error)
  })
  $('.modal').modal('hide');
  event.preventDefault();
  }
  del(id) {
    //console.log(id)
        const formData = new FormData()
            formData.append('x', 'delcateg')
            formData.append('id', id)
  fetch('/includes/set_data.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
      //if(data!=-1)
            //console.log(data)
    this.loadDate()
  })
  .catch(error => {
    console.error(error)
  })
  }

  changeText(e)
  {
    this.setState({value_name:e.target.value})
  }
  changeImg(e)
  {
    //console.log(e.target.value)
    //console.log(e.target.files)
    this.setState({value_file:e.target.files})

  /**/
  }
  toggleModalDel(id){
    this.setState({
      value_id:id
    });
  }

  toggleModalYes(){
      this.del(this.state.value_id);

  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
<div>

<button onClick={() => this.edit( -1, '' )} className="btn edit-btn" data-toggle="modal" data-target=".bd-edit-modal-lg">добавить</button>
<table className="table" >
  <thead>
    <tr>
      <th scope="col" className="border-top-0 border-right border-bottom-0">Название</th>
      <th width="100px" scope="col" className="border-top-0 border-right border-bottom-0">Изображение</th>
      <th width="200px" scope="col" className="border-top-0 border-right border-bottom-0 border-right-0"></th>
    </tr>
  </thead>
  <tbody>


          {items.map((item, index) => (
            <tr key={index}>
      <td scope="row" className="border-right border-bottom-0">{item.name}</td>
      <td className="border-right border-bottom-0"><img width="100px" src={`/img/categ-img/${item.img}`} alt=""/></td>
      <td className="border-right border-bottom-0 border-right-0">
        <button onClick={() => this.edit( item.id, item.name )} className="btn edit-btn-icon" data-toggle="modal" data-target=".bd-edit-modal-lg"><i className="icon-pencil"/></button>
        <button onClick={() => this.toggleModalDel( item.id )} className="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i className="icon-trash-empty"/></button>


      </td>
    </tr>



          ))}
          </tbody>
</table>

<div className="modal fade bd-edit-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">Добавить (изменить) категорию</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form className="needs-validation" onSubmit={this.save}>
                  <div className="modal-body">

                    <div className="form-group">
                      <label htmlFor="name_categ">Наименование</label>
                      <input type="text" name="name_categ" id="name_categ" className="form-control" value={this.state.value_name} onChange={(e) => this.changeText(e)} required
                        placeholder="Наименование" />
                    </div>
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
          Вы желаете удалить категорию?
        </ModalYesNo>

      




          </div>
      );
    }
}

}
ReactDOM.render(<CategManagerList />,    document.getElementById('editableField'));