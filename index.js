var parseValue = require('./lib/utils/parse_value')

// register parsers
var parserList = require('./lib/utils/parser_list')
var object = require('./lib/parsers/object')
var array = require('./lib/parsers/array')
var optionValue = require('./lib/parsers/option_value')
var stringReplace = require('./lib/parsers/string_replace')

parserList.registerNew(object)
parserList.registerNew(array)
parserList.registerNew(optionValue)
parserList.registerNew(stringReplace)

// register middlewares
var middlewareList = require('./lib/utils/middleware_list')
var chanceToBeNull = require('./lib/middlewares/chance_to_be_null')

middlewareList.registerNew(chanceToBeNull)

// lib
module.exports = {
	parse: function(template, options) {
		return parseValue(template, options)
	},
	registerParser: function(newParser) {
		parserList.registerNew(newParser)
	},
	registerMiddleware: function(newMiddleware) {
		middlewareList.registerNew(newMiddleware)
	}
}
