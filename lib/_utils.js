var Chance = require('chance')
var chance = new Chance()

function hasValue(val) {
	return val !== undefined && val !== null
}

function normalizeValue(val, defaultIfUndef) {
	if (hasValue(val)) {
		return val
	}

	return defaultIfUndef
}

function isObject(val) {
	if (hasValue(val)) {
		return typeof val === 'object'
	}

	return false
}

function isParseable(template) {
	return isObject(template) && hasValue(template['*'])
}

module.exports = {
	hasValue: hasValue,
	normalizeValue: normalizeValue,
	isParseable: isParseable,
	isObject: isObject
}
