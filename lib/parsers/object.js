/**
 * Generate a random boolen
 */
/* usage
{
	"*": "object",
	"chanceToBeNull": 10 // percent, default 0,
	"definition": {}
}
*/

var Chance = require('chance')
var chance = new Chance()
var utils = require('./_utils')
var parseValue = require('../utils/parse_value')

function converter(template, options) {
	var chanceToBeNull = utils.normalizeValue(template.chanceToBeNull, 0)
	var willBeNull = chance.bool({likelihood: chanceToBeNull})

	if (willBeNull) {
		return null
	}
	else {
		var result = {}

		var target = utils.isParseable(template) ? template.definition : template

		Object.keys(target).forEach(function(key) {
			var property = target[key]
			result[key] = parseValue(property, options)
		})

		return result
	}
}

module.exports = {
	"*": 'object',
	converter: converter
}
