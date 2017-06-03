var Chance = require('chance')
var chance = new Chance()
var utils = require('../_utils')
var parseValue = require('../utils/parse_value')

function converter(template, options) {
	var result = {}

	var target = utils.isParseable(template) ? template.definition : template

	Object.keys(target).forEach(function(key) {
		var property = target[key]
		result[key] = parseValue(property, options)
	})

	return result
}

module.exports = {
	"*": 'object',
	converter: converter
}
