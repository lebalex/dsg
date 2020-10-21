!function(e){var t={};function a(n){if(t[n])return t[n].exports;var l=t[n]={i:n,l:!1,exports:{}};return e[n].call(l.exports,l,l.exports,a),l.l=!0,l.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)a.d(n,l,function(t){return e[t]}.bind(null,l));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=95)}({95:function(e,t,a){"use strict";a.r(t),a.d(t,"Registration",(function(){return n}));class n extends React.Component{constructor(e){super(e),this.state={emptyInputVisible:!1,registrationSend:!1,registrationSendError:"",emailValid:!0,enableSendBtn:!1,visibleSendBtn:!0,pwdDiff:!1,value_name:"",value_phone:"",value_email:"",value_p1:"",value_p2:""},this.handleSubmit=this.handleSubmit.bind(this)}componentDidMount(){}changeName(e){this.setState({value_name:e.target.value,emptyName:!1})}changePhone(e){this.setState({value_phone:e.target.value,emptyPhone:!1})}changeEmail(e){this.setState({value_email:e.target.value,emailValid:!0})}changeP1(e){this.setState({value_p1:e.target.value,pwdDiff:!1})}changeP2(e){this.setState({value_p2:e.target.value,pwdDiff:!1})}setRegistration(){this.setState({enableSendBtn:!this.state.enableSendBtn})}handleSubmit(e){let t=!1;""!==this.state.value_p1&&""!==this.state.value_p2||(t=!0,this.setState({pwdDiff:!0}));let a=this.state.value_email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);if(a||(t=!0),this.state.value_p1!=this.state.value_p2?(t=!0,this.setState({pwdDiff:!0,registrationSendError:"Не правильно повторили пароль!"})):this.state.value_p1.length<8&&(t=!0,this.setState({registrationSendError:"Пароль не может быть короче 8 символов!"})),this.setState({visibleSendBtn:t,emptyInputVisible:t,emailValid:a}),!t){const t=new FormData;t.append("x","registration"),t.append("name",this.state.value_name),t.append("phone",this.state.value_phone),t.append("email",this.state.value_email),t.append("pwd",this.state.value_p1),t.append("token",e.target.elements.token.value),t.append("action",e.target.elements.action.value),fetch("/includes/set_data.php",{method:"POST",body:t}).then(e=>e.json()).then(e=>{0===e.code?this.setState({registrationSend:!0}):this.setState({registrationSendError:e.error,visibleSendBtn:!this.state.visibleSendBtn,emptyInputVisible:!1})}).catch(e=>{console.error(e),this.setState({registrationSendError:e,visibleSendBtn:!this.state.visibleSendBtn,emptyInputVisible:!1})})}e.preventDefault()}render(){return this.state.registrationSend?React.createElement("div",{className:"row"},React.createElement("div",{className:"col-12 col-sm-12 col-md-12"},React.createElement("div",{className:"col-12 mb-3"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-12"},React.createElement("h5",null,'Спасибо, вам отправлено письмо с подтверждение регистрации на сайте DSG Комплект. Письмо может попасть в папку "СПАМ"!')))))):React.createElement("div",{className:"row"},React.createElement("div",{className:"col-12 col-sm-6 col-md-6"},React.createElement("h6",null,"Регистрация на сайте DSG Комплект"),React.createElement("div",{className:"messages"},React.createElement("div",{style:{display:this.state.emptyInputVisible?"block":"none"},className:"error_form"},React.createElement("h4",null,"Заполните форму!"))),React.createElement("div",{className:"messages"},React.createElement("div",{style:{display:""===this.state.registrationSendError?"none":"block"},className:"error_form2"},React.createElement("div",{className:"alert alert-danger",role:"alert"},this.state.registrationSendError))),React.createElement("form",{className:"needs-validation",onSubmit:this.handleSubmit},React.createElement("div",{className:"col-12 mb-3"},React.createElement("label",{htmlFor:"first_name"},"Имя ",React.createElement("span",null,"*")),React.createElement("input",{type:"text",className:"form-control",id:"first_name",name:"first_name",required:!0,value:this.state.value_name,onChange:e=>this.changeName(e)})),React.createElement("div",{className:"col-12 mb-3"},React.createElement("label",{htmlFor:"phone_number"},"Телефон ",React.createElement("span",null,"*")),React.createElement("input",{type:"tel",className:"form-control",id:"phone_number",name:"phone_number",required:!0,value:this.state.value_phone,onChange:e=>this.changePhone(e)})),React.createElement("div",{className:"col-12 mb-3"},React.createElement("label",{htmlFor:"email_address"},"Email ",React.createElement("span",null,"*")),React.createElement("input",{type:"text",className:this.state.emailValid?"form-control":"form-control is-invalid",id:"email_address",name:"email_address",required:!0,value:this.state.value_email,onChange:e=>this.changeEmail(e)})),React.createElement("div",{className:"col-12 mb-3"},React.createElement("label",{htmlFor:"second_password"},"Пароль ",React.createElement("span",null,"*")),React.createElement("input",{type:"password",style:{width:"200px"},className:this.state.pwdDiff?"form-control is-invalid":"form-control",id:"first_password",name:"first_password",required:!0,onChange:e=>this.changeP1(e)})),React.createElement("div",{className:"col-12 mb-3"},React.createElement("label",{htmlFor:"third_password"},"Повторите пароль ",React.createElement("span",null,"*")),React.createElement("input",{type:"password",style:{width:"200px"},className:this.state.pwdDiff?"form-control is-invalid":"form-control",id:"second_password",name:"second_password",required:!0,onChange:e=>this.changeP2(e)})),React.createElement("div",{className:"col-12 mb-3"},React.createElement("div",{className:"custom-control custom-checkbox d-block mb-2"},React.createElement("input",{type:"checkbox",className:"custom-control-input",id:"customCheck1",onClick:()=>this.setRegistration()}),React.createElement("label",{className:"custom-control-label",htmlFor:"customCheck1"},"Я согласен на обработку персональных данных! ",React.createElement("a",{"data-toggle":"modal","data-target":"#agreementModalLong"},"Правила обработки")))),React.createElement("input",{type:"hidden",name:"action",value:"registration"}),React.createElement("input",{type:"hidden",name:"token",id:"token"}),React.createElement("div",{className:"col-12 mb-3"},React.createElement("button",{id:"sendOrder",disabled:!this.state.enableSendBtn,type:"submit",className:"btn essence-btn",style:{display:this.state.visibleSendBtn?"block":"none"}},"Зарегистрироваться"),React.createElement("div",{id:"submit_img",style:{display:this.state.visibleSendBtn?"none":"block"}},React.createElement("img",{src:"/img/core-img/loading.gif",width:"70",height:"70"}))))))}}ReactDOM.render(React.createElement(n,null),document.getElementById("data_page"))}});
//# sourceMappingURL=Registration.js.map