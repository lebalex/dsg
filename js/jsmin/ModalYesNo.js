!function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=5)}({5:function(e,t,a){"use strict";a.r(t),a.d(t,"ModalYesNo",(function(){return n}));class n extends React.Component{render(){return this.props.show?React.createElement("div",{className:"modal fade",id:"modalYesNo",tabIndex:"-1",role:"dialog","aria-labelledby":"modalYesNoTitle","aria-hidden":"true"},React.createElement("div",{className:"modal-dialog modal-dialog-centered",role:"document"},React.createElement("div",{className:"modal-content"},React.createElement("div",{className:"modal-header"},React.createElement("h5",{className:"modal-title",id:"exampleModalLongTitle"},this.props.title),React.createElement("button",{type:"button",className:"close","data-dismiss":"modal","aria-label":"Close"},React.createElement("span",{"aria-hidden":"true"},"×"))),React.createElement("div",{className:"modal-body"},this.props.children),React.createElement("div",{className:"modal-footer"},React.createElement("button",{type:"button",className:"btn btn-danger","data-dismiss":"modal",onClick:this.props.onYes},"Да"),React.createElement("button",{type:"button",className:"btn btn-primary","data-dismiss":"modal"},"Нет"))))):null}}}});
//# sourceMappingURL=ModalYesNo.js.map