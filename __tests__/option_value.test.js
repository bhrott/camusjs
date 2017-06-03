var camusjs = require('../index')

test('bind from option value', () => {
	var template = {
		id: {
			"*": "option_value",
			property: 'myId'
		}
	}

	var generated = camusjs.parse(template, {
		myId: 'abc123'
	})

	expect(generated.id).toBe('abc123')
});
