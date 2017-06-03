/**
 * Generate a full name
 */
var Chance = require('chance')
var chance = new Chance()

module.exports = {
	type: 'full_name',
	converter: function(template, options) {
		return chance.name()
	}
}
