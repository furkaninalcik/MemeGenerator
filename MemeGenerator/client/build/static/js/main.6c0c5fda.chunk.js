(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{22:function(e,t,n){},23:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var c=n(2),a=n.n(c),i=n(12),o=n.n(i),r=(n(22),n(15)),s=(n.p,n(23),n(13)),l=n(14),u=n(17),j=n(16),p=(n(24),n(0)),m=function(e){Object(u.a)(n,e);var t=Object(j.a)(n);function n(){var e;Object(s.a)(this,n);for(var c=arguments.length,a=new Array(c),i=0;i<c;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).state={selectedImage:null,image:null,memeURL:null},e.selectImage=function(t){console.log("IMAGE SELECTED!!!"),console.log(t.target.files[0]),e.setState({selectedImage:t.target.files[0],image:URL.createObjectURL(t.target.files[0])})},e.uploadSelectedImage=function(e){},e}return Object(l.a)(n,[{key:"render",value:function(){return Object(p.jsx)("div",{children:Object(p.jsxs)("form",{action:"/upload",method:"post",enctype:"multipart/form-data",children:[Object(p.jsx)("input",{type:"file",name:"baseImage"}),Object(p.jsx)("input",{type:"text",name:"topText",placeholder:"Top Text"}),Object(p.jsx)("input",{type:"text",name:"buttomText",placeholder:"Buttom Text"}),Object(p.jsx)("button",{children:"Submit"})]})})}}]),n}(c.Component);var d=function(){var e=a.a.useState(null),t=Object(r.a)(e,2),n=t[0],c=t[1];return a.a.useEffect((function(){fetch("/api").then((function(e){return e.json()})).then((function(e){return c(e.message)}))}),[]),Object(p.jsx)("div",{className:"App",children:Object(p.jsxs)("header",{className:"App-header",children:[Object(p.jsx)("img",{src:"https://media.giphy.com/media/yjGdFXj16MHWtCh9aU/giphy.gif",className:"meme-generator-gif",alt:"logo"}),Object(p.jsx)("p",{children:n||"Loading..."}),Object(p.jsx)(m,{})]})})},g=(n(44),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,46)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),i(e),o(e)}))});o.a.render(Object(p.jsx)(a.a.StrictMode,{children:Object(p.jsx)(d,{})}),document.getElementById("root")),g()}},[[45,1,2]]]);
//# sourceMappingURL=main.6c0c5fda.chunk.js.map