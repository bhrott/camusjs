var camusjs = require('../index')

test('chancejs: guid', () => {
	var template = {
		id: {
			"*": "guid"
		}
	}

	var generated = camusjs.parse(template)
	expect(typeof generated.id).toBe('string')
});

test('chancejs: pickset', () => {
	var template = {
		id: {
			"*": "pickset",
			args: [
				['alpha', 'bravo', 'charlie', 'delta', 'echo'],
				3
			]
		}
	}

	var generated = camusjs.parse(template)
	expect(generated.id.length).toBe(3)
});
