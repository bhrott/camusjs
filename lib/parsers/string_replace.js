var Chance = require('chance')
var chance = new Chance()
var utils = require('../_utils')
var parseValue = require('../utils/parse_value')

module.exports = {
	"*": 'string_replace',
	converter: function(template, options) {
		var value = utils.normalizeValue(template.value, '')
		var searchFor = utils.normalizeValue(template.searchFor, '')
		var replaceWith = utils.normalizeValue(template.replaceWith, '')
		replaceWith = parseValue(replaceWith, options)

		return value.replace(new RegExp(searchFor, 'g'), replaceWith)
	}
}
