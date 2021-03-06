
/**
 * @class Oskari.mapframework.bundle.mapmodule.plugin.PanButtons
 * 
 */
Oskari.clazz.define('Oskari.mapframework.bundle.mapmodule.plugin.PanButtons', 

/**
 * @method create called automatically on construction
 * @static
 */
function() {
    this.mapModule = null;
    this.pluginName = null;
    this._sandbox = null;
    this._map = null;
    this.__templates ={};
    this.__elements = {};
    this.__parent = null;
   
}, {
	/**
	 * @static
	 * @property __name
	 */
    __name : 'PanButtons',

	/**
	 * @method getName
	 * @return {String} the name for the component 
	 */
    getName : function() {
        return this.pluginName;
    },
    /**
     * @method getMapModule
     * @return {Oskari.mapframework.ui.module.common.MapModule} reference to map
     * module
     */
    getMapModule : function() {
        return this.mapModule;
    },
    /**
     * @method hasUI
     * @return {Boolean} true
     * This plugin has an UI so always returns true
     */
    hasUI : function() {
        return true;
        
    },
    /**
     * @method setMapModule
     * @param {Oskari.mapframework.ui.module.common.MapModule} reference to map
     * module
     */
    setMapModule : function(mapModule) {
        this.mapModule = mapModule;
        if(mapModule) {
            this._map = mapModule.getMap();
            this.pluginName = mapModule.getName() + this.__name;
        }
    },
	/**
	 * @method init
	 * implements Module protocol init method - declares pan buttons templates
	 */
    init : function() {
        var me = this;
			
		// templates
		this.__templates['pan'] = 
        jQuery('<div class="panbuttonDiv">'+ 
        	   '<div>' +
        	   '  <img class="panbuttonDivImg" src="/Oskari/resources/framework/bundle/mapmodule-plugin/plugin/panbuttons/images/default.png" usemap="#panbuttons">'+
        	   '    <map name="panbuttons">'+
        	   '      <area shape="circle" class="panbuttons_center" coords="45,45,20" href="#">'+ // center
        	   '      <area shape="polygon" class="panbuttons_left" coords="13,20,25,30,20,45,27,65,13,70,5,45" href="#">'+ // left
        	   '      <area shape="polygon" class="panbuttons_up" coords="30,8,45,4,60,8,60,23,45,20,30,23" href="#">'+ // up
        	   '      <area shape="polygon" class="panbuttons_right" coords="79,20,67,30,72,45,65,65,79,70,87,45" href="#">'+ //right
        	   '      <area shape="polygon" class="panbuttons_down" coords="30,82,45,86,60,82,60,68,45,70,30,68" href="#">'+ // down
        	   '    </map>'+ 
        	   '  </img>' +
        	   '</div>' +
        	   '</div>');
    },
    
    
    /**
     * @method register
     * mapmodule.Plugin protocol method - does nothing atm
     */
    register : function() {

    },
    /**
     * @method unregister
     * mapmodule.Plugin protocol method - does nothing atm
     */
    unregister : function() {
    },
    /**
     * @method startPlugin
	 * @param {Oskari.mapframework.sandbox.Sandbox} sandbox
     * mapmodule.Plugin protocol method.
     * Sets sandbox and registers self to sandbox
     */
    startPlugin : function(sandbox) {
        this._sandbox = sandbox;
        sandbox.register(this);
        
        for(p in this.eventHandlers) {
			sandbox.registerForEventByName(this, p);
		}
        this.draw();
    },  
        /**
     * @method draw
     * 
     * SimpleDiv
     */
    draw : function() {
        var me = this;
        if (!me.__parent) {
            me.__parent = this._map.div;
        }
        if (!me.__elements['panbuttons']) {
            me.__elements['panbuttons'] = 
                me.__templates['pan'].clone();
        }
        
        
        jQuery(me.__parent).append(me.__elements['panbuttons']);
        
        var panbuttonDivImg = me.__elements['panbuttons'].find('.panbuttonDivImg');
        
        var center = me.__elements['panbuttons'].find('.panbuttons_center');
        
        center.bind('mouseover', function(event){
        	panbuttonDivImg.attr('src',"/Oskari/resources/framework/bundle/mapmodule-plugin/plugin/panbuttons/images/root.png");
        });
        center.bind('mouseout', function(event){
        	panbuttonDivImg.attr('src',"/Oskari/resources/framework/bundle/mapmodule-plugin/plugin/panbuttons/images/default.png");
        });
        center.bind('click', function(event){
        	var rb = me.getMapModule().getSandbox().getRequestBuilder('StateHandler.SetStateRequest');
            if(rb) {
            	me.getMapModule().getSandbox().request(me, rb());
            }
        });
        
        
        var left = me.__elements['panbuttons'].find('.panbuttons_left');
        left.bind('mouseover', function(event){
        	panbuttonDivImg.attr('src',"/Oskari/resources/framework/bundle/mapmodule-plugin/plugin/panbuttons/images/left.png");
        });
        left.bind('mouseout', function(event){
        	panbuttonDivImg.attr('src',"/Oskari/resources/framework/bundle/mapmodule-plugin/plugin/panbuttons/images/default.png");
        });
        left.bind('click', function(event){
        	me.getMapModule().panMapByPixels(-100,0, true);
        });
        
        var right = me.__elements['panbuttons'].find('.panbuttons_right');
        right.bind('mouseover', function(event){
        	panbuttonDivImg.attr('src',"/Oskari/resources/framework/bundle/mapmodule-plugin/plugin/panbuttons/images/right.png");
        });
        right.bind('mouseout', function(event){
        	panbuttonDivImg.attr('src',"/Oskari/resources/framework/bundle/mapmodule-plugin/plugin/panbuttons/images/default.png");
        });
        right.bind('click', function(event){
        	me.getMapModule().panMapByPixels(100,0, true);
        });
        
        var top = me.__elements['panbuttons'].find('.panbuttons_up');
        top.bind('mouseover', function(event){
        	panbuttonDivImg.attr('src',"/Oskari/resources/framework/bundle/mapmodule-plugin/plugin/panbuttons/images/up.png");
        });
        top.bind('mouseout', function(event){
        	panbuttonDivImg.attr('src',"/Oskari/resources/framework/bundle/mapmodule-plugin/plugin/panbuttons/images/default.png");
        });
        top.bind('click', function(event){
        	me.getMapModule().panMapByPixels(0,-100, true);
        });
        
        var bottom = me.__elements['panbuttons'].find('.panbuttons_down');
        bottom.bind('mouseover', function(event){
        	panbuttonDivImg.attr('src',"/Oskari/resources/framework/bundle/mapmodule-plugin/plugin/panbuttons/images/down.png");
        });
        bottom.bind('mouseout', function(event){
        	panbuttonDivImg.attr('src',"/Oskari/resources/framework/bundle/mapmodule-plugin/plugin/panbuttons/images/default.png");
        });
        bottom.bind('click', function(event){
        	me.getMapModule().panMapByPixels(0,100, true);
        });
        
        
    },
    
    /**
     * @method stopPlugin
	 * @param {Oskari.mapframework.sandbox.Sandbox} sandbox
     * mapmodule.Plugin protocol method.
     * Unregisters self from sandbox
     */
    stopPlugin : function(sandbox) {

        if(this.__elements['panbuttons']) {
            this.__elements['panbuttons'].remove();
            delete this.__elements['panbuttons'];
        }
        sandbox.unregister(this);

        this._map = null;
        this._sandbox = null;
    },

    /**
     * @method onEvent
     * @param {Oskari.mapframework.event.Event} event a Oskari event object
     * Event is handled forwarded to correct #eventHandlers if found or discarded
     * if not.
     */
	onEvent : function(event) {
		return this.eventHandlers[event.getName()].apply(this, [event]);
	},
    /**
     * @method start
	 * @param {Oskari.mapframework.sandbox.Sandbox} sandbox
     * Module protocol method - does nothing atm
     */
    start : function(sandbox) {
    },
    /**
     * @method stop
	 * @param {Oskari.mapframework.sandbox.Sandbox} sandbox
     * Module protocol method - does nothing atm
     */
    stop : function(sandbox) {
    }
}, {
	/**
	 * @property {String[]} protocol
	 * @static 
	 */
    'protocol' : ["Oskari.mapframework.module.Module", "Oskari.mapframework.ui.module.common.mapmodule.Plugin"]
});
