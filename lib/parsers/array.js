var Chance = require('chance')
var chance = new Chance()
var utils = require('../_utils')
var parseValue = require('../utils/parse_value')

function instanceType(type) {
	var chanceToAppear = utils.normalizeValue(type.chanceToAppear, 100)
	var willAppear = chance.bool({ likelihood: chanceToAppear })

	if (willAppear) {
		return parseValue(type.definition)
	}

	return null
}

function getInstanceFor(types) {
	for (var i = 0; i < types.length; i++) {
		var element = types[i];

		var result = instanceType(element)

		if (utils.hasValue(result)) {
			return result
		}
	}

	return null
}

function converter(template, options) {
	var min = utils.normalizeValue(template.minLength, 0)
	var max = utils.normalizeValue(template.maxLength, 0)

	var result = []
	var itensToGenerate = chance.integer({ min: min, max: max })

	while(result.length < itensToGenerate) {
		var instance = getInstanceFor(template.types)

		if (utils.hasValue(instance)) {
			result.push(instance)
		}
	}

	return result
}

module.exports = {
	'*': 'array',
	converter: converter
}
