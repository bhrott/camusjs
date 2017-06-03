/**
 * options
 * 		- values: Object
 */

var parserList = require('./lib/utils/parser_list')
var parseValue = require('./lib/utils/parse_value')

var genFullName = require('./lib/parsers/gen_full_name')
var genInt = require('./lib/parsers/gen_int')
var genBool = require('./lib/parsers/gen_bool')
var object = require('./lib/parsers/object')

parserList.registerNew(genFullName)
parserList.registerNew(genInt)
parserList.registerNew(genBool)
parserList.registerNew(object)

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
