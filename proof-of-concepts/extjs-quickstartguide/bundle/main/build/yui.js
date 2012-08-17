/* This is a packed Oskari bundle (bundle script version Tue Mar 20 2012 10:08:41 GMT+0200 (Suomen normaaliaika)) */ 
Oskari.clazz.define("Oskari.poc.extjsqsg.bundle.MainBundleInstance",function(){this.map=null;this.core=null;this.sandbox=null;this.mapmodule=null},{getMapModule:function(){return this.mapmodule},getSandbox:function(){return this.sandbox},createModulesAndUi:function(j){var k=false;var h=true;var c=true;var d=true;var b=Oskari.clazz.create("Oskari.mapframework.ui.module.common.MapModule","Main",k,h,c,d);this.mapmodule=b;var a=j.register(b);var e=[];e.push("Oskari.mapframework.mapmodule.LayersPlugin");e.push("Oskari.mapframework.mapmodule.WmsLayerPlugin");e.push("Oskari.mapframework.mapmodule.MarkersPlugin");e.push("Oskari.mapframework.mapmodule.ControlsPlugin");e.push("Oskari.mapframework.mapmodule.VectorLayerPlugin");e.push("Oskari.mapframework.mapmodule.TilesGridPlugin");e.push("Oskari.mapframework.mapmodule.ControlsPlugin");e.push("Oskari.mapframework.mapmodule.WfsLayerPlugin");e.push("Oskari.mapframework.mapmodule.GetInfoPlugin");for(var f=0;f<e.length;f++){var g=Oskari.clazz.create(e[f]);b.registerPlugin(g)}a.addControl(new OpenLayers.Control.TouchNavigation({dragPanOptions:{enableKinetic:true}}));a.render("mapdiv");this.map=a},start:function(){var h=this;var e=Oskari.clazz.create("Oskari.mapframework.complexbundle.NlsFiLayerConfig");this.layers=e;var g=e.create();var f=g;Oskari.$("startup",g);var d="fi";var i=[];i.push(Oskari.clazz.create("Oskari.mapframework.service.LanguageService",d));i.push(Oskari.clazz.create("Oskari.mapframework.service.MapLayerService",null));var k=[];var a=h;var c=Oskari.clazz.create("Oskari.mapframework.core.Core");this.core=c;var j=c.getSandbox();this.sandbox=j;c.init(a,i,k,g.layers,d,null,false);Oskari.clazz.create("Oskari.mapframework.enhancement.mapfull.StartMapWithLinkEnhancement").enhance(c);var b=j.getMap();c.processRequest(c.getRequestBuilder("MapMoveRequest")(b.getX(),b.getY(),b.getZoom(),false))},update:function(){},stop:function(){alert("Stopped!")}},{protocol:["Oskari.bundle.BundleInstance"]});Oskari.clazz.define("Oskari.mapframework.enhancement.mapfull.StartMapWithLinkEnhancement",function(){},{enhance:function(u){u.printDebug("Checking if map is started with link...");var o=u.getRequestParameter("coord");var n=u.getRequestParameter("zoomLevel");var h=u.getRequestParameter("mapLayers");var f=u.getRequestParameter("showMarker");var k=u.getRequestParameter("keepLayersOrder");if(k===null){k=true}u.getMap().setMarkerVisible(f=="true");if(o===null||n===null){return}var p;if(o.indexOf("_")>=0){p=o.split("_")}else{p=o.split("%20")}var j=p[0];var m=p[1];if(j===null||m===null){u.printDebug("Could not parse link location. Skipping.");return}u.getMap().moveTo(j,m,n);u.printDebug("This is startup by link, moving map...");if(h!==null&&h!==""){u.printDebug("Continuing by adding layers...");var a=h.split(",");for(var s=0;s<a.length;s++){var g=a[s].split("+");var e=g[0];var b=g[1];var t=g[2];if((e.indexOf("_")!=-1)&&(e.indexOf("base_")==-1)&&(e.indexOf("BASE_")==-1)){var v=e.split("_");e=null;var c=null;for(var d in v){if(d){c=u.findBaselayerBySublayerIdFromAllAvailable(v[d]);if(c){e=c.getId();break}}}}if(e!==null){var q=null;var l=null;q=u.getRequestBuilder("AddMapLayerRequest");l=q(e,k);u.processRequest(l);q=u.getRequestBuilder("ChangeMapLayerOpacityRequest");l=q(e,b);u.processRequest(l);q=u.getRequestBuilder("ChangeMapLayerStyleRequest");l=q(e,t);u.processRequest(l)}else{u.printWarn("[StartMapWithLinkEnhancement] Could not find baselayer for "+e)}}}}},{protocol:["Oskari.mapframework.enhancement.Enhancement"]});