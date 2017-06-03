var parseValue = require('./lib/utils/parse_value')

// register parsers
var parserList = require('./lib/utils/parser_list')
var genFullName = require('./lib/parsers/gen_full_name')
var genInt = require('./lib/parsers/gen_int')
var genBool = require('./lib/parsers/gen_bool')
var object = require('./lib/parsers/object')
var array = require('./lib/parsers/array')

parserList.registerNew(genFullName)
parserList.registerNew(genInt)
parserList.registerNew(genBool)
parserList.registerNew(object)
parserList.registerNew(array)

// register middlewares
var middlewareList = require('./lib/utils/middleware_list')
var chanceToBeNull = require('./lib/middlewares/chance_to_be_null')

middlewareList.registerNew(chanceToBeNull)

// lib
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
	registerParser: function(newParser) {
		parserList.registerNew(newParser)
	},
	registerMiddleware: function(newMiddleware) {
		middlewareList.registerNew(newMiddleware)
	}
}
