var camusjs = require('../index')

test('generate a floating with 4 decimal', () => {
	var template = {
		money: {
			"*": "number",
			min: 1,
			max: 9,
			fixed: 4
		}
	}

	var generated = camusjs.parse(template)
	expect(String(generated.money).length).toBe(6)
});
