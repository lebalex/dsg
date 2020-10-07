!function(e){var t={};function r(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(a,o,function(t){return e[t]}.bind(null,o));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=13)}({13:function(e,t,r){"use strict";r.r(t),r.d(t,"OrdersUserList",(function(){return a}));class a extends React.Component{constructor(e){super(e),this.state={error:null,isLoaded:!1,items:[],itemOrder:[],order_id:-1,order_id_search:"",itemExec:0,o_name:"",o_phone:"",o_email:"",o_description:""}}componentDidMount(){fetch("/includes/get_data.php?x=get_orders&users=1").then(e=>e.json()).then(e=>{this.setState({isLoaded:!0,items:e})},e=>{this.setState({isLoaded:!0,error:e})})}loadDataS(){var e=this.state.items.find(e=>e.id===parseInt(this.state.order_id_search));null!=e&&this.openOrder(e.id,e.exec,e.name,e.phone,e.email,e.description)}loadData(e){fetch("/includes/get_data.php?x=get_orders&order_id="+e).then(e=>e.json()).then(t=>{this.setState({isLoaded:!0,itemOrder:t,order_id:e})},e=>{this.setState({isLoaded:!0,error:e})})}openOrder(e,t,r,a,o,c){this.setState({isLoaded:!1,o_name:r,o_phone:a,o_email:o,o_description:c,itemExec:t}),this.loadData(e)}execute(e){return 0==e?"":React.createElement("i",{className:"icon-ok"})}AllSum(){let e=0;return this.state.itemOrder.forEach((function(t,r,a){e+=t.sum})),new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB"}).format(e)}changeSearch(e){this.setState({order_id_search:e.target.value})}render(){const{error:e,isLoaded:t,items:r,itemOrder:a,order_id:o}=this.state;return e?React.createElement("div",null,"Ошибка: ",e.message):t?-1==o?React.createElement("div",{className:"row section-heading"},React.createElement("input",{type:"search",name:"search",id:"headerSearch",placeholder:"поиск по номеру",onChange:e=>this.changeSearch(e)}),React.createElement("button",{className:"btn edit-btn-icon",onClick:()=>this.loadDataS()},React.createElement("i",{className:"fa fa-search","aria-hidden":"true"})),React.createElement("table",{className:"table table-hover"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{width:"100px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"№"),React.createElement("th",{width:"200px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"Дата и время"),React.createElement("th",{scope:"col",className:"border-top-0 border-right border-bottom-0"},"ФИО"),React.createElement("th",{width:"200px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"Стоимость"),React.createElement("th",{width:"50px",scope:"col",className:"border-top-0 border-right border-bottom-0 border-right-0"},"Выполнен"))),React.createElement("tbody",null,r.map((e,t)=>React.createElement("tr",{key:t,className:0==e.exec?"table-light":"table-primary",onClick:()=>this.openOrder(e.id,e.exec,e.name,e.phone,e.email,e.description)},React.createElement("td",{scope:"row",className:"border-right border-bottom-0"},e.id),React.createElement("td",{className:"border-right border-bottom-0"},e.date_order),React.createElement("td",{className:"border-right border-bottom-0"},e.name),React.createElement("td",{className:"border-right border-bottom-0"},new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB"}).format(e.coast)),React.createElement("td",{className:"border-right border-bottom-0 border-right-0"},this.execute(e.exec))))))):React.createElement("div",null,React.createElement("div",{className:"row section-heading"},React.createElement("a",{href:"orders"},"назад")),React.createElement("div",{className:"row section-heading"},React.createElement("div",{className:"col-12 mb-3"},React.createElement("label",{htmlFor:"first_name"},React.createElement("h4",null,"Заказ №",this.state.order_id))),React.createElement("div",{className:"col-12 mb-3"},React.createElement("label",{htmlFor:"first_name"},this.state.o_name)),React.createElement("div",{className:"col-12 mb-3"},React.createElement("label",{htmlFor:"first_name"},this.state.o_phone)),React.createElement("div",{className:"col-12 mb-3"},React.createElement("label",{htmlFor:"first_name"},this.state.o_email)),React.createElement("div",{className:"col-12 mb-3",style:{display:""!=this.state.o_description?"block":"none"}},React.createElement("label",{htmlFor:"first_name"},this.state.o_description)),React.createElement("table",{className:"table"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{scope:"col",className:"border-top-0 border-right border-bottom-0"},"Наименование"),React.createElement("th",{width:"200px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"OEM"),React.createElement("th",{width:"100px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"Кол-во"),React.createElement("th",{width:"100px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"Цена"),React.createElement("th",{width:"200px",scope:"col",className:"border-top-0 border-right border-bottom-0 border-right-0"},"Стоимость"))),React.createElement("tbody",null,a.map((e,t)=>React.createElement("tr",{key:t},React.createElement("td",{scope:"row",className:"border-right border-bottom-0"},e.name),React.createElement("td",{className:"border-right border-bottom-0"},e.oem),React.createElement("td",{className:"border-right border-bottom-0"},e.count),React.createElement("td",{className:"border-right border-bottom-0"},new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB"}).format(e.price)),React.createElement("td",{className:"border-right border-bottom-0 border-right-0"},new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB"}).format(e.sum))))))),React.createElement("div",{className:"row"},"Полная стоимость заказа ",this.AllSum()),React.createElement("div",{className:"row"},React.createElement("b",{style:{display:this.state.itemExec?"block":"none"}},"Заказ выполнен"))):React.createElement("div",null,"Загрузка...")}}ReactDOM.render(React.createElement(a,null),document.getElementById("editableField"))}});