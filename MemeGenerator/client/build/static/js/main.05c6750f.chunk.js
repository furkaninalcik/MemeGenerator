(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{22:function(e,t,n){},23:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var a=n(2),c=n.n(a),s=n(12),i=n.n(s),l=(n(22),n(15)),r=(n.p,n(23),n(13)),o=n(14),g=n(17),u=n(16),m=(n(24),n(0)),d=function(e){Object(g.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(r.a)(this,n);for(var a=arguments.length,c=new Array(a),s=0;s<a;s++)c[s]=arguments[s];return(e=t.call.apply(t,[this].concat(c))).state={selectedImage:null,image:null},e.selectImage=function(t){console.log("IMAGE SELECTED!!!"),console.log(t.target.files[0]),e.setState({selectedImage:t.target.files[0],image:URL.createObjectURL(t.target.files[0])})},e.uploadSelectedImage=function(e){},e}return Object(o.a)(n,[{key:"render",value:function(){return Object(m.jsxs)("div",{children:[Object(m.jsx)("input",{onChange:this.selectImage,type:"file",id:"file-input",name:"ImageStyle",className:"meme-upload"}),Object(m.jsx)("button",{onClick:this.uploadSelectedImage,children:"Upload Image"}),Object(m.jsx)("p",{children:this.state.selectedImage&&this.state.selectedImage.name}),Object(m.jsx)("img",{src:this.state.selectedImage&&this.state.image,className:"meme-generator-gif",alt:""})]})}}]),n}(a.Component);var j=function(){var e=c.a.useState(null),t=Object(l.a)(e,2),n=t[0],a=t[1];return c.a.useEffect((function(){fetch("/api").then((function(e){return e.json()})).then((function(e){return a(e.message)}))}),[]),Object(m.jsx)("div",{className:"App",children:Object(m.jsxs)("header",{className:"App-header",children:[Object(m.jsx)("img",{src:"https://media.giphy.com/media/yjGdFXj16MHWtCh9aU/giphy.gif",className:"meme-generator-gif",alt:"logo"}),Object(m.jsx)("p",{children:n||"Loading..."}),Object(m.jsx)(d,{})]})})},h=(n(44),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,46)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),s(e),i(e)}))});i.a.render(Object(m.jsx)(c.a.StrictMode,{children:Object(m.jsx)(j,{})}),document.getElementById("root")),h()}},[[45,1,2]]]);
//# sourceMappingURL=main.05c6750f.chunk.js.map