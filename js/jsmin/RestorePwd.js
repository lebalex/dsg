!function(e){var t={};function a(n){if(t[n])return t[n].exports;var l=t[n]={i:n,l:!1,exports:{}};return e[n].call(l.exports,l,l.exports,a),l.l=!0,l.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)a.d(n,l,function(t){return e[t]}.bind(null,l));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=44)}({44:function(e,t,a){"use strict";a.r(t),a.d(t,"RestorePwd",(function(){return n}));class n extends React.Component{constructor(e){super(e),this.state={value_email:"",visibleSendBtn:!0,emptyInputVisible:!1,errorSendPwd:"",savePwdOk:!1}}changeEmail(e){this.setState({value_email:e.target.value})}sendNewPwdClick(){if(""!=this.state.value_email){this.setState({visibleSendBtn:!this.state.visibleSendBtn});const e=new FormData;e.append("x","restore_pwd"),e.append("email",this.state.value_email),fetch("/includes/set_data.php",{method:"POST",body:e}).then(e=>e.json()).then(e=>{1===e.code?this.setState({savePwdOk:!0,visibleSendBtn:!this.state.visibleSendBtn,value_email:""}):this.setState({errorSendPwd:e.error,visibleSendBtn:!this.state.visibleSendBtn,value_email:""})}).catch(e=>{console.error(e)})}else this.setState({emptyInputVisible:!0})}render(){return React.createElement("div",{className:"col-12 col-sm-6 col-md-6"},React.createElement("h6",null,"Восстановить пароль"),React.createElement("div",{className:"messages"},React.createElement("div",{style:{display:this.state.savePwdOk?"block":"none"},className:"thanks_form"},React.createElement("h4",null,"Новый пароль отправлен вам по указанному адресу"))),React.createElement("div",{className:"messages"},React.createElement("div",{style:{display:this.state.emptyInputVisible?"block":"none"},className:"error_form"},React.createElement("h4",null,"Заполните форму!"))),React.createElement("div",{className:"messages"},React.createElement("div",{style:{display:""===this.state.errorSendPwd?"none":"block"},className:"error_form2"},React.createElement("div",{className:"alert alert-danger",role:"alert"},this.state.errorSendPwd))),React.createElement("div",{className:"col-12 mb-3"},React.createElement("label",{htmlFor:"email_address"},"Email ",React.createElement("span",null,"*")),React.createElement("input",{type:"text",className:"form-control",id:"email_address",name:"email_address",require:"true",value:this.state.value_email,onChange:e=>this.changeEmail(e)})),React.createElement("div",{className:"col-12 mb-3"},React.createElement("button",{id:"saveAccount",onClick:()=>this.sendNewPwdClick(),className:"btn essence-btn",style:{display:this.state.visibleSendBtn?"block":"none"}},"Отправить"),React.createElement("div",{id:"submit_img",style:{display:this.state.visibleSendBtn?"none":"block"}},React.createElement("img",{src:"/img/core-img/loading.gif",width:"70",height:"70"}))))}}ReactDOM.render(React.createElement(n,null),document.getElementById("data_page"))}});
//# sourceMappingURL=RestorePwd.js.map