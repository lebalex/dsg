!function(e){var t={};function a(c){if(t[c])return t[c].exports;var r=t[c]={i:c,l:!1,exports:{}};return e[c].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,t,c){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:c})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(a.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(c,r,function(t){return e[t]}.bind(null,r));return c},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=10)}({10:function(e,t,a){"use strict";a.r(t),a.d(t,"ProductDetail",(function(){return c}));class c extends React.Component{constructor(e){super(e),this.state={isFavouritet:"active"===this.props.items.active}}AddChart(e){fetch("/includes/set_data.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"x=addchart&product="+e}).then((function(e){return e.json()})).then((function(e){$("#count_in_chart").text(e)}))}addFavouritet(e){fetch("/includes/set_data.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"x=addFavouritet&product="+e}).then(e=>e.json()).then(e=>{$("#count_in_favouritet").text(e.count),this.setState({isFavouritet:-1!==e.add})},e=>{})}getImage(e){return null===e?"/img/product-img/noPhoto.png":"/img/product-img/"+e}render(){let e=this.props.items;return $("#title_page").text(this.props.categ_name+"/"+e.name),React.createElement("div",{className:"col-12 col-md-4 col-lg-12"},React.createElement("div",{className:"shop_grid_product_area"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-12"},React.createElement("div",{className:"product-topbar d-flex align-items-center justify-content-between"},React.createElement("div",{className:"total-products"},React.createElement("p",null,e.name)),React.createElement("div",{className:"product-sorting d-flex"},React.createElement("a",{href:"/catalog",className:"nav-link-span scroll"},React.createElement("span",null,"Каталог")),React.createElement("span",{class:"nav-link-span"},"/"),React.createElement("a",{href:"/catalog/"+this.props.id_categ,className:"nav-link-span scroll"},React.createElement("span",null,this.props.categ_name)))))),React.createElement("div",{className:"row",id:"products_list"},React.createElement("div",{className:"col-12 col-sm-6 col-lg-4"},React.createElement("div",{className:"single-product-wrapper"},React.createElement("div",{className:"product-img"},React.createElement("img",{src:this.getImage(e.img),alt:""}),React.createElement("div",{className:"product-favourite"},React.createElement("a",{onClick:()=>this.addFavouritet(e.id),className:`favme ${this.state.isFavouritet?"active":""} fa fa-heart`}))),React.createElement("div",{className:"product-description"},React.createElement("div",{className:"hover-content"},React.createElement("div",{className:"add-to-cart-btn"},React.createElement("button",{onClick:()=>this.AddChart(e.id),className:"btn essence-btn"},"В корзину")))))),React.createElement("div",{className:"col-12 col-sm-6 col-lg-4"},React.createElement("div",{className:"single-product-wrapper"},React.createElement("div",{className:"product-description"},React.createElement("h6",null,e.name),e.description,React.createElement("p",{className:"color"},"OEM: ",e.oem),React.createElement("p",{className:"color"},"Остаток: ",e.count),React.createElement("p",{className:"price"},new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB"}).format(e.coast))))))))}}}});
//# sourceMappingURL=ProductDetail.js.map