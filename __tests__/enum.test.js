var camusjs = require('../index')

test('enum must match', () => {
	var template = {
		myEnum: {
			"*": 'enum',
			options: ['foo', 'bar', 'baz']
		}
	}

	var generated = camusjs.parse(template)
	expect(['foo', 'bar', 'baz']).toContain(generated.myEnum)
});
