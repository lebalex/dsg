!function(e){var t={};function a(r){if(t[r])return t[r].exports;var c=t[r]={i:r,l:!1,exports:{}};return e[r].call(c.exports,c,c.exports,a),c.l=!0,c.exports}a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)a.d(r,c,function(t){return e[t]}.bind(null,c));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=60)}({60:function(e,t,a){"use strict";a.r(t),a.d(t,"FavorList",(function(){return c}));var r=a(7);class c extends React.Component{constructor(e){super(e),this.state={error:null,isLoadedP:!1,itemsProduct:[],items:[]}}componentDidMount(){fetch("/includes/get_data.php?x=get_categ").then(e=>e.json()).then(e=>{this.setState({items:e})},e=>{this.setState({error:e})}),this.ProductLists()}ProductLists(){fetch("/includes/get_data.php?x=get_favor_products").then(e=>e.json()).then(e=>{-1===e?this.setState({isLoadedP:!0}):this.setState({isLoadedP:!0,itemsProduct:e})},e=>{this.setState({isLoadedP:!0,error:e})})}EmptyFavor(){if(0===this.state.itemsProduct.length)return React.createElement("div",null,React.createElement("p",null,"У Вас пока пусто"))}getCategName(e){let t="Все товары";return this.state.items.forEach((function(a,r,c){a.id===e&&(t=a.name)})),t}render(){const{error:e,isLoadedP:t,itemsProduct:a}=this.state;return e?React.createElement("div",null,"Ошибка: ",e.message):t?React.createElement("div",{className:"row"},React.createElement("div",{className:"col-12 col-md-4 col-lg-12"},React.createElement("div",{className:"shop_grid_product_area"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-12"},React.createElement("div",{className:"product-topbar d-flex align-items-center justify-content-between"},React.createElement("div",{className:"total-products"},React.createElement("p",null,React.createElement("span",null,a.length)," товаров")),React.createElement("div",{className:"product-sorting d-flex"},React.createElement("p",null,"Избранное"))))),React.createElement("div",{className:"row",id:"products_list"},a.map(e=>React.createElement(r.ProductOne,{key:e.id,items:e,url:`/catalog/${e.id_categ}/${e.id}`})),this.EmptyFavor())))):React.createElement("div",{className:"row"},"Загрузка...")}}ReactDOM.render(React.createElement(c,null),document.getElementById("data_page"))},7:function(e,t,a){"use strict";a.r(t),a.d(t,"ProductOne",(function(){return r}));class r extends React.Component{constructor(e){super(e),this.state={isFavouritet:"active"===this.props.items.active}}AddChart(e){fetch("/includes/set_data.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"x=addchart&product="+e}).then((function(e){return e.json()})).then((function(e){$("#count_in_chart").text(e)}))}addFavouritet(e){fetch("/includes/set_data.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"x=addFavouritet&product="+e}).then(e=>e.json()).then(e=>{$("#count_in_favouritet").text(e.count),this.setState({isFavouritet:-1!==e.add})},e=>{})}getImage(e){return null===e?"/img/product-img/noPhoto.png":"/img/product-img/"+e.split(";")[0]}render(){let e=this.props.items;return React.createElement("div",{className:"col-12 col-sm-6 col-lg-4",key:e.id},React.createElement("div",{className:"single-product-wrapper"},React.createElement("div",{className:"product-img"},React.createElement("a",{href:this.props.url,onClick:this.props.onClickProduct},React.createElement("img",{src:this.getImage(e.img),alt:""})),React.createElement("div",{className:"product-favourite"},React.createElement("a",{onClick:()=>this.addFavouritet(e.id),className:`favme ${this.state.isFavouritet?"active":""} fa fa-heart`}))),React.createElement("div",{className:"product-description"},React.createElement("a",{href:this.props.url,onClick:this.props.onClickProduct},React.createElement("h6",null,e.name)),React.createElement("p",{className:"color"},"OEM: ",e.oem),React.createElement("p",{className:"price"},new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB"}).format(e.coast)),React.createElement("div",{className:"hover-content"},React.createElement("div",{className:"add-to-cart-btn"},React.createElement("button",{onClick:()=>this.AddChart(e.id),className:"btn essence-btn"},"В корзину"))))))}}}});