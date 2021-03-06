/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the Clear BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * * full text of the license. */

/**
 * Copyright (c) 2011,2012 National Land Survey of Finland.
 */
OpenLayers.Control.PorttiMouse = OpenLayers.Class(OpenLayers.Control,
{
    oldxy : { x : 0, y : 0 },
    clickTimerId : null,
    performedDrag : false,
    wheelObserver : null,
    _hoverEvent : null,
    name : 'PorttiMouse',
    events : new OpenLayers.Events(),
    constructor : function(config) {
        this.sandbox = config.sandbox;
        this.mapmodule = config.mapmodule;
    },
    isReallyLeftClick : function(evt) {
        var isLeftClick = OpenLayers.Event.isLeftClick(evt);
        if(isLeftClick === false) {
            return false;
        }
        if(isLeftClick === true) {
            return true;
        }
        if(isLeftClick != 0) {
            return false;
        }
        return true;
    },
    /*
    getName : function() {
        // this.sandbox.printDebug("[PorttiMouse] getName: " + this.name);
        return this.name;
    },
    init : function(sandbox) {
        // this.sandbox.printDebug("[PorttiMouse] init called.");
    }, */
    queueClick : function(evt) {        
        var me = this;
        this.clickTimerId = window.setTimeout(
           OpenLayers.Function.bind(
               this.defaultClick, 
               this, 
               evt), 
           300
       );
    },
    click : function(evt) {
        if (this.clickTimerId != null) {
            window.clearTimeout(this.clickTimerId);
            this.clickTimerId = null;
            this.defaultDblClick(evt);
        } else {
            // var event = 
            //     this.single ? OpenLayers.Util.extend({}, evt) : null;
            var event = OpenLayers.Util.extend({}, evt);
            this.queueClick(event);
        }
        this.oldxy.x = evt.xy.x;
        this.oldxy.y = evt.xy.y;
    },
    initialize : function() {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
    },    
    destroy : function() {
        //this.sandbox.unregister(this);
        if(this.handler) {
            this.handler.destroy();
        }
        this.handler = null;

        this.map.events.un({
            "click" : this.click,
//            "dblclick" : this.defaultDblClick,
            "mousedown" : this.defaultMouseDown,
            "mouseup" : this.defaultMouseUp,
            "mousemove" : this.defaultMouseMove,
            "mouseout" : this.defaultMouseOut,
            "touchstart" : this.defaultTouchStart,
            "touchend" : this.defaultTouchEnd,
            "touchmove" : this.defaultTouchMove,
            scope : this
        });

        // unregister mousewheel events specifically on the window and document
        OpenLayers.Event.stopObserving(window, "DOMMouseScroll", this.wheelObserver);
        OpenLayers.Event.stopObserving(window, "mousewheel", this.wheelObserver);
        OpenLayers.Event.stopObserving(document, "mousewheel", this.wheelObserver);
        this.wheelObserver = null;

        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },
    draw : function() {
       this.map.events.on({
            "click" : this.click,
//            "dblclick" : this.defaultDblClick,
            "mousedown" : this.defaultMouseDown,
            "mouseup" : this.defaultMouseUp,
            "mousemove" : this.defaultMouseMove,
            "mouseout" : this.defaultMouseOut,
            "touchstart" : this.defaultTouchStart,
            "touchend" : this.defaultTouchEnd,
            "touchmove" : this.defaultTouchMove,
            scope : this
        });

        this.registerWheelEvents();

    },
    registerWheelEvents : function() {
        this.wheelObserver = OpenLayers.Function.bindAsEventListener(this.onWheelEvent, this);
        // register mousewheel events specifically on the window and document
        OpenLayers.Event.observe(window, "DOMMouseScroll", this.wheelObserver);
        OpenLayers.Event.observe(window, "mousewheel", this.wheelObserver);
        OpenLayers.Event.observe(document, "mousewheel", this.wheelObserver);
    },
    defaultClick : function(evt) {
        if (!this.isReallyLeftClick(evt)) {
            return;
        }
        this.clickTimerId = null;
        var notAfterDrag = !this.performedDrag;
        this.performedDrag = false;
        if(notAfterDrag) {
            // moved to mouseup
            // this.sandbox.request(this,
            // this.sandbox.getRequestBuilder('MapModulePlugin.MapClickRequest')
            // (this.map.getLonLatFromViewPortPx(evt.xy),
            // evt.xy.x, evt.xy.y));
            this.sendMapClickEvent(evt);
        }
        return notAfterDrag;
    },
    defaultDblClick : function(evt) {
        if ((evt.xy.x == this.oldxy.x) &&
            (evt.xy.y == this.oldxy.y)) {
            this.mapmodule.centerMapByPixels(evt.xy.x, 
                                             evt.xy.y, 
                                             true, 
                                             true);
            this.mapmodule.zoomIn();
        }
        // OpenLayers.Event.stop(evt);
        return false;
    },
    pinchZoom : function(event) {
        var scale = event.scale;
        if(scale < 1.0) {
            this.mapmodule.zoomOut();
        } else if(scale > 1.0) {
            this.mapmodule.zoomIn();
        }
        event.preventDefault();
    },
    defaultTouchStart : function(event) {
        if(event.touches.length != 1) {
            return;
        }
        var touch = event.touches[0];
        var x = touch.pageX;
        var y = touch.pageY;
        this.mouseDragStart = { x : x, y : y};
        document.onselectstart = OpenLayers.Function.False;
    },
    defaultTouchMove : function(event) {
        if(event.targetTouches.length > 1) {
            this.pinchZoom(event);
            return;
        }
        event.preventDefault();
        var curX = event.targetTouches[0].pageX;
        var curY = event.targetTouches[0].pageY;
        // record the mouse position, used in onWheelEvent
        this.mousePosition = { x : curX, y : curY};

        if(this.mouseDragStart != null) {
            if(this.performedDrag === false) {
                // send event on first move after mouse down
                this.mapmodule.notifyStartMove();
            }
            var deltaX = this.mouseDragStart.x - curX;
            var deltaY = this.mouseDragStart.y - curY;
            this.mouseDragStart = this.mousePosition;
            this.mapmodule.moveMapByPixels(deltaX, deltaY, true, true);
            this.map.div.style.cursor = "move";
            this.performedDrag = true;
        } 
    },
    defaultTouchEnd : function(evt) {
        if(this.performedDrag) {
            this.mapmodule.notifyMoveEnd();
        }
        document.onselectstart = null;
        this.mouseDragStart = null;
        this.map.div.style.cursor = "";
    },
    _clone : function(obj) {
         return eval(uneval(obj));
    },
    defaultMouseDown : function(evt) {
        if(!this.isReallyLeftClick(evt)) {
            return;
        }
        this.mouseDragStart = evt.xy.clone();
        this.performedDrag = false;
        if(evt.shiftKey) {
            this.map.div.style.cursor = "crosshair";
            this.zoomBox = OpenLayers.Util.createDiv('zoomBox', this.mouseDragStart, null, null, "absolute", "2px solid red");
            this.zoomBox.style.backgroundColor = "white";
            this.zoomBox.style.filter = "alpha(opacity=50)";
            // IE
            this.zoomBox.style.opacity = "0.50";
            this.zoomBox.style.fontSize = "1px";
            this.zoomBox.style.zIndex = this.map.Z_INDEX_BASE["Popup"] - 1;
            this.map.eventsDiv.appendChild(this.zoomBox);
        }

        document.onselectstart = OpenLayers.Function.False;

        //this.sandbox.request(this,
        // this.sandbox.getRequestBuilder('MapMoveStartRequest')());
    },
    defaultMouseMove : function(evt) {
        // record the mouse position, used in onWheelEvent
        this.mousePosition = evt.xy.clone();

        if(this.mouseDragStart != null) {
            if(this.zoomBox) {
                var deltaX = Math.abs(this.mouseDragStart.x - evt.xy.x);
                var deltaY = Math.abs(this.mouseDragStart.y - evt.xy.y);
                this.zoomBox.style.width = Math.max(1, deltaX) + "px";
                this.zoomBox.style.height = Math.max(1, deltaY) + "px";
                if(evt.xy.x < this.mouseDragStart.x) {
                    this.zoomBox.style.left = evt.xy.x + "px";
                }
                if(evt.xy.y < this.mouseDragStart.y) {
                    this.zoomBox.style.top = evt.xy.y + "px";
                }
            } else {
                if(this.performedDrag === false) {
                    // send event on first move after mouse down
                    this.mapmodule.notifyStartMove();
                }
                var deltaX = this.mouseDragStart.x - evt.xy.x;
                var deltaY = this.mouseDragStart.y - evt.xy.y;
                this.mapmodule.moveMapByPixels(deltaX, deltaY, true, true);
                this.mouseDragStart = evt.xy.clone();
                this.map.div.style.cursor = "move";
            }
            this.performedDrag = true;
        } else {
            this.notifyHover(evt);
        }
    },
    defaultMouseUp : function(evt) {
        if(!this.isReallyLeftClick(evt)) {
            return;
        }
        if(this.zoomBox) {
            this.zoomBoxEnd(evt);
        } else {
            if(this.performedDrag) {
                //this.mapmodule.moveMapToLanLot(this.map.center);
                //this.mapmodule.notifyMoveEnd();
                // FIXME: This is an ugly hack to update history...
                var nh = this.mapmodule._navigationHistoryTool;
                var state = nh.getState();
                nh.previousStack.unshift(state);
                if(nh.previousStack.length > 1) {
                    nh.onPreviousChange(nh.previousStack[1], nh.previousStack.length - 1);
                }
                if(nh.previousStack.length > (nh.limit + 1)) {
                    nh.previousStack.pop();
                }
                if(nh.nextStack.length > 0) {
                    nh.nextStack = [];
                    nh.onNextChange(null, 0);
                }
                //this.mapmodule.adjustZoomLevel(0, false);
                this.mapmodule.notifyMoveEnd();
            } else {
                // sthis.mouseUp(evt);
            }
        }
        document.onselectstart = null;
        this.mouseDragStart = null;
        this.map.div.style.cursor = "";
    },
    sendMapClickEvent : function(evt) {
        // this.mouseUpTimerId = null;
        this.clickTimerId = null;
        if (evt) {
            var lonlat = this.map.getLonLatFromViewPortPx(evt.xy);
            var builder = this.sandbox.getEventBuilder('MapClickedEvent');
            var evt = builder(lonlat, evt.xy.x, evt.xy.y);
            this.sandbox.notifyAll(evt, true);
        }
    },
    // queueMouseUp : function(evt) {        
    //     var me = this;
    //     this.mouseUpTimerId = window.setTimeout(
    //         function() {
    //             me.sendMapClickEvent(evt);
    //         }, 300
    //    );
    // },
    // mouseUp : function(evt) {
    //     if (this.mouseUpTimerId != null) {
    //         window.clearTimeout(this.mouseUpTimerId);
    //         this.mouseUpTimerId = null;
    //         this.defaultDblClick(evt);
    //     } else {
    //         var event = OpenLayers.Util.extend({}, evt);
    //         this.queueMouseUp(event);
    //     }
    // },
    defaultMouseOut : function(evt) {
        if(this.mouseDragStart != null && OpenLayers.Util.mouseLeft(evt, this.map.eventsDiv)) {
            if(this.zoomBox) {
                this.removeZoomBox();
            }
            // send event that dragging has stopped
            //this.mapmodule.moveMapToLanLot(this.map.center);
            this.mapmodule.notifyMoveEnd();
            this.mouseDragStart = null;
            this.map.div.style.cursor = "";
        }
    },
    defaultWheelUp : function(evt) {
        // center map to mouse location
        //this.mapmodule.centerMapByPixels(evt.xy.x, evt.xy.y, true, true);
        // zoom
        this.mapmodule.zoomIn();
    },
    defaultWheelDown : function(evt) {
        // center map to mouse location
        //this.mapmodule.centerMapByPixels(evt.xy.x, evt.xy.y, true, true);
        // zoom
        this.mapmodule.zoomOut();
    },
    zoomBoxEnd : function(evt) {
        if(this.mouseDragStart != null) {
            if(Math.abs(this.mouseDragStart.x - evt.xy.x) > 5 || Math.abs(this.mouseDragStart.y - evt.xy.y) > 5) {
                // TODO: refactor map references so that we only pass pixels to
                // mapmodule?
                var start = this.map.getLonLatFromViewPortPx(this.mouseDragStart);
                var end = this.map.getLonLatFromViewPortPx(evt.xy);
                var top = Math.max(start.lat, end.lat);
                var bottom = Math.min(start.lat, end.lat);
                var left = Math.min(start.lon, end.lon);
                var right = Math.max(start.lon, end.lon);
                var bounds = new OpenLayers.Bounds(left, bottom, right, top);
                this.mapmodule.zoomToExtent(bounds, true);
            } else {
                this.mapmodule.centerMapByPixels(evt.xy.x, evt.xy.y, true, true);
                this.mapmodule.zoomIn();
            }
            this.removeZoomBox();
        }
    },
    removeZoomBox : function() {
        this.map.eventsDiv.removeChild(this.zoomBox);
        this.zoomBox = null;
    },
    notifyHover : function(evt) {
        if(this.mapmodule.getStealth()) {
            // ignore if in "stealth mode"
            return;
        }

        if(!this._hoverEvent) {
            this._hoverEvent = this.sandbox.getEventBuilder("MouseHoverEvent")();
        }
        var lonlat = this.map.getLonLatFromViewPortPx(evt.xy);

        this._hoverEvent.set(lonlat.lon, lonlat.lat);

        this.sandbox.notifyAll(this._hoverEvent, true);
    },
    /**
     *  Mouse ScrollWheel code thanks to
     * http://adomas.org/javascript-mouse-wheel/
     */
    onWheelEvent : function(e) {
        // first determine whether or not the wheeling was inside the map
        var inMap = false;
        var elem = OpenLayers.Event.element(e);
        while(elem != null) {
            if(this.map && elem == this.map.div) {
                inMap = true;
                break;
            }
            // check if we mousewheel over a popup
            if(elem.className == 'olPopup') {
            	inMap = false;
            	break;
            }
            elem = elem.parentNode;
        }

        if(inMap) {

            var delta = 0;
            if(!e) {
                e = window.event;
            }
            if(e.wheelDelta) {
                delta = e.wheelDelta / 120;
                if(window.opera && window.opera.version() < 9.2) {
                    delta = -delta;
                }
            } else if(e.detail) {
                delta = -e.detail / 3;
            }
            if(delta) {
                // add the mouse position to the event because mozilla has a bug
                // with clientX and clientY
                // (see https://bugzilla.mozilla.org/show_bug.cgi?id=352179)
                // getLonLatFromViewPortPx(e) returns wrong values
                e.xy = this.mousePosition;
                if(delta < 0) {
                    this.defaultWheelDown(e);
                } else {
                    this.defaultWheelUp(e);
                }
                // prevent browser scrolling when zooming with mouse wheel
                e.preventDefault();
            }
            // only wheel the map, not the window
            OpenLayers.Event.stop(e);
        }
    },
    CLASS_NAME : "OpenLayers.Control.PorttiMouse"
});
