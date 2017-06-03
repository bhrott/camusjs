var camusjs = require('../index')

test('generating guid success', () => {
	var template = {
		id: {
			"*": "guid"
		}
	}

	var generated = camusjs.parse(template)
  	expect(typeof generated.id).toBe("string");
});
