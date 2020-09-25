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
    class CategList extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      edit:false,
      value_name:'',
      value_id:-1,
      value_file:null,
      isOpen: false
    };
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
            edit:false
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
  edit(id, name) {
    //console.log(name);
    this.setState({value_name:name, edit:true, value_id:id })
  }
  save() {
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
  }
  del(id) {
    console.log(id)
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
            console.log(data)
    this.loadDate()
  })
  .catch(error => {
    console.error(error)
  })
  }
  close() {
    this.setState({edit:false})
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
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
<div>
<button onClick={() => this.edit( -1, '' )} className="btn edit-btn">добавить</button>
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
        <button onClick={() => this.edit( item.id, item.name )} className="btn edit-btn-icon"><i className="icon-pencil"/></button>
        <button onClick={() => this.toggleModalDel( item.id )} className="btn edit-btn-icon-red"><i className="icon-trash-empty"/></button>


      </td>
    </tr>



          ))}
          </tbody>
</table>

<ModalYesNo show={this.state.isOpen}
            onYes={this.toggleModalYes}
          onNo={this.toggleModalNo}>
          Вы желаете удалить категорию товаров?
        </ModalYesNo>


        <div className={`${this.state.edit?'popup':'hidden'} `}>
        <div className="modal2">
        <div className="close_btn" title="Закрыть"><i className="icon-cancel" onClick={() => this.close()}></i></div>
        <div className="form-horizontal form-group">
        <div className="formCaption">
				 	Добавить (изменить) группу
                </div></div>
                <div className="form-group"></div>
                <div className="form-group">
                <label>Наименование</label>
                <input type="text" className="textField" value={this.state.value_name} onChange={(e) => this.changeText(e)} 
                    placeholder="Наименование" />
                </div>
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

 
  ReactDOM.render(
    <CategList />,
    document.getElementById('editableField')
  );


    </script>
    <script type="text/babel" src="/js/ModalYesNo.js"></script>
</body>

</html>