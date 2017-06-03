var genFullName = require('../parsers/gen_full_name')
var genInt = require('../parsers/gen_int')
var genBool = require('../parsers/gen_bool')
var object = require('../parsers/object')

var parsers = [
	genFullName,
	genInt,
	genBool,
	object
]

module.exports = {
	getRegistered: function() {
		return parsers
	},
	registerNew: function(newParser) {
		parsers.push(newParser)
	}
}
