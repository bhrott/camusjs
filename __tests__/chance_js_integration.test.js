var camusjs = require('../index')

test('bind from option value', () => {
	var template = {
		id: {
			"*": "guid"
		}
	}

	var generated = camusjs.parse(template)
	expect(typeof generated.id).toBe('string')
});
