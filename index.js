var parseValue = require('./lib/utils/parse_value')

// register parsers
var parserList = require('./lib/utils/parser_list')
var fullName = require('./lib/parsers/full_name')
var int = require('./lib/parsers/int')
var bool = require('./lib/parsers/bool')
var object = require('./lib/parsers/object')
var array = require('./lib/parsers/array')
var enumParser = require('./lib/parsers/enum')
var guid = require('./lib/parsers/guid')

parserList.registerNew(fullName)
parserList.registerNew(int)
parserList.registerNew(bool)
parserList.registerNew(object)
parserList.registerNew(array)
parserList.registerNew(enumParser)
parserList.registerNew(guid)

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
