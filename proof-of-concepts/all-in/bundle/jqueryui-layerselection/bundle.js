/**
 * @class Oskari.poc.jqueryui.LayerSelectionBundle
 */
Oskari.clazz.define("Oskari.poc.jqueryui.LayerSelectionBundle", function() {

}, {
	"create" : function() {

		return Oskari.clazz.create("Oskari.poc.jqueryui.bundle.LayerSelectionBundleInstance");

	},
	"start" : function() {
	},
	"stop" : function() {
	},
	"update" : function(manager, bundle, bi, info) {

	}
}, {

	"protocol" : ["Oskari.bundle.Bundle", "Oskari.bundle.BundleInstance", "Oskari.mapframework.bundle.extension.ExtensionBundle"],
	"source" : {

		"scripts" : [{
			"type" : "text/javascript",
			"src" : "../../../../proof-of-concepts/jqueryui/bundle/layerselection/instance.js"

		}, {
			"type" : "text/javascript",
			"src" : "../../../../proof-of-concepts/jqueryui/bundle/layerselection/Flyout.js"
		}, {
			"type" : "text/javascript",
			"src" : "../../../../proof-of-concepts/jqueryui/bundle/layerselection/Tile.js"
		}],
		"resources" : []
	},
	"bundle" : {
		"manifest" : {
			"Bundle-Identifier" : "jqueryui-layerselection",
			"Bundle-Name" : "jqueryui-layerselection",
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
					"Name" : " style-1",
					"Title" : " style-1"
				},
				"en" : {}
			},
			"Bundle-Version" : "1.0.0",
			"Import-Namespace" : ["Oskari"],
			"Import-Bundle" : {}
		}
	}
});

Oskari.bundle_manager.installBundleClass("jqueryui-layerselection", "Oskari.poc.jqueryui.LayerSelectionBundle");