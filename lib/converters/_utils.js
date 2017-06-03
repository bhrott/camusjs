function hasValue(val) {
	return val !== undefined && val !== null
}

function normalizeValue(val, defaultIfUndef) {
	if (hasValue(val)) {
		return val
	}

	return defaultIfUndef
}

module.exports = {
	hasValue: hasValue,
	normalizeValue: normalizeValue
}
