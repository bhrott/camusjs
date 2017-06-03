var camusjs = require('../index')

test('middleware always returning null', () => {
	var template = {
		hasCar: {
			"*": 'bool',
			chanceToBeNull: 100
		}
	}

	var generated = camusjs.parse(template)
	expect(generated.hasCar).toBeNull()
});
