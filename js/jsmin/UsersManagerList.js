!function(e){var t={};function a(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,a),s.l=!0,s.exports}a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)a.d(r,s,function(t){return e[t]}.bind(null,s));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=61)}({61:function(e,t,a){"use strict";a.r(t),a.d(t,"UsersManagerList",(function(){return r}));class r extends React.Component{constructor(e){super(e),this.state={error:null,isLoaded:!1,onlyReg:!0,items:[],search_user:"",u_idx:-1,u_id:-1,u_name:"",u_phone:"",u_email:"",u_discont:0},this.save=this.save.bind(this)}componentDidMount(){this.loadData(this.state.search_user)}loadData(e){this.setState({isLoaded:!1}),fetch("/includes/get_data.php?x=get_users&name="+e).then(e=>e.json()).then(e=>{this.setState({isLoaded:!0,items:e})},e=>{this.setState({isLoaded:!0,error:e})})}searchClear(){this.setState({search_user:""}),this.loadData("")}registr(e){return 0==e?"":React.createElement("i",{className:"icon-ok"})}changeSearch(e){this.setState({search_user:e.target.value})}onEnterPress(e){"Enter"===e.key&&this.loadData(this.state.search_user)}openUser(e){0!=this.state.items[e].registr&&this.setState({u_idx:e,u_id:this.state.items[e].id,u_name:this.state.items[e].name,u_phone:this.state.items[e].phone,u_email:this.state.items[e].email,u_discont:this.state.items[e].discont,edit_card_user:!0})}changeDiscont(e){this.setState({u_discont:e.target.value})}save(e){const t=new FormData;t.append("x","edituser_discont"),t.append("id",this.state.u_id),t.append("discont",this.state.u_discont),fetch("/includes/set_data.php",{method:"POST",body:t}).then(e=>e.text()).then(e=>{0!=e&&console.log(e);var t=this.state.items[this.state.u_idx];t.discont=this.state.u_discont;const a=this.state.items.map(e=>e.id===this.state.u_id?t:e);this.setState({items:a})}).catch(e=>{console.error(e)}),$(".modal").modal("hide"),e.preventDefault()}render(){const{error:e,isLoaded:t,items:a}=this.state;return e?React.createElement("div",null,"Ошибка: ",e.message):t?React.createElement("div",null,React.createElement("div",{className:"col-12"},React.createElement("div",{className:"product-topbar d-flex align-items-center justify-content-between"},React.createElement("div",{className:"mt-3"},React.createElement("div",{className:"custom-control custom-checkbox d-block mb-2"},React.createElement("input",{type:"checkbox",className:"custom-control-input",id:"customOnlyReg",checked:this.state.onlyReg,onChange:e=>this.setState({onlyReg:!this.state.onlyReg})}),React.createElement("label",{className:"custom-control-label",htmlFor:"customOnlyReg"},"Только зарегистрированные клиенты"))),React.createElement("div",{className:"product-sorting d-flex"},React.createElement("input",{type:"search",name:"search",value:this.state.search_user,className:"form-control",id:"headerSearch",style:{width:"300px"},placeholder:"поиск по ФИО и email",onChange:e=>this.changeSearch(e),onKeyPress:e=>this.onEnterPress(e)}),React.createElement("button",{className:"btn bg-transparent",style:{marginLeft:"-40px",zIndex:"100"},onClick:()=>this.searchClear()},React.createElement("i",{className:"fa fa-times"})),React.createElement("button",{className:"btn edit-btn-search-icon",onClick:()=>this.loadData(this.state.search_user)},React.createElement("i",{className:"fa fa-search","aria-hidden":"true"}))))),React.createElement("table",{className:"table table-hover"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{scope:"col",className:"border-top-0 border-right border-bottom-0"},"ФИО"),React.createElement("th",{width:"200px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"Телефон"),React.createElement("th",{width:"200px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"Email"),React.createElement("th",{width:"100px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"Скидка"),React.createElement("th",{width:"100px",scope:"col",className:"border-top-0 border-right border-bottom-0"},"Рег на сайте"),React.createElement("th",{width:"200px",scope:"col",className:"border-top-0 border-right border-bottom-0 border-right-0"},"Дата"))),React.createElement("tbody",null,this.state.onlyReg?a.map((e,t)=>1===e.registr?React.createElement("tr",{key:t,onClick:()=>this.openUser(t),"data-toggle":"modal","data-target":".bd-edit-modal-lg"},React.createElement("td",{scope:"row",className:"border-right border-bottom-0"},e.name),React.createElement("td",{className:"border-right border-bottom-0"},e.phone),React.createElement("td",{className:"border-right border-bottom-0"},React.createElement("a",{href:"mailto:"+e.email},e.email)),React.createElement("td",{className:"border-right border-bottom-0"},0===e.discont?"":e.discont+"%"),React.createElement("td",{className:"border-right border-bottom-0"},this.registr(e.registr)),React.createElement("td",{className:"border-right border-bottom-0 border-right-0"},e.dt)):""):a.map((e,t)=>React.createElement("tr",{key:t,onClick:()=>this.openUser(t)},React.createElement("td",{scope:"row",className:"border-right border-bottom-0"},e.name),React.createElement("td",{className:"border-right border-bottom-0"},e.phone),React.createElement("td",{className:"border-right border-bottom-0"},React.createElement("a",{href:"mailto:"+e.email},e.email)),React.createElement("td",{className:"border-right border-bottom-0"},0===e.discont?"":e.discont+"%"),React.createElement("td",{className:"border-right border-bottom-0"},this.registr(e.registr)),React.createElement("td",{className:"border-right border-bottom-0 border-right-0"},e.dt))))),React.createElement("div",{className:"modal fade bd-edit-modal-lg",tabIndex:"-1",role:"dialog","aria-labelledby":"myLargeModalLabel","aria-hidden":"true"},React.createElement("div",{className:"modal-dialog modal-lg"},React.createElement("div",{className:"modal-content"},React.createElement("div",{className:"modal-header"},React.createElement("h5",{className:"modal-title",id:"exampleModalLongTitle"},"Карточка клиента"),React.createElement("button",{type:"button",className:"close","data-dismiss":"modal","aria-label":"Close"},React.createElement("span",{"aria-hidden":"true"},"×"))),React.createElement("form",{className:"needs-validation",onSubmit:this.save},React.createElement("div",{className:"modal-body"},React.createElement("div",{className:"form-group"},React.createElement("label",{htmlFor:"user_name"},"ФИО"),React.createElement("input",{type:"text",name:"user_name",id:"user_name",className:"form-control",value:this.state.u_name,readOnly:!0,placeholder:"ФИО"})),React.createElement("div",{className:"form-group"},React.createElement("label",{htmlFor:"user_tel"},"Телефон"),React.createElement("input",{type:"tel",name:"user_tel",id:"user_tel",className:"form-control",value:this.state.u_phone,readOnly:!0,placeholder:"Телефон"})),React.createElement("div",{className:"form-group"},React.createElement("label",{htmlFor:"user_email"},"Email"),React.createElement("input",{type:"text",name:"user_email",id:"user_email",className:"form-control",value:this.state.u_email,readOnly:!0,placeholder:"Email"})),React.createElement("div",{className:"form-group"},React.createElement("label",{htmlFor:"discont"},"Скидка в %"),React.createElement("input",{type:"number",name:"discont",id:"discont",className:"form-control",value:null===this.state.u_discont?0:this.state.u_discont,onChange:e=>this.changeDiscont(e),placeholder:"Скидка в %"}))),React.createElement("div",{className:"modal-footer"},React.createElement("button",{type:"button",className:"btn btn-primary",type:"submit"},"Сохранить"),React.createElement("button",{type:"button",className:"btn btn-secondary","data-dismiss":"modal"},"Отмена"))))))):React.createElement("div",null,"Загрузка...")}}ReactDOM.render(React.createElement(r,null),document.getElementById("editableField"))}});