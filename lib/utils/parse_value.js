var Chance = require('chance')
var chance = new Chance()
var utils = require('../_utils')

var cachedMiddlewares = {}

function loadMiddlewaresFor(parser) {
	var middlewareList = require('./middleware_list')
	var middlewareNames = parser.middlewares || []

	var middlewares = middlewareNames.map(function(name) {
		return middlewareList.getByName(name)
	})

	middlewares = [].concat(middlewareList.getGlobals()).concat(middlewares)
	cachedMiddlewares[parser['*']] = middlewares
}

function getMiddlewaresFor(parser) {
	var cached = cachedMiddlewares[parser['*']]

	if (!cached) {
		loadMiddlewaresFor(parser)
		return getMiddlewaresFor(parser)
	}

	return cached
}

function parser (template, options) {
	if (!utils.hasValue(template)) {
		return template
	}

	var parserList = require('./parser_list')
	var templateId = template["*"]

	var targetParser = parserList.getRegistered().find(function(parser) {
		return parser["*"] === templateId
	})

	var parserMiddleware = null

	if (!targetParser) {
		var chanceJsHandler = chance[templateId]

		if (!!chanceJsHandler) {
			targetParser = {
				converter: function(template, options) {
					return chanceJsHandler.bind(chance).apply(null, template.args)
				}
			}
		}
	}

	if (!!targetParser) {
		loadMiddlewaresFor(targetParser)
		var middlewares = getMiddlewaresFor(targetParser)

		var result = template
		var nextMiddleware = true

		var nextHandler = function(nextResult, mustContinue) {
			result = nextResult
			nextMiddleware = mustContinue
		}

		middlewares.push({
			converter: function(template, options) {
				result = targetParser.converter(result, options)
				nextHandler(result, false)
			}
		})

		for (var i = 0; i < middlewares.length; i++) {
			var mid = middlewares[i];
			mid.converter(result, options, nextHandler)

			if (!nextMiddleware) {
				break
			}
		}

		return result
	}
	else {
		if (utils.isObject(template)) {
			Object.keys(template).forEach(function(k) {
				template[k] = parser(template[k], options)
			})
		}
		else if (utils.isArray(template)) {
			return template.map(function(item) {
				var converted = parser(item, options)
				return converted
			})
		}
	}

	return template
}


module.exports = parser
