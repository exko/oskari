Oskari.clazz.define("Oskari.mapframework.ns960.Bundle",function(){this.config=null},{create:function(){var c="bundle/ns960/assets/css/";var a={path:c,dynamic:true,range:["0px    to 760px  = mobile.min.css","760px  to 1280px = 960.min.css","1280px to 1600px = 1200.min.css","1600px to 1940px = 1560.min.css","1940px to 2540px = 1920.min.css","2540px           = 2520.min.css"]};var b=this;a.callback=function(){b.callback.apply(b,arguments)};b.config=a;return this},callback:function(a,b){},adapt:function(n,k,c,e){var l=this;if(!c){return}var a,g;var o=typeof c.callback==="function"?c.callback:e;var p=c.path?c.path:"";var h=c.range;var b=h.length;var i=k.createElement("link");i.rel="stylesheet";i.media="screen";function m(d,q){i.href=a;g=a;o&&o(d,q)}function j(){clearTimeout(l.timer);var d=n.innerWidth||k.documentElement.clientWidth||k.body.clientWidth||0;var u,t,w,v,q,r;var s=b;var x=b-1;while(s--){a="";u=h[s].split("=");t=u[0];r=u[1]?u[1].replace(/\s/g,""):e;q=t.match("to");w=q?parseInt(t.split("to")[0],10):parseInt(t,10);v=q?parseInt(t.split("to")[1],10):e;if((!v&&s===x&&d>w)||(d>w&&d<=v)){r&&(a=p+r);break}}if(!g){m(s,d);p&&(k.head||k.getElementsByTagName("head")[0]).appendChild(i)}else{if(g!==a){m(s,d)}}}j();function f(){clearTimeout(l.timer);l.timer=setTimeout(j,16)}if(c.dynamic){if(n.addEventListener){n.addEventListener("resize",f,false)}else{if(n.attachEvent){n.attachEvent("onresize",f)}else{n.onresize=f}}}},update:function(c,a,b,d){},start:function(){var b=this;var a=this.config;b.adapt(window,window.document,a)},stop:function(){}},{protocol:["Oskari.bundle.Bundle","Oskari.bundle.BundleInstance"],source:{scripts:[],resources:[]},bundle:{manifest:{"Bundle-Identifier":"ns960","Bundle-Name":"mapframework.ns960.Bundle","Bundle-Author":[{Name:"jjk",Organisation:"nls.fi",Temporal:{Start:"2009",End:"2011"},Copyleft:{License:{"License-Name":"EUPL","License-Online-Resource":"http://www.paikkatietoikkuna.fi/license"}}}],"Bundle-Name-Locale":{fi:{Name:" mapframework.mapportal.Bundle",Title:" mapframework.mapportal.Bundle"},en:{}},"Bundle-Version":"1.0.0","Import-Namespace":["Oskari"],"Import-Bundle":{}}}});Oskari.bundle_manager.installBundleClass("ns960","Oskari.mapframework.ns960.Bundle");