!function(e){var t={};function a(l){if(t[l])return t[l].exports;var o=t[l]={i:l,l:!1,exports:{}};return e[l].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=e,a.c=t,a.d=function(e,t,l){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(a.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(l,o,function(t){return e[t]}.bind(null,o));return l},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=38)}({38:function(e,t,a){"use strict";a.r(t),a.d(t,"CategManagerList",(function(){return l}));class l extends React.Component{constructor(e){super(e),this.state={error:null,isLoaded:!1,items:[],value_name:"",value_id:-1,value_file:null},this.toggleModalYes=this.toggleModalYes.bind(this),this.save=this.save.bind(this)}componentDidMount(){this.loadDate()}loadDate(){fetch("/includes/get_data.php?x=get_categ_db").then(e=>e.json()).then(e=>{this.setState({isLoaded:!0,items:e})},e=>{this.setState({isLoaded:!0,error:e})})}edit(e,t){this.setState({value_name:t,edit:!0,value_id:e})}save(e){const t=this.state.value_file,a=new FormData;a.append("x","editcateg"),a.append("id",this.state.value_id),a.append("name",this.state.value_name),null!=t&&a.append("img",t[0]),fetch("/includes/set_data.php",{method:"POST",body:a}).then(e=>e.text()).then(e=>{-1!=e&&console.log(e),this.loadDate()}).catch(e=>{console.error(e)}),$(".modal").modal("hide"),e.preventDefault()}del(e){const t=new FormData;t.append("x","delcateg"),t.append("id",e),fetch("/includes/set_data.php",{method:"POST",body:t}).then(e=>e.text()).then(e=>{this.loadDate()}).catch(e=>{console.error(e)})}changeText(e){this.setState({value_name:e.target.value})}changeImg(e){this.setState({value_file:e.target.files})}toggleModalDel(e){this.setState({value_id:e})}toggleModalYes(){this.del(this.state.value_id)}render(){const{error:e,isLoaded:t,items:a}=this.state;return e?React.createElement("div",null,"Ошибка: ",e.message):t?React.createElement("div",null,React.createElement("button",{onClick:()=>this.edit(-1,""),className:"btn edit-btn","data-toggle":"modal","data-target":".bd-edit-modal-lg"},"добавить"),React.createElement("table",{className:"table"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{scope:"col",className:"border-top-0 border-right border-bottom-0"},"Название"),React.createElement("th",{width:"100px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"Изображение"),React.createElement("th",{width:"200px",scope:"col",className:"border-top-0 border-right border-bottom-0 border-right-0"}))),React.createElement("tbody",null,a.map((e,t)=>React.createElement("tr",{key:t},React.createElement("td",{scope:"row",className:"border-right border-bottom-0"},e.name),React.createElement("td",{className:"border-right border-bottom-0"},React.createElement("img",{width:"100px",src:"/img/categ-img/"+e.img,alt:""})),React.createElement("td",{className:"border-right border-bottom-0 border-right-0"},React.createElement("button",{onClick:()=>this.edit(e.id,e.name),className:"btn edit-btn-icon","data-toggle":"modal","data-target":".bd-edit-modal-lg"},React.createElement("i",{className:"icon-pencil"})),React.createElement("button",{onClick:()=>this.toggleModalDel(e.id),className:"btn edit-btn-icon-red","data-toggle":"modal","data-target":"#modalYesNo"},React.createElement("i",{className:"icon-trash-empty"}))))))),React.createElement("div",{className:"modal fade bd-edit-modal-lg",tabIndex:"-1",role:"dialog","aria-labelledby":"myLargeModalLabel","aria-hidden":"true"},React.createElement("div",{className:"modal-dialog modal-lg"},React.createElement("div",{className:"modal-content"},React.createElement("div",{className:"modal-header"},React.createElement("h5",{className:"modal-title",id:"exampleModalLongTitle"},"Добавить (изменить) категорию"),React.createElement("button",{type:"button",className:"close","data-dismiss":"modal","aria-label":"Close"},React.createElement("span",{"aria-hidden":"true"},"×"))),React.createElement("form",{className:"needs-validation",onSubmit:this.save},React.createElement("div",{className:"modal-body"},React.createElement("div",{className:"form-group"},React.createElement("label",{htmlFor:"name_categ"},"Наименование"),React.createElement("input",{type:"text",name:"name_categ",id:"name_categ",className:"form-control",value:this.state.value_name,onChange:e=>this.changeText(e),required:!0,placeholder:"Наименование"})),React.createElement("div",{className:"form-group"},React.createElement("label",null,"Изображение"),React.createElement("input",{type:"file",className:"form-control",onChange:e=>this.changeImg(e),placeholder:"Изображение"}))),React.createElement("div",{className:"modal-footer"},React.createElement("button",{type:"button",className:"btn btn-primary",type:"submit"},"Сохранить"),React.createElement("button",{type:"button",className:"btn btn-secondary","data-dismiss":"modal"},"Отмена")))))),React.createElement("div",{className:"modal fade",id:"modalYesNo",tabIndex:"-1",role:"dialog","aria-labelledby":"modalYesNoTitle","aria-hidden":"true"},React.createElement("div",{className:"modal-dialog modal-dialog-centered",role:"document"},React.createElement("div",{className:"modal-content"},React.createElement("div",{className:"modal-header"},React.createElement("h5",{className:"modal-title",id:"exampleModalLongTitle"},"Предупреждение!"),React.createElement("button",{type:"button",className:"close","data-dismiss":"modal","aria-label":"Close"},React.createElement("span",{"aria-hidden":"true"},"×"))),React.createElement("div",{className:"modal-body"},"Вы желаете удалить категорию?"),React.createElement("div",{className:"modal-footer"},React.createElement("button",{type:"button",className:"btn btn-danger","data-dismiss":"modal",onClick:()=>this.toggleModalYes()},"Да"),React.createElement("button",{type:"button",className:"btn btn-primary","data-dismiss":"modal"},"Нет")))))):React.createElement("div",null,"Загрузка...")}}ReactDOM.render(React.createElement(l,null),document.getElementById("editableField"))}});