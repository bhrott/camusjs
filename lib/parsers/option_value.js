var Chance = require('chance')
var chance = new Chance()

module.exports = {
	"*": 'option_value',
	converter: function(template, options) {
		return (options || {})[template.property]
	}
}
