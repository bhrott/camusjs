var registered = {}
var globals = []

module.exports = {
	getAll: function() {
		return Object.keys(registered).map(function(key) {
			return registered[key]
		})
	},
	getGlobals: function() {
		return globals
	},
	registerNew: function(newMiddleware) {
		registered[newMiddleware['#']] = newMiddleware

		if (newMiddleware.isGlobal) {
			globals.push(newMiddleware)
		}
	},
	getByName: function(name) {
		return registered[name]
	}
}
