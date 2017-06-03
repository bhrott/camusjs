/**
 * Generate a random integer
 */
var Chance = require('chance')
var chance = new Chance()

module.exports = {
	"*": 'int',
	converter: function(template, options) {
		return chance.integer({ min: template.min, max: template.max })
	}
}
