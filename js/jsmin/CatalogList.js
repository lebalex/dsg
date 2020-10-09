!function(e){var t={};function a(c){if(t[c])return t[c].exports;var r=t[c]={i:c,l:!1,exports:{}};return e[c].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,t,c){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:c})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(a.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(c,r,function(t){return e[t]}.bind(null,r));return c},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=36)}({10:function(e,t,a){"use strict";a.r(t),a.d(t,"ProductDetail",(function(){return c}));class c extends React.Component{constructor(e){super(e),this.state={isFavouritet:"active"===this.props.items.active}}AddChart(e){fetch("/includes/set_data.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"x=addchart&product="+e}).then((function(e){return e.json()})).then((function(e){$("#count_in_chart").text(e)}))}addFavouritet(e){fetch("/includes/set_data.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"x=addFavouritet&product="+e}).then(e=>e.json()).then(e=>{$("#count_in_favouritet").text(e.count),this.setState({isFavouritet:-1!==e.add})},e=>{})}getImage(e){return null===e?"/img/product-img/noPhoto.png":"/img/product-img/"+e}render(){let e=this.props.items;return $("#title_page").text(this.props.categ_name+"/"+e.name),React.createElement("div",{className:"col-12 col-md-4 col-lg-12"},React.createElement("div",{className:"shop_grid_product_area"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-12"},React.createElement("div",{className:"product-topbar d-flex align-items-center justify-content-between"},React.createElement("div",{className:"total-products"},React.createElement("p",null,e.name)),React.createElement("div",{className:"product-sorting d-flex"},React.createElement("a",{href:"/catalog/"+this.props.id_categ,className:"nav-link scroll"},React.createElement("span",null,this.props.categ_name)))))),React.createElement("div",{className:"row",id:"products_list"},React.createElement("div",{className:"col-12 col-sm-6 col-lg-4"},React.createElement("div",{className:"single-product-wrapper"},React.createElement("div",{className:"product-img"},React.createElement("img",{src:this.getImage(e.img),alt:""}),React.createElement("div",{className:"product-favourite"},React.createElement("a",{onClick:()=>this.addFavouritet(e.id),className:`favme ${this.state.isFavouritet?"active":""} fa fa-heart`}))),React.createElement("div",{className:"product-description"},React.createElement("div",{className:"hover-content"},React.createElement("div",{className:"add-to-cart-btn"},React.createElement("button",{onClick:()=>this.AddChart(e.id),className:"btn essence-btn"},"В корзину")))))),React.createElement("div",{className:"col-12 col-sm-6 col-lg-4"},React.createElement("div",{className:"single-product-wrapper"},React.createElement("div",{className:"product-description"},React.createElement("h6",null,e.name),e.description,React.createElement("p",{className:"color"},"OEM: ",e.oem),React.createElement("p",{className:"color"},"Остаток: ",e.count),React.createElement("p",{className:"price"},new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB"}).format(e.coast))))))))}}},36:function(e,t,a){"use strict";a.r(t),a.d(t,"CatalogList",(function(){return n}));var c=a(10),r=a(6);class n extends React.Component{constructor(e){super(e),this.state={error:null,isLoadedP:!1,items:[],itemsProduct:[],categ_id:this.props.categ_id,product_id:this.props.product_id}}componentDidMount(){fetch("/includes/get_data.php?x=get_categ").then(e=>e.json()).then(e=>{this.setState({items:e})},e=>{this.setState({error:e})}),this.ProductLists(this.state.categ_id,this.state.product_id)}ProductLists(e,t){fetch(`/includes/get_data.php?x=get_all_products&categ_id=${e}&product=${t}`).then(e=>e.json()).then(a=>{this.setState({categ_id:e,product_id:t,isLoadedP:!0,itemsProduct:a})},e=>{this.setState({isLoadedP:!0,error:e})})}ChangCateg(e){this.ProductLists(e,-1)}clickProduct(e){this.ProductLists(this.state.categ_id,e)}MenuLeft(e){return React.createElement("div",{className:"col-lg-3 "},React.createElement("div",{className:"sidemenu-container"},React.createElement("div",{className:"wrapperWidthFixedSrollBlock"},React.createElement("div",{className:"selector-fixedSrollBlock menu-navigation",id:"navigation"},React.createElement("div",{className:"selector-fixedSrollBlock-real-heigh"},React.createElement("div",{className:"row"},React.createElement("ul",{className:"nav",id:"menu_categ_left"},e.map(e=>React.createElement("li",{className:"col-12  on-ic",key:e.id},React.createElement("a",{href:"#",onClick:()=>this.ChangCateg(e.id),className:"nav-link scroll"},React.createElement("span",{className:"text"},e.name)))))))))))}getCategName(e){let t="Все товары";return this.state.items.forEach((function(a,c,r){a.id===parseInt(e)&&(t=a.name)})),t}render(){const{error:e,isLoadedP:t,items:a,itemsProduct:n}=this.state;return e?React.createElement("div",null,"Ошибка: ",e.message):t?-1!=this.state.product_id?React.createElement("div",{className:"row"},React.createElement(c.ProductDetail,{items:n[0],id_categ:n[0].id_categ,categ_name:this.getCategName(n[0].id_categ)})):React.createElement("div",{className:"row"},this.MenuLeft(a),React.createElement("div",{className:"col-12 col-md-8 col-lg-9"},React.createElement("div",{className:"shop_grid_product_area"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-12"},React.createElement("div",{className:"product-topbar d-flex align-items-center justify-content-between"},React.createElement("div",{className:"total-products"},React.createElement("p",null,React.createElement("span",null,n.length)," товаров")),React.createElement("div",{className:"product-sorting d-flex"},React.createElement("p",null,this.getCategName(this.state.categ_id)))))),React.createElement("div",{className:"row",id:"products_list"},n.map(e=>React.createElement(r.ProductOne,{key:e.id,items:e,onClickProduct:()=>this.clickProduct(e.id)})))))):React.createElement("div",{className:"row"},"Загрузка...")}}ReactDOM.render(React.createElement(n,{categ_id:categ_id,product_id:product_id}),document.getElementById("data_page"))},6:function(e,t,a){"use strict";a.r(t),a.d(t,"ProductOne",(function(){return c}));class c extends React.Component{constructor(e){super(e),this.state={isFavouritet:"active"===this.props.items.active}}AddChart(e){fetch("/includes/set_data.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"x=addchart&product="+e}).then((function(e){return e.json()})).then((function(e){$("#count_in_chart").text(e)}))}addFavouritet(e){fetch("/includes/set_data.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"x=addFavouritet&product="+e}).then(e=>e.json()).then(e=>{$("#count_in_favouritet").text(e.count),this.setState({isFavouritet:-1!==e.add})},e=>{})}getImage(e){return null===e?"/img/product-img/noPhoto.png":"/img/product-img/"+e}render(){let e=this.props.items;return React.createElement("div",{className:"col-12 col-sm-6 col-lg-4",key:e.id},React.createElement("div",{className:"single-product-wrapper"},React.createElement("div",{className:"product-img"},React.createElement("a",{href:this.props.url,onClick:this.props.onClickProduct},React.createElement("img",{src:this.getImage(e.img),alt:""})),React.createElement("div",{className:"product-favourite"},React.createElement("a",{onClick:()=>this.addFavouritet(e.id),className:`favme ${this.state.isFavouritet?"active":""} fa fa-heart`}))),React.createElement("div",{className:"product-description"},React.createElement("a",{href:this.props.url,onClick:this.props.onClickProduct},React.createElement("h6",null,e.name)),React.createElement("p",{className:"color"},"OEM: ",e.oem),React.createElement("p",{className:"price"},new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB"}).format(e.coast)),React.createElement("div",{className:"hover-content"},React.createElement("div",{className:"add-to-cart-btn"},React.createElement("button",{onClick:()=>this.AddChart(e.id),className:"btn essence-btn"},"В корзину"))))))}}}});