!function(e){var t={};function a(l){if(t[l])return t[l].exports;var c=t[l]={i:l,l:!1,exports:{}};return e[l].call(c.exports,c,c.exports,a),c.l=!0,c.exports}a.m=e,a.c=t,a.d=function(e,t,l){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(a.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)a.d(l,c,function(t){return e[t]}.bind(null,c));return l},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=43)}({43:function(e,t,a){"use strict";a.r(t),a.d(t,"ProductsManagerList",(function(){return s}));var l=a(5);function c(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class s extends React.Component{constructor(e){super(e),this.state={error:null,isLoaded:!1,items:[],itemsProduct:[],edit:!1,value_id:-1,value_file:null,isOpen:!1,categ_id:0,value_select:o},this.toggleModalYes=this.toggleModalYes.bind(this),this.toggleModalNo=this.toggleModalNo.bind(this)}componentDidMount(){fetch("/includes/get_data.php?x=get_categ_db").then(e=>e.json()).then(e=>{this.setState({items:e}),this.loadDate(this.state.items[0].id)},e=>{this.setState({error:e})})}loadDate(e){fetch("/includes/get_data.php?x=get_all_products_db&categ_id="+e).then(e=>e.json()).then(t=>{this.setState({isLoaded:!0,itemsProduct:t,edit:!1,categ_id:e})},e=>{this.setState({isLoaded:!0,edit:!1,error:e})})}edit(e){let t=new o;-1!=e&&(t=this.state.itemsProduct[e]),null===t.description&&(t.description=""),this.setState({value_select:t,edit:!0})}save(){const e=this.state.value_file,t=new FormData;t.append("x","editproduct"),t.append("id_categ",this.state.categ_id),t.append("id",this.state.value_select.id),t.append("name",this.state.value_select.name),t.append("oem",this.state.value_select.oem),t.append("count",this.state.value_select.count),t.append("coast",this.state.value_select.coast),t.append("description",this.state.value_select.description),null!=e&&t.append("img",e[0]),fetch("/includes/set_data.php",{method:"POST",body:t}).then(e=>e.text()).then(e=>{-1!=e&&console.log(e),this.loadDate(this.state.categ_id)}).catch(e=>{console.error(e)})}del(e){console.log(e);const t=new FormData;t.append("x","delproduct"),t.append("id",e),fetch("/includes/set_data.php",{method:"POST",body:t}).then(e=>e.text()).then(e=>{-1!=e&&console.log(e),this.loadDate(this.state.categ_id)}).catch(e=>{console.error(e)})}close(){this.setState({edit:!1})}changeCateg(e){this.loadDate(e.target.value)}changeName(e){let t=new o;t=this.state.value_select,t.name=e.target.value,this.setState({value_select:t})}changeOem(e){let t=new o;t=this.state.value_select,t.oem=e.target.value,this.setState({value_select:t})}changeCount(e){let t=new o;t=this.state.value_select,t.count=e.target.value,this.setState({value_select:t})}changeCoast(e){let t=new o;t=this.state.value_select,t.coast=e.target.value,this.setState({value_select:t})}changeDescription(e){let t=new o;t=this.state.value_select,t.description=e.target.value,this.setState({value_select:t})}changeImg(e){this.setState({value_file:e.target.files})}toggleModalDel(e){this.setState({isOpen:!this.state.isOpen,value_id:e})}toggleModalNo(){this.setState({isOpen:!this.state.isOpen})}toggleModalYes(){this.del(this.state.value_id),this.setState({isOpen:!this.state.isOpen})}render(){const{error:e,isLoaded:t,items:a,itemsProduct:c}=this.state;return e?React.createElement("div",null,"Ошибка: ",e.message):t?React.createElement("div",null,React.createElement("div",{className:"row section-heading"},React.createElement("label",null,"Категории: "),React.createElement("select",{className:"select-categ",id:"lang",value:this.state.categ_id,onChange:e=>this.changeCateg(e)},a.map(e=>React.createElement("option",{value:e.id,key:e.id},e.name)))),React.createElement("div",{className:"row"},React.createElement("button",{onClick:()=>this.edit(-1),className:"btn edit-btn"},React.createElement("i",{className:"icon-plus"}),"добавить")),React.createElement("table",{className:"table"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{scope:"col",className:"border-top-0 border-right border-bottom-0"},"Название"),React.createElement("th",{width:"200px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"OEM"),React.createElement("th",{width:"70px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"Остаток"),React.createElement("th",{width:"70px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"Цена"),React.createElement("th",{width:"100px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"Изображение"),React.createElement("th",{width:"200px",scope:"col",className:"border-top-0 border-right border-bottom-0 border-right-0"}))),React.createElement("tbody",null,c.map((e,t)=>React.createElement("tr",{key:t},React.createElement("td",{scope:"row",className:"border-right border-bottom-0"},e.name),React.createElement("td",{className:"border-right border-bottom-0"},e.oem),React.createElement("td",{className:"border-right border-bottom-0"},e.count),React.createElement("td",{className:"border-right border-bottom-0"},e.coast),React.createElement("td",{className:"border-right border-bottom-0"},React.createElement("img",{width:"100px",src:null!=e.img?"/img/product-img/"+e.img:"/img/product-img/noPhoto.png",alt:""})),React.createElement("td",{className:"border-right border-bottom-0 border-right-0"},React.createElement("button",{onClick:()=>this.edit(t),className:"btn edit-btn-icon"},React.createElement("i",{className:"icon-pencil"})),React.createElement("button",{onClick:()=>this.toggleModalDel(e.id),className:"btn edit-btn-icon-red"},React.createElement("i",{className:"icon-trash-empty"}))))))),React.createElement(l.ModalYesNo,{show:this.state.isOpen,onYes:this.toggleModalYes,onNo:this.toggleModalNo},"Вы желаете удалить товар?"),React.createElement("div",{className:(this.state.edit?"popup_max":"hidden")+" "},React.createElement("div",{className:"modal2"},React.createElement("div",{className:"close_btn",title:"Закрыть"},React.createElement("i",{className:"icon-cancel",onClick:()=>this.close()})),React.createElement("div",{className:"form-horizontal form-group"},React.createElement("div",{className:"formCaption"},"Добавить (изменить) товар")),React.createElement("div",{className:"form-group"}),React.createElement("div",{className:"form-group"},React.createElement("label",null,"Наименование"),React.createElement("input",{type:"text",className:"textFieldName",value:this.state.value_select.name,onChange:e=>this.changeName(e),placeholder:"Наименование"})),React.createElement("div",{className:"form-group"},React.createElement("label",null,"OEM"),React.createElement("input",{type:"text",className:"textField",value:this.state.value_select.oem,onChange:e=>this.changeOem(e),placeholder:"oem"})),React.createElement("div",{className:"form-group"},React.createElement("label",null,"Остаток"),React.createElement("input",{type:"text",className:"textField",value:this.state.value_select.count,onChange:e=>this.changeCount(e),placeholder:"остаток"})),React.createElement("div",{className:"form-group"},React.createElement("label",null,"Цена"),React.createElement("input",{type:"text",className:"textField",value:null===this.state.value_select.coast?0:this.state.value_select.coast,onChange:e=>this.changeCoast(e),placeholder:"цена"})),React.createElement("label",null,"Описание"),React.createElement("textarea",{rows:"10",cols:"90",className:"textField",onChange:e=>this.changeDescription(e),defaultValue:this.state.value_select.description}),React.createElement("div",{className:"form-group"},React.createElement("label",null,"Изображение"),React.createElement("input",{type:"file",className:"textField",onChange:e=>this.changeImg(e),placeholder:"Изображение"})),React.createElement("div",{className:"form-group"},React.createElement("input",{type:"hidden",name:"action",value:"addCategory"}),React.createElement("button",{onClick:()=>this.save(),className:"btn edit-btn"},"сохранить"))))):React.createElement("div",null,"Загрузка...")}}class o{constructor(){this.id=-1,this.name="",this.oem="",this.description="",this.count=0,this.coast=0}}c(o,"id",void 0),c(o,"name",void 0),c(o,"oem",void 0),c(o,"count",void 0),c(o,"coast",void 0),c(o,"img",void 0),c(o,"description",void 0),ReactDOM.render(React.createElement(s,null),document.getElementById("editableField"))},5:function(e,t,a){"use strict";a.r(t),a.d(t,"ModalYesNo",(function(){return l}));class l extends React.Component{render(){return this.props.show?React.createElement("div",{className:"popup"},React.createElement("div",{className:"modal2"},this.props.children,React.createElement("div",{className:"footerModal2"},React.createElement("button",{onClick:this.props.onYes,className:"btn edit-btn-yes"},React.createElement("i",{className:"icon-ok"}),"Да"),React.createElement("button",{onClick:this.props.onNo,className:"btn edit-btn"},React.createElement("i",{className:"icon-cancel"}),"Нет")))):null}}}});