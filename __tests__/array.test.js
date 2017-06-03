var camusjs = require('../index')

test('array with 1 type returns 1 result', () => {
	var template = {
		pets: {
			'*': 'array',
			minLength: 1,
			maxLength: 1,
			types: [
				{
					chanceToAppear: 90,
					definition: {
						'*': 'int',
						min: 0,
						max: 10
					}
				},
				{
					chanceToAppear: 10,
					definition: {
						'*': 'bool'
					}
				}
			]
		}
	}

	var generated = camusjs.parse(template)
	expect(generated.pets.length).toBe(1)
});

test('array with nested types', () => {
	var template = {
		pets: {
			'*': 'array',
			minLength: 1,
			maxLength: 1,
			types: [
				{
					definition: {
						'*': 'object',
						definition: {
							name: {
								'*': 'full_name'
							}
						}
					}
				}
			]
		}
	}

	var generated = camusjs.parse(template)
	expect(generated.pets.length).toBe(1)
	expect(typeof generated.pets[0].name).toBe('string')
});
