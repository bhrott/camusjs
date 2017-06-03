var Chance = require('chance')
var chance = new Chance()

module.exports = {
	"*": 'guid',
	converter: function(template, options) {
		return chance.guid()
	}
}
