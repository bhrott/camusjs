/**
 * options
 * 		- values: Object
 */

var parserList = require('./lib/utils/parser_list')
var parseValue = require('./lib/utils/parse_value')

module.exports = {
	parse: function(template, options) {
		var result = {}

		Object.keys(template).forEach(function(key) {
			result[key] = parseValue(template[key], options)
		})

		return result
	},
	utils: {
		parseValue: function(template, options) {
			return parseValue(template, options)
		}
	},
	register: function(newParser) {
		parserList.registerNew(newParser)
	}
}
