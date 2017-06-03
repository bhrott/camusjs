var Chance = require('chance')
var chance = new Chance()
var utils = require('../_utils')

module.exports = {
	"*": 'enum',
	converter: function(template, options) {
		var options = utils.normalizeValue(template.options, [])

		utils.checkOrRaiseError(options.length > 0, 'ERR: empty options for enum type')

		return chance.pickone(options)
	}
}
