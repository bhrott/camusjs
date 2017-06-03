/**
 * Generate a random boolen
 */
/* usage
{
	"*": "bool",
	"likelihood": 50 // percent of TRUE values, default 50
}
*/

var Chance = require('chance')
var chance = new Chance()
var utils = require('./_utils')

module.exports = {
	"*": 'bool',
	converter: function(template, options) {
		var likelihood = utils.normalizeValue(template.likelihood, 50)
		return chance.bool({ likelihood: likelihood })
	}
}
