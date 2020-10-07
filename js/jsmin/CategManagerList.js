!function(e){var t={};function a(n){if(t[n])return t[n].exports;var l=t[n]={i:n,l:!1,exports:{}};return e[n].call(l.exports,l,l.exports,a),l.l=!0,l.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)a.d(n,l,function(t){return e[t]}.bind(null,l));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=38)}({38:function(e,t,a){"use strict";a.r(t),a.d(t,"CategManagerList",(function(){return l}));var n=a(5);class l extends React.Component{constructor(e){super(e),this.state={error:null,isLoaded:!1,items:[],edit:!1,value_name:"",value_id:-1,value_file:null,isOpen:!1},this.toggleModalYes=this.toggleModalYes.bind(this),this.toggleModalNo=this.toggleModalNo.bind(this)}componentDidMount(){this.loadDate()}loadDate(){fetch("/includes/get_data.php?x=get_categ_db").then(e=>e.json()).then(e=>{this.setState({isLoaded:!0,items:e,edit:!1})},e=>{this.setState({isLoaded:!0,edit:!1,error:e})})}edit(e,t){this.setState({value_name:t,edit:!0,value_id:e})}save(){const e=this.state.value_file,t=new FormData;t.append("x","editcateg"),t.append("id",this.state.value_id),t.append("name",this.state.value_name),null!=e&&t.append("img",e[0]),fetch("/includes/set_data.php",{method:"POST",body:t}).then(e=>e.text()).then(e=>{-1!=e&&console.log(e),this.loadDate()}).catch(e=>{console.error(e)})}del(e){const t=new FormData;t.append("x","delcateg"),t.append("id",e),fetch("/includes/set_data.php",{method:"POST",body:t}).then(e=>e.text()).then(e=>{this.loadDate()}).catch(e=>{console.error(e)})}close(){this.setState({edit:!1})}changeText(e){this.setState({value_name:e.target.value})}changeImg(e){this.setState({value_file:e.target.files})}toggleModalDel(e){this.setState({isOpen:!this.state.isOpen,value_id:e})}toggleModalNo(){this.setState({isOpen:!this.state.isOpen})}toggleModalYes(){this.del(this.state.value_id),this.setState({isOpen:!this.state.isOpen})}render(){const{error:e,isLoaded:t,items:a}=this.state;return e?React.createElement("div",null,"Ошибка: ",e.message):t?React.createElement("div",null,React.createElement("button",{onClick:()=>this.edit(-1,""),className:"btn edit-btn"},"добавить"),React.createElement("table",{className:"table"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{scope:"col",className:"border-top-0 border-right border-bottom-0"},"Название"),React.createElement("th",{width:"100px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"Изображение"),React.createElement("th",{width:"200px",scope:"col",className:"border-top-0 border-right border-bottom-0 border-right-0"}))),React.createElement("tbody",null,a.map((e,t)=>React.createElement("tr",{key:t},React.createElement("td",{scope:"row",className:"border-right border-bottom-0"},e.name),React.createElement("td",{className:"border-right border-bottom-0"},React.createElement("img",{width:"100px",src:"/img/categ-img/"+e.img,alt:""})),React.createElement("td",{className:"border-right border-bottom-0 border-right-0"},React.createElement("button",{onClick:()=>this.edit(e.id,e.name),className:"btn edit-btn-icon"},React.createElement("i",{className:"icon-pencil"})),React.createElement("button",{onClick:()=>this.toggleModalDel(e.id),className:"btn edit-btn-icon-red"},React.createElement("i",{className:"icon-trash-empty"}))))))),React.createElement(n.ModalYesNo,{show:this.state.isOpen,onYes:this.toggleModalYes,onNo:this.toggleModalNo},"Вы желаете удалить категорию товаров?"),React.createElement("div",{className:(this.state.edit?"popup":"hidden")+" "},React.createElement("div",{className:"modal2"},React.createElement("div",{className:"close_btn",title:"Закрыть"},React.createElement("i",{className:"icon-cancel",onClick:()=>this.close()})),React.createElement("div",{className:"form-horizontal form-group"},React.createElement("div",{className:"formCaption"},"Добавить (изменить) группу")),React.createElement("div",{className:"form-group"}),React.createElement("div",{className:"form-group"},React.createElement("label",null,"Наименование"),React.createElement("input",{type:"text",className:"textField",value:this.state.value_name,onChange:e=>this.changeText(e),placeholder:"Наименование"})),React.createElement("div",{className:"form-group"},React.createElement("label",null,"Изображение"),React.createElement("input",{type:"file",className:"textField",onChange:e=>this.changeImg(e),placeholder:"Изображение"})),React.createElement("div",{className:"form-group"},React.createElement("input",{type:"hidden",name:"action",value:"addCategory"}),React.createElement("button",{onClick:()=>this.save(),className:"btn edit-btn"},"сохранить"))))):React.createElement("div",null,"Загрузка...")}}ReactDOM.render(React.createElement(l,null),document.getElementById("editableField"))},5:function(e,t,a){"use strict";a.r(t),a.d(t,"ModalYesNo",(function(){return n}));class n extends React.Component{render(){return this.props.show?React.createElement("div",{className:"popup"},React.createElement("div",{className:"modal2"},this.props.children,React.createElement("div",{className:"footerModal2"},React.createElement("button",{onClick:this.props.onYes,className:"btn edit-btn-yes"},React.createElement("i",{className:"icon-ok"}),"Да"),React.createElement("button",{onClick:this.props.onNo,className:"btn edit-btn"},React.createElement("i",{className:"icon-cancel"}),"Нет")))):null}}}});