var Chance = require('chance')
var chance = new Chance()
var utils = require('../_utils')

module.exports = {
	"*": 'number',
	converter: function(template, options) {
		var fixed = utils.normalizeValue(template.fixed, 2)
		return chance.floating({
			min: template.min,
			max: template.max,
			fixed: fixed
		})
	}
}
