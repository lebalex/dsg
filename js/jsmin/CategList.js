!function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=55)}({55:function(e,t,r){"use strict";r.r(t),r.d(t,"CategList",(function(){return n}));class n extends React.Component{constructor(e){super(e),this.state={error:null,isLoaded:!1,items:[]}}componentDidMount(){fetch("/includes/get_data.php?x=get_categ").then(e=>e.json()).then(e=>{e.push({name:"Весь каталог",id:"",img:"other.jpg"}),this.setState({isLoaded:!0,items:e})},e=>{this.setState({isLoaded:!0,error:e})})}render(){const{error:e,isLoaded:t,items:r}=this.state;return e?React.createElement("div",null,"Ошибка: ",e.message):t?r.map(e=>React.createElement("div",{className:"col-12 col-sm-6 col-md-4",key:e.id},React.createElement("div",{className:"single-product-wrapper"},React.createElement("div",{className:"product-img"},React.createElement("img",{src:"/img/categ-img/"+e.img,alt:""}),React.createElement("img",{className:"hover-img",src:"/img/core-img/black_gr2.png",alt:""}),React.createElement("div",{className:"catagory-content"},React.createElement("span",null,e.name))),React.createElement("div",{className:"product-description"},React.createElement("div",{className:"hover-content"},React.createElement("div",{className:"add-to-cart-btn"},React.createElement("a",{href:"/catalog/"+e.id,className:"btn essence-btn"},"В каталог"))))))):React.createElement("div",null,"Загрузка...")}}ReactDOM.render(React.createElement(n,null),document.getElementById("catagory_area"))}});