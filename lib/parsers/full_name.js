var Chance = require('chance')
var chance = new Chance()

module.exports = {
	"*": 'full_name',
	converter: function(template, options) {
		return chance.name()
	}
}
