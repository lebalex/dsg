!function(e){var t={};function r(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(a,o,function(t){return e[t]}.bind(null,o));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=45)}({45:function(e,t,r){"use strict";r.r(t),r.d(t,"UsersManagerList",(function(){return a}));class a extends React.Component{constructor(e){super(e),this.state={error:null,isLoaded:!1,items:[],search_user:""}}componentDidMount(){this.loadData()}loadData(){fetch("/includes/get_data.php?x=get_users&name="+this.state.search_user).then(e=>e.json()).then(e=>{this.setState({isLoaded:!0,items:e})},e=>{this.setState({isLoaded:!0,error:e})})}registr(e){return 0==e?"":React.createElement("i",{className:"icon-ok"})}changeSearch(e){this.setState({search_user:e.target.value})}render(){const{error:e,isLoaded:t,items:r}=this.state;return e?React.createElement("div",null,"Ошибка: ",e.message):t?React.createElement("div",{className:"row section-heading"},React.createElement("input",{type:"search",name:"search",id:"headerSearch",placeholder:"поиск",onChange:e=>this.changeSearch(e)}),React.createElement("button",{className:"btn edit-btn-icon",onClick:()=>this.loadData()},React.createElement("i",{className:"fa fa-search","aria-hidden":"true"})),React.createElement("table",{className:"table table-hover"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{scope:"col",className:"border-top-0 border-right border-bottom-0"},"ФИО"),React.createElement("th",{width:"200px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"Телефон"),React.createElement("th",{width:"200px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"Email"),React.createElement("th",{width:"100px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"Рег на сайте"),React.createElement("th",{width:"200px",scope:"col",className:"border-top-0 border-right border-bottom-0 border-right-0"},"Дата"))),React.createElement("tbody",null,r.map((e,t)=>React.createElement("tr",{key:t},React.createElement("td",{scope:"row",className:"border-right border-bottom-0"},e.name),React.createElement("td",{className:"border-right border-bottom-0"},e.phone),React.createElement("td",{className:"border-right border-bottom-0"},React.createElement("a",{href:"mailto:"+e.email},e.email)),React.createElement("td",{className:"border-right border-bottom-0"},this.registr(e.registr)),React.createElement("td",{className:"border-right border-bottom-0 border-right-0"},e.dt)))))):React.createElement("div",null,"Загрузка...")}}ReactDOM.render(React.createElement(a,null),document.getElementById("editableField"))}});