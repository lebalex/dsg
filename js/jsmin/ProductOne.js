!function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}({6:function(e,t,r){"use strict";r.r(t),r.d(t,"ProductOne",(function(){return n}));class n extends React.Component{constructor(e){super(e),this.state={isFavouritet:"active"===this.props.items.active}}AddChart(e){fetch("/includes/set_data.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"x=addchart&product="+e}).then((function(e){return e.json()})).then((function(e){$("#count_in_chart").text(e)}))}addFavouritet(e){fetch("/includes/set_data.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"x=addFavouritet&product="+e}).then(e=>e.json()).then(e=>{$("#count_in_favouritet").text(e.count),this.setState({isFavouritet:-1!==e.add})},e=>{})}getImage(e){return null===e?"/img/product-img/noPhoto.png":"/img/product-img/"+e}render(){let e=this.props.items;return React.createElement("div",{className:"col-12 col-sm-6 col-lg-4",key:e.id},React.createElement("div",{className:"single-product-wrapper"},React.createElement("div",{className:"product-img"},React.createElement("a",{href:this.props.url,onClick:this.props.onClickProduct},React.createElement("img",{src:this.getImage(e.img),alt:""})),React.createElement("div",{className:"product-favourite"},React.createElement("a",{onClick:()=>this.addFavouritet(e.id),className:`favme ${this.state.isFavouritet?"active":""} fa fa-heart`}))),React.createElement("div",{className:"product-description"},React.createElement("a",{href:this.props.url,onClick:this.props.onClickProduct},React.createElement("h6",null,e.name)),React.createElement("p",{className:"color"},"OEM: ",e.oem),React.createElement("p",{className:"price"},new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB"}).format(e.coast)),React.createElement("div",{className:"hover-content"},React.createElement("div",{className:"add-to-cart-btn"},React.createElement("button",{onClick:()=>this.AddChart(e.id),className:"btn essence-btn"},"В корзину"))))))}}}});