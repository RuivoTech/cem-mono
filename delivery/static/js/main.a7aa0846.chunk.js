(this.webpackJsonpdelivery=this.webpackJsonpdelivery||[]).push([[0],{48:function(e,t,c){},50:function(e,t,c){},51:function(e,t,c){},55:function(e,t,c){},56:function(e,t,c){},74:function(e,t,c){},75:function(e,t,c){},76:function(e,t,c){},77:function(e,t,c){},78:function(e,t,c){},79:function(e,t,c){},80:function(e,t,c){},81:function(e,t,c){},82:function(e,t,c){},83:function(e,t,c){},84:function(e,t,c){"use strict";c.r(t);var n=c(1),a=c.n(n),s=c(35),r=c.n(s),i=c(14),o=c(3),l="@DeliveryCEM:Information",j="@DeliveryCEM:Cart",u="@DeliveryCEM:Campaign",d="@DeliveryCEM:Order",b=function(e){localStorage.setItem(l,JSON.stringify(e))},m=function(){var e=localStorage.getItem(l);return JSON.parse(e)},O=function(){sessionStorage.setItem(j,JSON.stringify([]))},h=function(e){var t=f()?f():[];t.push(e||void 0),sessionStorage.setItem(j,JSON.stringify(t))},f=function(){var e=sessionStorage.getItem(j);return JSON.parse(e)},x=function(){var e=localStorage.getItem(d);return JSON.parse(e)},v=c(2),p=c(12),N=c(20),C=c(5),g=c(6),I=(c(48),c(0));var y=function(e){var t=e.className,c=e.label,n=e.onClick,a=e.showLoading,s=void 0!==a&&a,r=e.status,i=void 0===r?"none":r,o=Object(N.a)(e,["className","label","onClick","showLoading","status"]);return Object(I.jsxs)("button",Object(p.a)(Object(p.a)({className:"".concat("none"!==i?i:t),onClick:function(e){n(e)}},o),{},{children:[s?Object(I.jsx)("div",{className:"spinner"}):null,Object(I.jsx)("div",{className:"check",children:Object(I.jsx)(C.a,{icon:g.c,color:"#FFFFFF",size:"lg"})}),Object(I.jsx)("p",{className:"text",children:c})]}))};c(50);var S=function(){return Object(I.jsx)("div",{className:"loading-container",children:Object(I.jsx)("div",{className:"loading-spinner"})})};c(51);var E=function(){var e=Object(o.f)(),t=Object(n.useState)(!0),c=Object(v.a)(t,2),a=c[0],s=c[1];return Object(n.useEffect)((function(){var t=m();t&&t.name&&e.push("/loja"),s(!1)}),[]),Object(I.jsx)(I.Fragment,{children:a?Object(I.jsx)(S,{}):Object(I.jsxs)("div",{id:"page-landing",children:[Object(I.jsxs)("div",{className:"card",children:[Object(I.jsx)("p",{className:"textVisit",children:"Ol\xe1, visitante"}),Object(I.jsx)("p",{className:"textInformation",children:"N\xe3o encontrei suas informa\xe7\xf5es, ser\xe1 que voc\xea poderia me dizer?"})]}),Object(I.jsx)(y,{className:"btnInformation",label:"INFORMAR AGORA",onClick:function(){return e.push("/dados")}}),Object(I.jsx)(y,{className:"btnLater",label:"DEIXAR PRA DEPOIS",onClick:function(){return e.push("/loja")}}),Object(I.jsx)("div",{className:"developed",children:Object(I.jsx)("a",{href:"https://github.com/RuivoTech",target:"_blank",rel:"noopener noreferrer",children:"\xa9 RuivoTech"})})]})})},L=c(15),A=c.n(L),F=c(19);c(55);var k=function(e){var t=e.show,c=e.handleClick,a=Object(n.useState)(""),s=Object(v.a)(a,2),r=s[0],l=s[1],j=Object(o.g)();return Object(n.useEffect)((function(){l(j.pathname)}),[j]),Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)("div",{className:"".concat(t?"show":"hide"," sidebar"),children:Object(I.jsxs)("div",{className:"sidebarContent",children:[Object(I.jsxs)("div",{className:"userInfo",children:[Object(I.jsx)("p",{className:"userName",children:"Richieri Negri"}),Object(I.jsx)("p",{className:"userPhone",children:"(44) 99858-8635"})]}),Object(I.jsxs)(i.b,{className:"sidebarLink ".concat("/dados"===r?"active":null),to:"/dados",children:[Object(I.jsx)(C.a,{icon:g.k,color:"var(--color-text-primary)",size:"1x"}),Object(I.jsx)("span",{children:"Perfil"})]}),Object(I.jsxs)(i.b,{className:"sidebarLink ".concat("/pedidos"===r?"active":null),to:"/pedidos",children:[Object(I.jsx)(C.a,{icon:g.l,color:"var(--color-text-primary)",size:"1x"}),Object(I.jsx)("span",{children:"Pedidos"})]})]})}),Object(I.jsx)("div",{className:"sidebarBackground",onClick:function(){return c()}})]})},w={getCampaign:function(){return function(){var e=sessionStorage.getItem(u);return JSON.parse(e)}()},setCampaign:function(e){!function(e){sessionStorage.setItem(u,JSON.stringify(e))}(e)},setCartItem:function(e){h(e)},getCartItems:function(){return f()},removeCartItem:function(e){var t=f();O(),t.map((function(t,c){return c!==e?h(t):null}))},clearCart:function(){O()},getQuantityCartItems:function(){var e=0,t=f();return t&&t.map((function(t){return e+=t.quantity})),e},setOrder:function(e){!function(e){var t=x()?x():[];t.push(e),localStorage.setItem(d,JSON.stringify(t))}(e)},getOrders:function(){return x()}},T=Object(n.createContext)({});var z=function(e){var t=e.children;return Object(I.jsx)(T.Provider,{value:w,children:t})},D=c.p+"static/media/logo_cem_branca.7c34f684.png";c(56);var q=function(e){var t=e.showBack,c=e.showCart,a=e.description,s=e.toHome,r=void 0!==s&&s,i=Object(n.useState)(!1),l=Object(v.a)(i,2),j=l[0],u=l[1],d=Object(n.useState)(0),b=Object(v.a)(d,2),m=b[0],O=b[1],h=Object(o.f)(),f=Object(n.useContext)(T).getQuantityCartItems;Object(n.useEffect)((function(){var e=f();O(e)}),[f]);var x=function(){u(!j)};return Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)(k,{show:j,handleClick:function(){x()}}),Object(I.jsxs)("div",{className:"menuContainer",children:[t?Object(I.jsx)(C.a,{className:"goBack",onClick:function(){return r?h.push("/loja"):h.goBack()},icon:g.a,color:"#00BBAE",size:"2x"}):Object(I.jsx)("div",{className:"user",onClick:function(){return x()},children:Object(I.jsx)(C.a,{className:"menuBars",tabIndex:"0",icon:g.b,color:"var(--color-primary)",size:"2x"})}),a?Object(I.jsx)("p",{className:"menuDescription",children:a}):Object(I.jsx)("img",{src:D,alt:"Centro Evang\xe9lico de Maring\xe1",className:"logo"}),c?Object(I.jsxs)("div",{className:"menuCart",onClick:function(){h.push("/carrinho")},children:[Object(I.jsx)(C.a,{className:"menuCartIcon",icon:g.j,color:"#00BBAE",size:"2x"}),Object(I.jsx)("span",{className:"menuCartCount",children:m})]}):Object(I.jsx)("div",{children:'" '})]})]})},B=c(37),R="https://cem-api.ruivotech.com.br",X=c.n(B).a.create({baseURL:"".concat(R,"/delivery")}),H=c(38),Y=c(39),P=function(){function e(){Object(H.a)(this,e)}return Object(Y.a)(e,[{key:"toLocale",value:function(e){return parseFloat(e/100).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}}]),e}();c(74);var Q=function(e){var t=e.item,c=(new P).toLocale,n=Object(o.f)();return Object(I.jsx)("div",{className:"cardContainer",onClick:function(){var e;e=t.id,n.push({pathname:"/item",params:{item:t},search:"".concat(e)})},children:Object(I.jsxs)("div",{className:"cardContent",children:[Object(I.jsx)("div",{className:"cardImage",children:Object(I.jsx)("img",{src:R+"/"+t.image,alt:t.title,className:"cardLogo"})}),Object(I.jsxs)("div",{className:"cardText",children:[Object(I.jsx)("h3",{className:"cardTitle",children:t.title}),Object(I.jsx)("p",{className:"cardDescription",children:t.description}),Object(I.jsx)("p",{className:"cardMoney",children:c(t.cost)})]})]})})};c(75);var J=function(){var e=Object(n.useState)({name:"",contact:"",address:"",number:"",city:""}),t=Object(v.a)(e,2),c=t[0],a=t[1],s=Object(o.f)();return Object(n.useEffect)((function(){var e=m();e&&a(e)}),[]),Object(I.jsxs)("div",{id:"locationContainer",onClick:function(){s.push("/dados")},children:[Object(I.jsx)("div",{className:"locationIcon",children:Object(I.jsx)(C.a,{icon:g.f,color:"#00BBAE",size:"lg"})}),Object(I.jsxs)("div",{className:"locationInformation",children:[Object(I.jsx)("p",{className:"locationName",children:c.name||c.contact?"".concat(c.name," - ").concat(c.contact):"Dados n\xe3o informados!!"}),Object(I.jsx)("div",{className:"locationAddress",children:c.address?"".concat(c.address,", ").concat(c.number,", ").concat(c.city):""})]}),Object(I.jsx)("div",{className:"editIcon",children:Object(I.jsx)(C.a,{icon:g.h,color:"#00BBAE",size:"lg"})})]})};c(76);var M=function(){var e=Object(n.useState)([]),t=Object(v.a)(e,2),c=t[0],a=t[1],s=Object(n.useState)(!0),r=Object(v.a)(s,2),i=r[0],o=r[1],l=Object(n.useContext)(T).setCampaign;return Object(n.useEffect)((function(){(function(){var e=Object(F.a)(A.a.mark((function e(){var t;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,X.get("/store");case 3:t=e.sent,l(t.data),a(t.data.items),o(!1),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}})()()}),[l]),Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)(q,{showCart:!0}),Object(I.jsx)("div",{className:"orderContainer",children:i?Object(I.jsx)(S,{}):c?c.map((function(e){return Object(I.jsx)(Q,{item:e},e.id)})):Object(I.jsx)("p",{className:"errorMessage",children:"Ops, nenhum produto cadastrado!!"})}),Object(I.jsx)(J,{})]})},Z=c(18);c(77);var K=function(e){var t=e.className,c=e.label,a=e.description,s=e.onChange,r=e.required,i=Object(N.a)(e,["className","label","description","onChange","required"]),o=Object(n.useState)(""),l=Object(v.a)(o,2),j=l[0],u=l[1],d=function(e){u(e.target.value),s(e.target)};return Object(I.jsx)(I.Fragment,{children:Object(I.jsxs)("div",{id:"input",children:[Object(I.jsxs)("div",{className:"inputLabel",children:[c,":",r?Object(I.jsx)("sup",{className:"inputRequired",children:"*"}):null]}),Object(I.jsx)("input",Object(p.a)({className:"inputField".concat(t?" "+t:""),type:"text",placeholder:a,onChange:function(e){return d(e)},value:j,required:r},i))]})})};c(78);var V=function(){var e=Object(n.useState)(),t=Object(v.a)(e,2),c=t[0],a=t[1],s=Object(n.useState)("none"),r=Object(v.a)(s,2),i=r[0],l=r[1],j=Object(n.useState)(!1),u=Object(v.a)(j,2),d=u[0],O=u[1],h=Object(n.useState)({name:"",contact:"",postalCode:"",address:"",number:"",complement:"",city:""}),f=Object(v.a)(h,2),x=f[0],N=f[1],C=Object(o.f)();Object(n.useEffect)((function(){var e=new URLSearchParams(C.location.search);a(e);var t=m();parseInt(e.get("delivery"))&&O(!0),Object.keys(t).length>0&&N(t)}),[]);var g=function(e){N(Object(p.a)(Object(p.a)({},x),{},Object(Z.a)({},e.name,e.value)))},S=function(){var e=!0;return Object.keys(x).forEach((function(t){"complement"===t||x[t]?x.name&&x.contact||(e=!1):d&&(e=!1)})),e};return Object(I.jsx)(I.Fragment,{children:Object(I.jsxs)("div",{id:"informationcontainer",children:[Object(I.jsx)(q,{showBack:!0,showCart:!1}),Object(I.jsxs)("div",{className:"informationContent",children:[Object(I.jsx)(K,{className:"informationInput",onChange:function(e){return g(e)},name:"name",label:"Nome",description:"Informe o seu nome",value:x.name,required:!0}),Object(I.jsx)(K,{className:"informationInput",onChange:function(e){return g(e)},name:"contact",label:"Contato",description:"Informe o seu telefone",value:x.contact,required:!0}),Object(I.jsx)(K,{className:"informationInput",onChange:function(e){return g(e)},name:"postalCode",label:"Cep",description:"Informe o seu cep",value:x.postalCode,required:d}),Object(I.jsx)(K,{className:"informationInput",onChange:function(e){return g(e)},name:"address",label:"Endere\xe7o",description:"Informe o seu endere\xe7o",value:x.address,required:d}),Object(I.jsx)(K,{className:"informationInput",onChange:function(e){return g(e)},name:"number",label:"N\xfamero",description:"Informe o seu n\xfamero",value:x.number,required:d}),Object(I.jsx)(K,{className:"informationInput",onChange:function(e){return g(e)},name:"complement",label:"Complemento",description:"Informe o seu complemento",value:x.complement}),Object(I.jsx)(K,{className:"informationInput",onChange:function(e){return g(e)},name:"city",label:"Cidade",description:"Informe a sua cidade",value:x.city,required:d}),Object(I.jsxs)("span",{className:"informationObservation",children:["Os campos com ",Object(I.jsx)("sup",{children:"*"})," s\xe3o obrigat\xf3rios"]}),Object(I.jsx)("div",{className:"buttonContainer",children:Object(I.jsx)(y,{className:"".concat(S()?"":"btnDisabled"," btnSave"),label:S()?"SALVAR":"Por favor, preencha os campos obrigat\xf3rios!!",onClick:function(){return l("loading"),void(S()&&(b(x),l("success"),c.get("from")?setTimeout((function(){C.push("/carrinho")}),1e3):setTimeout((function(){C.push("/loja")}),1e3)))},status:i,showLoading:!0})})]})]})})};c(79);var G=function(e){var t=e.handleChangeValue,c=e.update,a=void 0!==c&&c,s=e.item,r=Object(n.useState)(1),i=Object(v.a)(r,2),o=i[0],l=i[1];Object(n.useEffect)((function(){s.quantity&&l(s.quantity)}),[s]);var j=function(e){"-"===e?(o>1&&!a||o>0&&a)&&(l(o-1),t(o-1)):"+"===e&&o<10&&(l(o+1),t(o+1))};return Object(I.jsxs)("div",{className:"quantityContainer",children:[Object(I.jsx)(C.a,{icon:g.g,color:1===o&&!a||0===o?"#b2b2b2":"#00BBAE",size:"1x",onClick:function(){return j("-")},className:"quantityClick"}),Object(I.jsx)("span",{className:"quantityNumber",children:o}),Object(I.jsx)(C.a,{icon:g.i,color:o<10?"#00BBAE":"#b2b2b2",size:"1x",onClick:function(){return j("+")},className:"quantityClick"})]})},W=(c(80),new P);var U=function(e){var t=e.location,c=Object(n.useState)({id:"",title:"",description:"",cost:0,quantity:0,observation:""}),a=Object(v.a)(c,2),s=a[0],r=a[1],i=Object(n.useState)(1),l=Object(v.a)(i,2),j=l[0],u=l[1],d=Object(n.useState)(!0),b=Object(v.a)(d,2),m=b[0],O=b[1],h=Object(n.useState)(""),f=Object(v.a)(h,2),x=f[0],p=f[1],N=Object(n.useContext)(T),E=N.setCartItem,L=N.getCampaign,A=Object(o.f)();return Object(n.useEffect)((function(){var e=t.search.slice(1),c=L().items.filter((function(t){return t.id===parseInt(e)}));r(c[0]),O(!1)}),[L,t]),Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)(q,{showBack:!0,showCart:!0}),Object(I.jsx)("div",{className:"itemContainer",children:m?Object(I.jsx)(S,{}):Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)("div",{className:"itemImageCard",children:Object(I.jsx)("img",{src:R+"/"+s.image,alt:s.title,className:"itemLogo",onError:function(e){e.target.onerror=null,e.target.src="data:image/png;base64,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"}})}),Object(I.jsxs)("div",{className:"itemInformation",children:[Object(I.jsx)("h2",{className:"itemTitle",children:s.title}),Object(I.jsx)("p",{className:"itemDescription",children:s.description}),Object(I.jsx)("p",{className:"itemMoney",children:W.toLocale(s.cost)})]}),Object(I.jsxs)("div",{className:"itemObservation",children:[Object(I.jsxs)("label",{htmlFor:"description",className:"labelDescription",children:[Object(I.jsx)(C.a,{icon:g.d,color:"#00BBAE",size:"1x"})," ","Alguma observa\xe7\xe3o?"]}),Object(I.jsx)("textarea",{name:"observation",id:"description",className:"textDescription",cols:"5",rows:"5",placeholder:"Ex: Ponto da carne, tirar a salada, etc.",onChange:function(e){return p(e.target.value)}})]}),Object(I.jsxs)("div",{className:"itemCount",children:[Object(I.jsx)(G,{handleChangeValue:function(e){return function(e){u(e)}(e)},item:s}),Object(I.jsx)(y,{className:"buttonAdd",label:Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)("span",{className:"buttonLabel",children:"Adicionar"}),Object(I.jsx)("span",{className:"buttonValue",children:W.toLocale(s.cost*j)})]}),onClick:function(){return function(){var e={id:s.id,title:s.title,description:s.description,cost:s.cost,quantity:j,observation:x};E(e),A.push("/carrinho")}()},showLoading:!0})]})]})})]})};c(81);var _=function(){var e=new P,t=Object(o.f)(),c=Object(n.useContext)(T),a=c.getCartItems,s=c.removeCartItem,r=c.clearCart,i=c.setOrder,l=c.getCampaign,j=Object(n.useState)([]),u=Object(v.a)(j,2),d=u[0],b=u[1],O=Object(n.useState)([]),h=Object(v.a)(O,2),f=h[0],x=h[1],N=Object(n.useState)(""),C=Object(v.a)(N,2),g=C[0],S=C[1],E=Object(n.useState)(0),L=Object(v.a)(E,2),k=L[0],w=L[1],z=Object(n.useState)("none"),D=Object(v.a)(z,2),B=D[0],R=D[1],H=Object(n.useState)(!1),Y=Object(v.a)(H,2),Q=Y[0],J=Y[1],M=Object(n.useState)(0),Z=Object(v.a)(M,2),K=Z[0],V=Z[1],W=Object(n.useState)(-1),U=Object(v.a)(W,2),_=U[0],$=U[1],ee=Object(n.useState)({id:"",title:"",description:"",cost:0,quantity:0,observation:""}),te=Object(v.a)(ee,2),ce=te[0],ne=te[1];Object(n.useEffect)((function(){var e=a();b(e);var t=0;e.map((function(e){return t+=e.cost*e.quantity})),w(t)}),[]),Object(n.useEffect)((function(){var e=l(),t=new Date(e.date.split("T")[0]+"T"+e.timeStart),c=new Date(e.date.split("T")[0]+"T"+e.timeEnd),n=[];for(n.push("".concat(("0"+t.getHours()).slice(-2),":").concat(("0"+t.getMinutes()).slice(-2)));t<c;)t.setHours(t.getHours()+1),n.push("".concat(("0"+t.getHours()).slice(-2),":").concat(("0"+t.getMinutes()).slice(-2)));x(n),S("".concat(n[0]," at\xe9 ").concat(n[1]))}),[]);var ae=function(){var e=0,t=a();t.map((function(t){return e+=t.cost*t.quantity})),b(t),w(e)},se=function(e){V(e.target.value)},re=function(){var e=m();return null!==e&&!(!e.name&&!e.contact)},ie=function(){var e=Object(F.a)(A.a.mark((function e(){var t;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:0===ce.quantity?(s(_),J(!Q),ae()):(t=a().map((function(e,t){return parseInt(t)===parseInt(_)?ce:e})),b(t),J(!Q));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)(q,{showBack:!0,description:"quase acabando!"}),Object(I.jsxs)("div",{className:"cartContainer",children:[Object(I.jsxs)("div",{className:"cartContent",children:[Object(I.jsxs)("div",{className:"typeDelivery",children:[Object(I.jsxs)("div",{children:[Object(I.jsx)("input",{type:"radio",name:"type",id:"typeFetch",value:"0",checked:0===parseInt(K),onChange:function(e){se(e)}}),Object(I.jsx)("label",{htmlFor:"typeFetch",children:"Retirar"})]}),Object(I.jsxs)("div",{children:[Object(I.jsx)("input",{type:"radio",name:"type",id:"typeDeliver",value:"1",checked:1===parseInt(K),onChange:function(e){se(e)},disabled:!0}),Object(I.jsx)("label",{htmlFor:"typeDeliver",children:"Entregar"})]})]}),Object(I.jsx)("h3",{className:"cartText",children:"seu pedido!"}),Object(I.jsx)("div",{className:"cartItems",children:d.map((function(t,c){return Object(I.jsxs)("div",{className:"cartItem",onClick:function(){return function(e,t){ne(e),$(t),J(!Q)}(t,c)},children:[Object(I.jsx)("p",{className:"cartQuantity",children:"".concat(t.quantity,"x")}),Object(I.jsxs)("div",{className:"cartTitle",children:[t.title,Object(I.jsxs)("p",{className:"cartObservation",children:["Observa\xe7\xe3o:"," ",Object(I.jsx)("span",{children:t.observation})]})]}),Object(I.jsx)("p",{className:"cartValue",children:e.toLocale(t.cost*t.quantity)})]},c)}))})]}),Object(I.jsxs)("div",{className:"timeToDeliver",children:[Object(I.jsxs)("label",{htmlFor:"timeToDeliver",children:["Hor\xe1rio para ",0===parseInt(K)?"retirar":"entregar",":"]}),Object(I.jsx)("select",{name:"timeToDeliver",id:"timeToDeliver",onChange:function(e){return S(e.target.value)},value:g,children:f.map((function(e,t){return void 0!==f[t+1]&&Object(I.jsx)("option",{value:"".concat(e," at\xe9 ").concat(f[t+1]),children:"".concat(e," at\xe9 ").concat(f[t+1])},t)}))})]}),Object(I.jsxs)("div",{className:"cartTotal",children:[Object(I.jsxs)("div",{className:"cartSubTotal",children:[Object(I.jsxs)("p",{className:"cartSubTotalText",children:["subtotal:"," ",Object(I.jsx)("span",{children:e.toLocale(k)})]}),Object(I.jsxs)("p",{className:"cartSubTotalText",children:["entrega:"," ",Object(I.jsx)("span",{children:0===parseInt(K)?"retirar":e.toLocale("5.00")})]})]}),Object(I.jsxs)("div",{className:"cartOrderEnd",children:[Object(I.jsxs)("p",{className:"cartTotalText",children:["total:"," "]}),Object(I.jsx)("p",{className:"cartTotalValue",children:e.toLocale(k+(1===parseInt(K)?5:0))}),Object(I.jsx)(y,{label:"Pedir mais!!",className:"cartButtonReturn",onClick:function(){return t.push("/loja")}}),Object(I.jsx)(y,{label:"Finalizar",className:"cartButton",onClick:function(){return function(){if(!re())return window.confirm("Quem \xe9 voc\xea? Consegue me informar?")?void t.push("/dados?from=cart&delivery="+K):void 0;R("loading");var e=l(),c=m(),n={name:c.name,contact:c.contact,zipCode:c.postalCode,address:c.address,number:c.number,complement:c.complement,city:c.city,type:K,status:!1,fkCampaign:e.id,timeDelivery:g,items:a()};X.post("/order",n).then((function(c){(n=c.data).date=e.date,i(n),R("success"),setTimeout((function(){r(),b([]),t.push("/pedidos")}),1e3)})).catch((function(e){R("error"),console.error(e)}))}()},showLoading:!0,status:B})]})]}),Object(I.jsx)("div",{className:"cartItemEdit ".concat(Q?"showItemEdit":"hideItemEdit"),onClick:function(e){return function(e){"cartItemEdit"===e.target.id&&J(!Q)}(e)},id:"cartItemEdit",children:Object(I.jsxs)("div",{className:"cartItemEditContent",id:"cartItemEditContent",children:[Object(I.jsx)("p",{className:"cartItemEditTitle",children:ce.title}),Object(I.jsxs)("div",{className:"itemCount",children:[Object(I.jsx)(G,{handleChangeValue:function(e){return function(e){ne(Object(p.a)(Object(p.a)({},ce),{},{quantity:e}))}(e)},update:!0,item:ce}),Object(I.jsx)(y,{className:"buttonAdd ".concat(0===ce.quantity?"buttonRemove":null),label:0===ce.quantity?Object(I.jsx)("span",{className:"buttonRemoveLabel",children:"Remover"}):Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)("span",{className:"buttonLabel",children:"Atualizar"}),Object(I.jsx)("span",{className:"buttonValue",children:e.toLocale(ce.cost*ce.quantity)})]}),onClick:function(){return ie()}})]})]})})]})]})};c(82);var $=function(){var e=new P,t=Object(n.useContext)(T).getOrders,c=Object(n.useState)([]),a=Object(v.a)(c,2),s=a[0],r=a[1],i=Object(n.useState)(!0),o=Object(v.a)(i,2),l=o[0],j=o[1];return Object(n.useEffect)((function(){var e=t()?t():[];r(e),j(!1)}),[]),Object(I.jsxs)("div",{className:"ordersContainer",children:[Object(I.jsx)(q,{showBack:!0,showCart:!1,description:"meus pedidos",toHome:!0}),Object(I.jsx)("div",{className:"ordersContent",children:l?Object(I.jsx)(S,{}):0===s.length?Object(I.jsxs)("div",{className:"errorMessage",children:[Object(I.jsx)(C.a,{icon:g.e,color:"#ff4949",size:"5x"}),Object(I.jsx)("p",{children:"Que pena, voc\xea n\xe3o tem pedidos!!"})]}):s.map((function(t){var c=new Date(t.date),n=function(e){var t=0;for(var c in e)t+=e[c].cost*e[c].quantity;return t}(t.items);return Object(I.jsxs)("div",{className:"orderCard",children:[Object(I.jsxs)("div",{className:"orderTitle",children:[Object(I.jsxs)("p",{className:"orderData",children:[0===t.type?"Retirada":"Entrega",": ",Object(I.jsx)("span",{children:c.toLocaleString("pt-BR",{year:"numeric",month:"numeric",day:"numeric"})})]}),Object(I.jsxs)("p",{className:"orderCost",children:[e.toLocale(n),1===parseInt(t.type)?Object(I.jsx)("span",{children:" + R$ 5,00"}):""]})]}),Object(I.jsx)("div",{className:"orderCardItems",children:t.items.map((function(e){return Object(I.jsxs)("div",{className:"orderCardItem",children:[Object(I.jsx)("p",{className:"orderCardItemQuantity",children:"".concat(e.quantity,"x")}),Object(I.jsx)("p",{className:"orderCardDescription",children:e.title})]},e.fkOrder+e.fkStore)}))})]},t.id)}))})]})};c(83);var ee=function(){return Object(n.useEffect)((function(){m()||b({})}),[]),Object(I.jsx)(I.Fragment,{children:Object(I.jsx)(i.a,{children:Object(I.jsxs)(o.c,{children:[Object(I.jsx)(o.a,{path:"/",exact:!0,component:E}),Object(I.jsx)(o.a,{path:"/loja",component:M}),Object(I.jsx)(o.a,{path:"/dados",component:V}),Object(I.jsx)(o.a,{path:"/item",component:U}),Object(I.jsx)(o.a,{path:"/carrinho",component:_}),Object(I.jsx)(o.a,{path:"/pedidos",component:$})]})})})};r.a.render(Object(I.jsx)(a.a.StrictMode,{children:Object(I.jsx)(z,{children:Object(I.jsx)(ee,{})})}),document.getElementById("root"))}},[[84,1,2]]]);
//# sourceMappingURL=main.a7aa0846.chunk.js.map