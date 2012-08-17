
/**
 * @class Oskari.mapframework.bundle.mappublished.PublishedBundle
 * Bundle definition for Oskari.mapframework.bundle.mappublished.PublishedBundleInstance
 */
Oskari.clazz.define("Oskari.mapframework.bundle.mappublished.PublishedBundle", function() {

}, {
    "create" : function() {

        return Oskari.clazz.create("Oskari.mapframework.bundle.mappublished.PublishedBundleInstance");
    },
    "update" : function(manager, bundle, bi, info) {

    }
}, {

    "protocol" : ["Oskari.bundle.Bundle", "Oskari.mapframework.bundle.extension.ExtensionBundle"],
    "source" : {

        "scripts" : [{
			"type" : "text/javascript",
			"src" : "instance.js"
		},{
			"type" : "text/javascript",
			"src" : "../mapfull/enhancement/start-map-with-link-enhancement.js"
		},{
            "type" : "text/javascript",
            "src" : "plugin/BaseMapPlugin.js"
        },
        {
            "type" : "text/javascript",
            "src" : "plugin/SearchPlugin.js"
        },{
            "type" : "text/javascript",
            "src" : "plugin/MapInfoPlugin.js"
        },{
            "type" : "text/javascript",
            "src" : "plugin/GetFeatureInfoPlugin.js"
        }],
        "resources" : []
    },
    "bundle" : {
        "manifest" : {
            "Bundle-Identifier" : "published",
            "Bundle-Name" : "published",
            "Bundle-Author" : [{
                "Name" : "jjk",
                "Organisation" : "nls.fi",
                "Temporal" : {
                    "Start" : "2009",
                    "End" : "2011"
                },
                "Copyleft" : {
                    "License" : {
                        "License-Name" : "EUPL",
                        "License-Online-Resource" : "http://www.paikkatietoikkuna.fi/license"
                    }
                }
            }],
            "Bundle-Name-Locale" : {
                "fi" : {
                    "Name" : " published",
                    "Title" : " published"
                },
                "en" : {}
            },
            "Bundle-Version" : "1.0.0",
            "Import-Namespace" : ["Oskari"],
            "Import-Bundle" : {}
        }
    }
});

Oskari.bundle_manager.installBundleClass("mappublished", "Oskari.mapframework.bundle.mappublished.PublishedBundle");