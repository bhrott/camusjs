var parsers = []

module.exports = {
	getRegistered: function() {
		return parsers
	},
	registerNew: function(newParser) {
		parsers.push(newParser)
	}
}
