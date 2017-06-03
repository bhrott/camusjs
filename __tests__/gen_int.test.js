var camusjs = require('../index')

test('gen int: 1 to 10', () => {
	var template = {
		age: {
			type: "int",
			min: 1,
			max: 10
		}
	}

	var generated = camusjs.parse(template)
	expect(generated.age).toBeGreaterThanOrEqual(1)
	expect(generated.age).toBeLessThanOrEqual(10)
});
