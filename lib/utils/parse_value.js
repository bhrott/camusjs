

module.exports = function(template, options) {
	var parserList = require('./parser_list')

	var targetParser = parserList.getRegistered().find(function(parser) {
		return parser["*"] === template["*"]
	})

	if (!!targetParser) {
		return targetParser.converter(template, options)
	}

	return template
}
