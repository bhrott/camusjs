var Chance = require('chance')
var chance = new Chance()
var utils = require('../_utils')
var parseValue = require('../utils/parse_value')

function converter(template, options) {
	var min = utils.normalizeValue(template.minLength, 0)
	var max = utils.normalizeValue(template.maxLength, 0)

	var result = []
	var itensToGenerate = chance.integer({ min: min, max: max })

	while(result.length < itensToGenerate) {
		var instance = utils.choseForPercentChances(template.types)

		if (utils.hasValue(instance)) {
			parsed = parseValue(instance.definition)
			result.push(parsed)
		}
	}

	return result
}

module.exports = {
	'*': 'array',
	converter: converter
}
