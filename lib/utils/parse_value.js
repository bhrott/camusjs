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

module.exports = function(template, options) {
	var parserList = require('./parser_list')


	var targetParser = parserList.getRegistered().find(function(parser) {
		return parser["*"] === template["*"]
	})

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

	return template
}
