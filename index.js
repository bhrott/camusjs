/**
 * options
 * 		- values: Object
 */

var genFullName = require('./lib/converters/gen_full_name')
var genInt = require('./lib/converters/gen_int')
var genBool = require('./lib/converters/gen_bool')

var converters = [
	genFullName,
	genInt,
	genBool
]

var parseValue = require('./lib/utils/parse_value')

module.exports = {
	parse: function(template, options) {
		var result = {}

		Object.keys(template).forEach(function(key) {
			result[key] = parseValue(template[key], options, converters)
		})

		return result
	},
	utils: {
		parseValue: function(template, options) {
			return parseValue(template, options, converters)
		}
	},
	register: function(newParser) {
		converters.push(newParser)
	}
}
