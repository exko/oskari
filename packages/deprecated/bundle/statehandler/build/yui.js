/* This is a packed Oskari bundle (bundle script version Thu May 31 2012 12:23:19 GMT+0300 (Suomen kesäaika)) */ 
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{a(jQuery)}}(function(e){var i=[],f=e(document),c=e.browser.msie&&parseInt(e.browser.version)===6&&typeof window.XMLHttpRequest!=="object",b=e.browser.msie&&parseInt(e.browser.version)===7,h=null,g=e(window),a=[];e.modal=function(j,d){return e.modal.impl.init(j,d)};e.modal.close=function(){e.modal.impl.close()};e.modal.focus=function(d){e.modal.impl.focus(d)};e.modal.setContainerDimensions=function(){e.modal.impl.setContainerDimensions()};e.modal.setPosition=function(){e.modal.impl.setPosition()};e.modal.update=function(d,j){e.modal.impl.update(d,j)};e.fn.modal=function(d){return e.modal.impl.init(this,d)};e.modal.defaults={appendTo:"body",focus:true,opacity:50,overlayId:"simplemodal-overlay",overlayCss:{},containerId:"simplemodal-container",containerCss:{},dataId:"simplemodal-data",dataCss:{},minHeight:null,minWidth:null,maxHeight:null,maxWidth:null,autoResize:false,autoPosition:true,zIndex:1000,close:true,closeHTML:'<a class="modalCloseImg" title="Close"></a>',closeClass:"simplemodal-close",escClose:true,overlayClose:false,fixed:true,position:null,persist:false,modal:true,onOpen:null,onShow:null,onClose:null};e.modal.impl={d:{},init:function(k,d){var j=this;if(j.d.data){return false}h=e.browser.msie&&!e.boxModel;j.o=e.extend({},e.modal.defaults,d);j.zIndex=j.o.zIndex;j.occb=false;if(typeof k==="object"){k=k instanceof jQuery?k:e(k);j.d.placeholder=false;if(k.parent().parent().size()>0){k.before(e("<span></span>").attr("id","simplemodal-placeholder").css({display:"none"}));j.d.placeholder=true;j.display=k.css("display");if(!j.o.persist){j.d.orig=k.clone(true)}}}else{if(typeof k==="string"||typeof k==="number"){k=e("<div></div>").html(k)}else{alert("SimpleModal Error: Unsupported data type: "+typeof k);return j}}j.create(k);k=null;j.open();if(e.isFunction(j.o.onShow)){j.o.onShow.apply(j,[j.d])}return j},create:function(j){var d=this;d.getDimensions();if(d.o.modal&&c){d.d.iframe=e('<iframe src="javascript:false;"></iframe>').css(e.extend(d.o.iframeCss,{display:"none",opacity:0,position:"fixed",height:a[0],width:a[1],zIndex:d.o.zIndex,top:0,left:0})).appendTo(d.o.appendTo)}d.d.overlay=e("<div></div>").attr("id",d.o.overlayId).addClass("simplemodal-overlay").css(e.extend(d.o.overlayCss,{display:"none",opacity:d.o.opacity/100,height:d.o.modal?i[0]:0,width:d.o.modal?i[1]:0,position:"fixed",left:0,top:0,zIndex:d.o.zIndex+1})).appendTo(d.o.appendTo);d.d.container=e("<div></div>").attr("id",d.o.containerId).addClass("simplemodal-container").css(e.extend({position:d.o.fixed?"fixed":"absolute"},d.o.containerCss,{display:"none",zIndex:d.o.zIndex+2})).append(d.o.close&&d.o.closeHTML?e(d.o.closeHTML).addClass(d.o.closeClass):"").appendTo(d.o.appendTo);d.d.wrap=e("<div></div>").attr("tabIndex",-1).addClass("simplemodal-wrap").css({height:"100%",outline:0,width:"100%"}).appendTo(d.d.container);d.d.data=j.attr("id",j.attr("id")||d.o.dataId).addClass("simplemodal-data").css(e.extend(d.o.dataCss,{display:"none"})).appendTo("body");j=null;d.setContainerDimensions();d.d.data.appendTo(d.d.wrap);if(c||h){d.fixIE()}},bindEvents:function(){var d=this;e("."+d.o.closeClass).bind("click.simplemodal",function(j){j.preventDefault();d.close()});if(d.o.modal&&d.o.close&&d.o.overlayClose){d.d.overlay.bind("click.simplemodal",function(j){j.preventDefault();d.close()})}f.bind("keydown.simplemodal",function(j){if(d.o.modal&&j.keyCode===9){d.watchTab(j)}else{if((d.o.close&&d.o.escClose)&&j.keyCode===27){j.preventDefault();d.close()}}});g.bind("resize.simplemodal orientationchange.simplemodal",function(){d.getDimensions();d.o.autoResize?d.setContainerDimensions():d.o.autoPosition&&d.setPosition();if(c||h){d.fixIE()}else{if(d.o.modal){d.d.iframe&&d.d.iframe.css({height:a[0],width:a[1]});d.d.overlay.css({height:i[0],width:i[1]})}}})},unbindEvents:function(){e("."+this.o.closeClass).unbind("click.simplemodal");f.unbind("keydown.simplemodal");g.unbind(".simplemodal");this.d.overlay.unbind("click.simplemodal")},fixIE:function(){var d=this,j=d.o.position;e.each([d.d.iframe||null,!d.o.modal?null:d.d.overlay,d.d.container.css("position")==="fixed"?d.d.container:null],function(w,n){if(n){var u="document.body.clientHeight",y="document.body.clientWidth",A="document.body.scrollHeight",x="document.body.scrollLeft",r="document.body.scrollTop",m="document.body.scrollWidth",l="document.documentElement.clientHeight",v="document.documentElement.clientWidth",t="document.documentElement.scrollLeft",B="document.documentElement.scrollTop",C=n[0].style;
C.position="absolute";if(w<2){C.removeExpression("height");C.removeExpression("width");C.setExpression("height",""+A+" > "+u+" ? "+A+" : "+u+' + "px"');C.setExpression("width",""+m+" > "+y+" ? "+m+" : "+y+' + "px"')}else{var q,k;if(j&&j.constructor===Array){var z=j[0]?typeof j[0]==="number"?j[0].toString():j[0].replace(/px/,""):n.css("top").replace(/px/,"");q=z.indexOf("%")===-1?z+" + (t = "+B+" ? "+B+" : "+r+') + "px"':parseInt(z.replace(/%/,""))+" * (("+l+" || "+u+") / 100) + (t = "+B+" ? "+B+" : "+r+') + "px"';if(j[1]){var o=typeof j[1]==="number"?j[1].toString():j[1].replace(/px/,"");k=o.indexOf("%")===-1?o+" + (t = "+t+" ? "+t+" : "+x+') + "px"':parseInt(o.replace(/%/,""))+" * (("+v+" || "+y+") / 100) + (t = "+t+" ? "+t+" : "+x+') + "px"'}}else{q="("+l+" || "+u+") / 2 - (this.offsetHeight / 2) + (t = "+B+" ? "+B+" : "+r+') + "px"';k="("+v+" || "+y+") / 2 - (this.offsetWidth / 2) + (t = "+t+" ? "+t+" : "+x+') + "px"'}C.removeExpression("top");C.removeExpression("left");C.setExpression("top",q);C.setExpression("left",k)}}})},focus:function(l){var j=this,k=l&&e.inArray(l,["first","last"])!==-1?l:"first";var d=e(":input:enabled:visible:"+k,j.d.wrap);setTimeout(function(){d.length>0?d.focus():j.d.wrap.focus()},10)},getDimensions:function(){var j=this,d=e.browser.opera&&e.browser.version>"9.5"&&e.fn.jquery<"1.3"||e.browser.opera&&e.browser.version<"9.5"&&e.fn.jquery>"1.2.6"?g[0].innerHeight:g.height();i=[f.height(),f.width()];a=[d,g.width()]},getVal:function(j,k){return j?(typeof j==="number"?j:j==="auto"?0:j.indexOf("%")>0?((parseInt(j.replace(/%/,""))/100)*(k==="h"?a[0]:a[1])):parseInt(j.replace(/px/,""))):null},update:function(d,k){var j=this;if(!j.d.data){return false}j.d.origHeight=j.getVal(d,"h");j.d.origWidth=j.getVal(k,"w");j.d.data.hide();d&&j.d.container.css("height",d);k&&j.d.container.css("width",k);j.setContainerDimensions();j.d.data.show();j.o.focus&&j.focus();j.unbindEvents();j.bindEvents()},setContainerDimensions:function(){var v=this,l=c||b;var d=v.d.origHeight?v.d.origHeight:e.browser.opera?v.d.container.height():v.getVal(l?v.d.container[0].currentStyle.height:v.d.container.css("height"),"h"),k=v.d.origWidth?v.d.origWidth:e.browser.opera?v.d.container.width():v.getVal(l?v.d.container[0].currentStyle.width:v.d.container.css("width"),"w"),q=v.d.data.outerHeight(true),j=v.d.data.outerWidth(true);v.d.origHeight=v.d.origHeight||d;v.d.origWidth=v.d.origWidth||k;var m=v.o.maxHeight?v.getVal(v.o.maxHeight,"h"):null,r=v.o.maxWidth?v.getVal(v.o.maxWidth,"w"):null,o=m&&m<a[0]?m:a[0],u=r&&r<a[1]?r:a[1];var n=v.o.minHeight?v.getVal(v.o.minHeight,"h"):"auto";if(!d){if(!q){d=n}else{if(q>o){d=o}else{if(v.o.minHeight&&n!=="auto"&&q<n){d=n}else{d=q}}}}else{d=v.o.autoResize&&d>o?o:d<n?n:d}var t=v.o.minWidth?v.getVal(v.o.minWidth,"w"):"auto";if(!k){if(!j){k=t}else{if(j>u){k=u}else{if(v.o.minWidth&&t!=="auto"&&j<t){k=t}else{k=j}}}}else{k=v.o.autoResize&&k>u?u:k<t?t:k}v.d.container.css({height:d,width:k});v.d.wrap.css({overflow:(q>d||j>k)?"auto":"visible"});v.o.autoPosition&&v.setPosition()},setPosition:function(){var k=this,m,l,n=(a[0]/2)-(k.d.container.outerHeight(true)/2),j=(a[1]/2)-(k.d.container.outerWidth(true)/2),d=k.d.container.css("position")!=="fixed"?g.scrollTop():0;if(k.o.position&&Object.prototype.toString.call(k.o.position)==="[object Array]"){m=d+(k.o.position[0]||n);l=k.o.position[1]||j}else{m=d+n;l=j}k.d.container.css({left:l,top:m})},watchTab:function(j){var d=this;if(e(j.target).parents(".simplemodal-container").length>0){d.inputs=e(":input:enabled:visible:first, :input:enabled:visible:last",d.d.data[0]);if((!j.shiftKey&&j.target===d.inputs[d.inputs.length-1])||(j.shiftKey&&j.target===d.inputs[0])||d.inputs.length===0){j.preventDefault();var k=j.shiftKey?"last":"first";d.focus(k)}}else{j.preventDefault();d.focus()}},open:function(){var d=this;d.d.iframe&&d.d.iframe.show();if(e.isFunction(d.o.onOpen)){d.o.onOpen.apply(d,[d.d])}else{d.d.overlay.show();d.d.container.show();d.d.data.show()}d.o.focus&&d.focus();d.bindEvents()},close:function(){var d=this;if(!d.d.data){return false}d.unbindEvents();if(e.isFunction(d.o.onClose)&&!d.occb){d.occb=true;
d.o.onClose.apply(d,[d.d])}else{if(d.d.placeholder){var j=e("#simplemodal-placeholder");if(d.o.persist){j.replaceWith(d.d.data.removeClass("simplemodal-data").css("display",d.display))}else{d.d.data.hide().remove();j.replaceWith(d.d.orig)}}else{d.d.data.hide().remove()}d.d.container.hide().remove();d.d.overlay.hide();d.d.iframe&&d.d.iframe.hide().remove();d.d.overlay.remove();d.d={}}}}}));Oskari.clazz.define("Oskari.mapframework.bundle.statehandler.StateHandlerBundleInstance",function(){this._localization=null;this._pluginInstances={};this._startupState=null;this._historyPollingInterval=1500;this._historyTimer=null;this._historyPrevious=[];this._historyEnabled=true;this._historyNext=[];this._currentViewId=1},{__name:"StateHandler",getName:function(){return this.__name},setSandbox:function(a){this.sandbox=a},getSandbox:function(){return this.sandbox},start:function(){var c=this;if(c.started){return}c.started=true;var a=Oskari.$("sandbox");c.sandbox=a;a.register(c);for(p in c.eventHandlers){a.registerForEventByName(c,p)}var b="/web/fi/kartta?p_p_id=Portti2Map_WAR_portti2mapportlet&p_p_lifecycle=1&p_p_state=exclusive&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_Portti2Map_WAR_portti2mapportlet_fi.mml.baseportlet.CMD=ajax.jsp&";var d=Oskari.clazz.create("Oskari.mapframework.bundle.statehandler.plugin.SaveViewPlugin",b);this.registerPlugin(d);this.startPlugin(d);a.addRequestHandler("StateHandler.SetStateRequest",this.requestHandlers.setStateHandler);a.addRequestHandler("StateHandler.SaveStateRequest",this.requestHandlers.saveStateHandler)},update:function(){},stop:function(){var a=this.sandbox();a.removeRequestHandler("StateHandler.SetStateRequest",this.requestHandlers.setStateHandler);a.removeRequestHandler("StateHandler.SaveStateRequest",this.requestHandlers.saveStateHandler);var b=a.getRequestBuilder("MapControls.ToolButtonRequest");if(b){a.request(this,b(this.toolbar.config,"remove"))}for(p in this.eventHandlers){a.unregisterFromEventByName(this,p)}this.sandbox.unregister(this);this.started=false},init:function(){var b=this;this.toolbar={config:{group:this.getName(),toolId:"statehandler.reset",iconCls:"statehandler_reset_tool",tooltip:this.getLocalization("reset"),callback:function(){b.resetState()}}};var a=Oskari.$("sandbox");this.requestHandlers={setStateHandler:Oskari.clazz.create("Oskari.mapframework.bundle.statehandler.request.SetStateRequestHandler",a,this),saveStateHandler:Oskari.clazz.create("Oskari.mapframework.bundle.statehandler.request.SaveStateRequestHandler",a,this)};return null},getLocalization:function(a){if(!this._localization){this._localization=Oskari.getLocalization(this.getName())}if(a){return this._localization[a]}return this._localization},onEvent:function(b){var a=this.eventHandlers[b.getName()];if(!a){return}return a.apply(this,[b])},eventHandlers:{AfterMapMoveEvent:function(b){var a=this;if(this._historyEnabled===true){if(this._historyTimer){clearTimeout(this._historyTimer);this._historyTimer=null}this._historyTimer=setTimeout(function(){var d=a.sandbox.getStatefulComponents()["mapfull"];if(d){var c=d.getState();a._historyPrevious.push(c)}},this._historyPollingInterval)}}},historyMoveNext:function(){if(this._historyNext.length>0){var a=this._historyNext.pop();this._historyPrevious.push(a);var b=this.sandbox.getStatefulComponents()["mapfull"];if(b){this._historyEnabled=false;b.setState(a);this._historyEnabled=true}}},historyMovePrevious:function(){if(this._historyPrevious.length>0){var a=this._historyPrevious.pop();this._historyNext.push(a);var b=this.sandbox.getStatefulComponents()["mapfull"];if(b){this._historyEnabled=false;b.setState(a);this._historyEnabled=true}}},registerPlugin:function(a){a.setHandler(this);var b=a.getName();this.sandbox.printDebug("["+this.getName()+"] Registering "+b);this._pluginInstances[b]=a},unregisterPlugin:function(a){var b=a.getName();this.sandbox.printDebug("["+this.getName()+"] Unregistering "+b);this._pluginInstances[b]=undefined;a.setHandler(null)},startPlugin:function(a){var b=a.getName();this.sandbox.printDebug("["+this.getName()+"] Starting "+b);a.startPlugin(this.sandbox)
},stopPlugin:function(a){var b=a.getName();this.sandbox.printDebug("["+this.getName()+"] Starting "+b);a.stopPlugin(this.sandbox)},setCurrentViewId:function(a){this._currentViewId=a},getCurrentViewId:function(){return this._currentViewId}},{protocol:["Oskari.bundle.BundleInstance","Oskari.mapframework.module.Module"]});Oskari.clazz.category("Oskari.mapframework.bundle.statehandler.StateHandlerBundleInstance","state-methods",{useState:function(c){if(!c){return}var b=this.sandbox.getStatefulComponents();var a=[];for(var d in c){if(b[d]){b[d].setState(c[d].state)}a.push(d)}return a},resetState:function(){for(var b in this._pluginInstances){this.sandbox.printDebug("["+this.getName()+"] resetting state on "+b);this._pluginInstances[b].resetState()}var a=this;if(this._startupState){a._resetComponentsWithNoStateData(a.useState(this._startupState))}else{jQuery.ajax({dataType:"json",type:"GET",url:a.sandbox.getAjaxUrl()+"action_route=GetMapConfiguration&noSavedState=true",success:function(c){a._startupState=c;a._resetComponentsWithNoStateData(a.useState(c))},error:function(){alert("error loading conf")}})}},_resetComponentsWithNoStateData:function(a){var c=this.sandbox.getStatefulComponents();for(var e in c){var d=false;for(var b=0;b<a.length;++b){if(e==a[b]){d=true;break}}if(!d){c[e].setState()}}},saveState:function(a){if(!a){for(var a in this._pluginInstances){this.saveState(a)}return}this.sandbox.printDebug("["+this.getName()+"] saving state with "+a);this._pluginInstances[a].saveState()},getCurrentState:function(){var b={};var a=this.sandbox.getStatefulComponents();for(var c in a){b[c]={state:a[c].getState()}}return b},getSavedState:function(a){return this._pluginInstances[a].getState()}});Oskari.clazz.define("Oskari.mapframework.bundle.statehandler.plugin.Plugin",function(){throw"Oskari.mapframework.bundle.statehandler.Plugin should not be instantiated"},{getName:function(){throw"Implement your own"},setHandler:function(a){throw"Implement your own"},startPlugin:function(a){throw"Implement your own"},stopPlugin:function(a){throw"Implement your own"},getState:function(){throw"Implement your own"},resetState:function(){throw"Implement your own"},saveState:function(a){throw"Implement your own"}});Oskari.clazz.define("Oskari.mapframework.bundle.statehandler.plugin.SaveViewPlugin",function(a){this.handler=null;this.pluginName=null;this._sandbox=null;this._ajaxUrl=a},{__name:"statehandler.SaveViewPlugin",getName:function(){return this.pluginName},getHandler:function(){return this.handler},setHandler:function(a){this.handler=a;this.pluginName=a.getName()+this.__name},getState:function(){},resetState:function(){},saveState:function(){var a=this.handler.getCurrentState();var g=this;var e=this.handler.getLocalization("save");var i=e.title?e.title.save_view:"Näkymän tallennus";var b=e.msg?e.msg.view_name:"Näkymän nimi";var b='<div class="e_noname" style="display: inline-block; color: red; display: none;"><br />'+(e.error_noname?e.error_noname:"Nimi ei voi olla tyhjä!")+'<br /></div><div class="e_illegal" style="display: inline-block; color: red; display: none;"><br />'+(e.error_illegalchars?e.error_illegalchars:"Nimessä on virheellisiä merkkejä")+"<br /></div>"+b+': <input name="viewName" type="text" class="viewName" />';var f={name:"button_save",text:e.button?e.button.save:"Tallenna",close:false,onclick:function(k){var l=jQuery("div.modalmessage input.viewName").val();if(l){if(l.indexOf("<")>=0){jQuery("div.modalmessage div.e_illegal").show()}else{g._saveState(l);$.modal.close()}}else{jQuery("div.modalmessage div.e_noname").show()}}};var j={name:"button_cancel",text:e.button?e.button.cancel:"Peruuta",close:true};var d="userinterface.ModalDialogRequest";var c=g._sandbox.getRequestBuilder(d);var h=c(i,b,[f,j]);g._sandbox.request(g.handler,h)},_saveState:function(e){var c=this.handler.getCurrentState();var a="";if(e){a="myViewName="+e+"&"}var b=this;var d=this.handler.getLocalization("save");jQuery.ajax({dataType:"json",type:"POST",beforeSend:function(f){if(f&&f.overrideMimeType){f.overrideMimeType("application/j-son;charset=UTF-8")}},url:this._ajaxUrl+"action_route=AddView",data:a+"myViewState="+b.serializeJSON(c)+"currentViewId="+b.handler.getCurrentViewId(),success:function(h){alert(d.success);
var f=b._sandbox.getEventBuilder("StateSavedEvent");var g=f(e,c);b._sandbox.notifyAll(g);b.handler.setCurrentViewId(h.id)},error:function(){if(e){alert(d.error);var f=b._sandbox.getEventBuilder("StateSavedEvent");var g=f(e,c);b._sandbox.notifyAll(g)}}})},serializeJSON:function(e){var d=this;var c=typeof(e);if(c!="object"||e===null){if(c=="string"){e='"'+e+'"'}return String(e)}else{var b=[],a=(e&&e.constructor==Array);jQuery.each(e,function(g,f){c=typeof(f);if(c=="string"){f='"'+f+'"'}else{if(c=="object"&f!==null){f=d.serializeJSON(f)}}b.push((a?"":'"'+g+'":')+String(f))});return(a?"[":"{")+String(b)+(a?"]":"}")}},startPlugin:function(a){this._sandbox=a;var b=this;jQuery(document).ready(function(){window.onbeforeunload=function(){b._saveState()}})},stopPlugin:function(a){this._sandbox=null}},{protocol:["Oskari.mapframework.bundle.statehandler.plugin.Plugin"]});Oskari.clazz.define("Oskari.mapframework.bundle.statehandler.request.SetStateRequest",function(a){this._creator=null;this._state=a;this._currentViewId=1},{__name:"StateHandler.SetStateRequest",getName:function(){return this.__name},getState:function(){return this._state},getCurrentViewId:function(){return this._currentViewId},setCurrentViewId:function(a){this.currentViewId=a}},{protocol:["Oskari.mapframework.request.Request"]});Oskari.clazz.define("Oskari.mapframework.bundle.statehandler.request.SetStateRequestHandler",function(b,a){this.sandbox=b;this.statehandler=a},{handleRequest:function(a,b){if(b.getState()){this.statehandler.setCurrentViewId(b.getCurrentViewId());this.statehandler.useState(b.getState())}else{this.statehandler.resetState()}}},{protocol:["Oskari.mapframework.core.RequestHandler"]});Oskari.clazz.define("Oskari.mapframework.bundle.statehandler.event.StateSavedEvent",function(a,b){this._name=a;this._state=b},{__name:"StateSavedEvent",getName:function(){return this.__name},getViewName:function(){return this._name},getState:function(){return this._state}},{protocol:["Oskari.mapframework.event.Event"]});Oskari.clazz.define("Oskari.mapframework.bundle.statehandler.request.SaveStateRequest",function(){this._creator=null},{__name:"StateHandler.SaveStateRequest",getName:function(){return this.__name}},{protocol:["Oskari.mapframework.request.Request"]});Oskari.clazz.define("Oskari.mapframework.bundle.statehandler.request.SaveStateRequestHandler",function(b,a){this.sandbox=b;this.statehandler=a},{handleRequest:function(a,b){this.statehandler.saveState()}},{protocol:["Oskari.mapframework.core.RequestHandler"]});