var Chance = require('chance')
var chance = new Chance()
var utils = require('../_utils')

module.exports = {
	'#': 'chance_to_be_null',
	isGlobal: true,
	converter: function(template, options, result) {
		if (utils.isParseable(template)) {
			var chanceToBeNull = utils.normalizeValue(template.chanceToBeNull, 0)
			var isNull = chance.bool({ likelihood: chanceToBeNull })

			if (isNull) {
				result(null, false)
				return
			}
		}

		result(template, true)
	}
}
