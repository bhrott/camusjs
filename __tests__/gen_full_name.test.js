var camusjs = require('../index')

test('gen full name success', () => {
	var template = {
		name: {
			type: "full_name"
		}
	}

	var generated = camusjs.parse(template)
  	expect(typeof generated.name).toBe("string");
});
