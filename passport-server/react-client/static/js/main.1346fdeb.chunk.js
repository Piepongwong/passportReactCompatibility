(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{2:function(e){e.exports={backendUrl:"198.199.125.153"}},21:function(e,t,n){e.exports=n(52)},27:function(e,t,n){},29:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(13),r=n.n(c),i=(n(27),n(14)),s=n(15),l=n(16),u=n(19),d=n(17),h=n(20),g=(n(29),n(4)),m=n.n(g),p=n(18),f=n.n(p),w=n(2),b=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(n=Object(u.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={password:"",username:"",isLoggedIn:!1},n.change=function(e){n.setState(Object(i.a)({},e.target.name,e.target.value))},n.componentDidMount=function(){n.isLoggedIn()},n.isLoggedIn=function(){m.a.get("".concat(w.backendUrl,"user/auth/isloggedin"),{withCredentials:!0}).then(function(e){n.setState({isLoggedIn:!0})}).catch(function(e){n.setState({isLoggedIn:!1})})},n.submit=function(){m()("".concat(w.backendUrl,"user/login-react"),{withCredentials:!0,method:"post",data:f.a.stringify({username:n.state.username,password:n.state.password})}).then(function(e){}).catch(function(e){console.log(e)})},n}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return this.state.isLoggedIn?o.a.createElement("h1",null," Profile "):o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("input",{onChange:this.change,name:"username",placeholder:"username"}),o.a.createElement("input",{onChange:this.change,name:"password",type:"password",placeholder:"password"}),o.a.createElement("button",{onClick:this.submit},"Submit")),o.a.createElement("button",{onClick:this.loginSlack},"Slack Login"),o.a.createElement("a",{href:"".concat(w.backendUrl,"user/auth/slack")}," Slack "),o.a.createElement("a",{href:"".concat(w.backendUrl,"user/auth/spotify")}," Spotify "))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[21,2,1]]]);
//# sourceMappingURL=main.1346fdeb.chunk.js.map