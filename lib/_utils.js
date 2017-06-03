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

function checkOrRaiseError(condition, errorMessage) {
	if (!condition) {
		throw errorMessage
	}
}

/**
 *
 * @param {*} list:Array
 * 		+ chanceToAppear (int) 0 - 100
 */
function choseForPercentChances(list) {
	var lastPercent = 0
	var result = []

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var chanceToAppear = normalizeValue(item.chanceToAppear, 100)
		var from = i == 0 ? 0 : lastPercent + 1
		var to = lastPercent + chanceToAppear

		result.push({
			from: from,
			to: to,
			item: item
		})

		lastPercent = to

		if (lastPercent >= 100) {
			break
		}
	}

	var percent = chance.integer({min: 0, max: 100})

	var matched = result.find(function(item) {
		return item.from <= percent && item.to >= percent
	})

	if (hasValue(matched)) {
		return matched.item
	}

	return null
}

module.exports = {
	hasValue: hasValue,
	normalizeValue: normalizeValue,
	isParseable: isParseable,
	isObject: isObject,
	checkOrRaiseError: checkOrRaiseError,
	choseForPercentChances: choseForPercentChances
}
