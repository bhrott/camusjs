var camusjs = require('../index')

test('gen bool: must return true', () => {
	var template = {
		hasCar: {
			type: 'bool',
			likelihood: 100
		}
	}

	var generated = camusjs.parse(template)
	expect(generated.hasCar).toBeTruthy()
});

test('gen bool: must return false', () => {
	var template = {
		hasCar: {
			type: 'bool',
			likelihood: 0
		}
	}

	var generated = camusjs.parse(template)
	expect(generated.hasCar).toBeFalsy()
});

test('gen bool: must return true or false', () => {
	var template = {
		hasCar: {
			type: 'bool',
			likelihood: 50
		}
	}

	var resultInTrue = false
	var resultInFalse = false

	while(!resultInFalse || !resultInTrue) {
		var generated = camusjs.parse(template)

		if (generated.hasCar) {
			resultInTrue = true
		}
		else {
			resultInFalse = true
		}
	}

	expect(resultInTrue && resultInFalse).toBeTruthy()
});
