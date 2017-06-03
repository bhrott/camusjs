module.exports = function(template, options, converters) {
	var targetConverter = converters.find(function(conv) {
		return conv.type === template.type
	})

	if (!!targetConverter) {
		return targetConverter.converter(template, options)
	}

	return template
}
