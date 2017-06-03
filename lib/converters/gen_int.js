/**
 * Generate a random integer
 */
var Chance = require('chance')
var chance = new Chance()

module.exports = {
	type: 'int',
	converter: function(template, options) {
		return chance.integer({ min: template.min, max: template.max })
	}
}
