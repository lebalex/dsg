!function(e){var t={};function a(r){if(t[r])return t[r].exports;var c=t[r]={i:r,l:!1,exports:{}};return e[r].call(c.exports,c,c.exports,a),c.l=!0,c.exports}a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)a.d(r,c,function(t){return e[t]}.bind(null,c));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t,a){"use strict";a.r(t),a.d(t,"OrdersManagerList",(function(){return r}));class r extends React.Component{constructor(e){super(e),this.state={error:null,isLoaded:!1,items:[],itemOrder:[],order_id:-1,order_id_search:"",itemExec:0,o_name:"",o_phone:"",o_email:"",o_description:"",description_manager:"",date_manager:"",visibleSendBtn:!0}}componentDidMount(){fetch("/includes/get_data.php?x=get_orders").then(e=>e.json()).then(e=>{this.setState({isLoaded:!0,items:e})},e=>{this.setState({isLoaded:!0,error:e})})}loadDataS(){var e=this.state.items.find(e=>e.id===parseInt(this.state.order_id_search));null!=e&&this.openOrder(e.id,e.exec,e.name,e.phone,e.email,e.description,e.descript_manager,e.date_manager)}loadData(e){fetch("/includes/get_data.php?x=get_orders&order_id="+e).then(e=>e.json()).then(t=>{this.setState({isLoaded:!0,itemOrder:t,order_id:e})},e=>{this.setState({isLoaded:!0,error:e})})}openOrder(e,t,a,r,c,o,n,l){this.setState({isLoaded:!1,o_name:a,o_phone:r,o_email:c,o_description:o,description_manager:n,date_manager:l,itemExec:t}),this.loadData(e)}setExec(){this.setState({visibleSendBtn:!this.state.visibleSendBtn});const e=new FormData;e.append("x","set_exec_order"),e.append("id_order",this.state.order_id),e.append("description_manager",this.state.description_manager),e.append("itemExec",this.state.itemExec),fetch("/includes/set_data.php",{method:"POST",body:e}).then(e=>e.text()).then(e=>{console.log(e),this.setState({visibleSendBtn:!this.state.visibleSendBtn})}).catch(e=>{console.error(e)})}execute(e){return 0==e?"":1==e?React.createElement("i",{className:"icon-ok"}):React.createElement("i",{className:"icon-cancel"})}AllSum(){let e=0;return this.state.itemOrder.forEach((function(t,a,r){e+=t.sum})),new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB"}).format(e)}changeSearch(e){this.setState({order_id_search:e.target.value})}changeDescriptionManager(e){this.setState({description_manager:e.target.value})}onExec(e){this.setState({itemExec:1})}onCancel(e){this.setState({itemExec:2})}date_parse(e){var t=new Date(e),a=t.toLocaleTimeString();return t.toLocaleString("ru",{year:"numeric",month:"long",day:"numeric"})+" "+a}render(){const{error:e,isLoaded:t,items:a,itemOrder:r,order_id:c}=this.state;return e?React.createElement("div",null,"Ошибка: ",e.message):t?-1==c?React.createElement("div",{className:"row section-heading"},React.createElement("input",{type:"search",name:"search",id:"headerSearch",placeholder:"поиск по номеру",onChange:e=>this.changeSearch(e)}),React.createElement("button",{className:"btn edit-btn-icon",onClick:()=>this.loadDataS()},React.createElement("i",{className:"fa fa-search","aria-hidden":"true"})),React.createElement("table",{className:"table table-hover"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{width:"100px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"№"),React.createElement("th",{width:"200px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"Дата и время"),React.createElement("th",{scope:"col",className:"border-top-0 border-right border-bottom-0"},"ФИО"),React.createElement("th",{width:"200px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"Стоимость"),React.createElement("th",{width:"50px",scope:"col",className:"border-top-0 border-right border-bottom-0 border-right-0"},"Выполнен"))),React.createElement("tbody",null,a.map((e,t)=>React.createElement("tr",{key:t,className:0==e.exec?"table-light":"table-primary",onClick:()=>this.openOrder(e.id,e.exec,e.name,e.phone,e.email,e.description,e.descript_manager,e.date_manager)},React.createElement("td",{scope:"row",className:"border-right border-bottom-0"},e.id),React.createElement("td",{className:"border-right border-bottom-0"},e.date_order),React.createElement("td",{className:"border-right border-bottom-0"},e.name),React.createElement("td",{className:"border-right border-bottom-0"},new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB"}).format(e.coast)),React.createElement("td",{className:"border-right border-bottom-0 border-right-0"},this.execute(e.exec))))))):React.createElement("div",null,React.createElement("div",{className:"row section-heading"},React.createElement("a",{href:"orders"},"назад")),React.createElement("div",{className:"row section-heading"},React.createElement("div",{className:"col-12 mb-3"},React.createElement("label",{htmlFor:"first_name"},React.createElement("h4",null,"Заказ №",this.state.order_id))),React.createElement("div",{className:"col-12 mb-1"},React.createElement("label",{htmlFor:"first_name"},this.state.o_name)),React.createElement("div",{className:"col-12 mb-1"},React.createElement("label",{htmlFor:"first_name"},this.state.o_phone)),React.createElement("div",{className:"col-12 mb-1"},React.createElement("label",{htmlFor:"first_name"},this.state.o_email)),React.createElement("div",{className:"col-12 mb-1",style:{display:""!=this.state.o_description?"block":"none"}},React.createElement("label",{htmlFor:"first_name"},this.state.o_description)),React.createElement("table",{className:"table"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{scope:"col",className:"border-top-0 border-right border-bottom-0"},"Наименование"),React.createElement("th",{width:"200px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"OEM"),React.createElement("th",{width:"100px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"Кол-во"),React.createElement("th",{width:"100px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"Цена"),React.createElement("th",{width:"200px",scope:"col",className:"border-top-0 border-right border-bottom-0 border-right-0"},"Стоимость"))),React.createElement("tbody",null,r.map((e,t)=>React.createElement("tr",{key:t},React.createElement("td",{scope:"row",className:"border-right border-bottom-0"},e.name),React.createElement("td",{className:"border-right border-bottom-0"},e.oem),React.createElement("td",{className:"border-right border-bottom-0"},e.count),React.createElement("td",{className:"border-right border-bottom-0"},new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB"}).format(e.price)),React.createElement("td",{className:"border-right border-bottom-0 border-right-0"},new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB"}).format(e.sum)))))),React.createElement("div",{className:"col-12 mb-1"},React.createElement("label",{htmlFor:"first_name"}," Полная стоимость заказа ",this.AllSum())),React.createElement("div",{className:"col-12 mb-2"},React.createElement("ul",{className:"checkboxes"},React.createElement("li",{className:"checkbox-group"},React.createElement("input",{type:"radio",value:"exec",onChange:e=>this.onExec(e),checked:1===this.state.itemExec,id:"checkbox-1",className:"checkbox"})," ",React.createElement("label",{htmlFor:"checkbox-1",className:"label"},"Выполнен")),React.createElement("li",{className:"checkbox-group"},React.createElement("input",{type:"radio",value:"cancel",onChange:e=>this.onCancel(e),checked:2===this.state.itemExec,id:"checkbox-2",className:"checkbox"}),React.createElement("label",{htmlFor:"checkbox-2",className:"label"},"Отменен")))),React.createElement("div",{className:"col-12 mb-1"},React.createElement("label",null,"Комментарий менеджера "),React.createElement("textarea",{rows:"3",cols:"90",className:"textField",onChange:e=>this.changeDescriptionManager(e)},this.state.description_manager)),React.createElement("div",{className:"col-12 mb-1"},React.createElement("button",{id:"sendOrder",onClick:()=>this.setExec(),className:"btn essence-btn",style:{display:this.state.visibleSendBtn?"block":"none"}},"Сохранить"),React.createElement("div",{id:"submit_img",style:{display:this.state.visibleSendBtn?"none":"block"}},React.createElement("img",{src:"/img/core-img/loading.gif",width:"70",height:"70"}))),React.createElement("div",{className:"col-12 mb-1",style:{display:null===this.state.date_manager?"none":"block"}},React.createElement("p",null,"Время обновления заказа ",this.date_parse(this.state.date_manager))))):React.createElement("div",null,"Загрузка...")}}ReactDOM.render(React.createElement(r,null),document.getElementById("editableField"))}]);