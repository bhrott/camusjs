var camusjs = require('../index')

test('gen int: 1 to 10', () => {
	var template = {
		name: {
			'*': 'full_name'
		},
		pet: {
			'*': 'object',
			chanceToBeNull: 0,
			definition: {
				name: {
					'*': 'full_name'
				},
				age: {
					'*': 'int',
					min: 1,
					max: 5
				},
				foodTime: {
					'*': 'object',
					chanceToBeNull: 0,
					definition: {
						morning: 9,
						afternoon: 14,
						night: 19
					}
				}
			}
		}
	}

	var generated = camusjs.parse(template)
	expect(typeof generated.name).toBe('string')
	expect(typeof generated.pet).toBe('object')
	expect(typeof generated.pet.name).toBe('string')
	expect(generated.pet.foodTime.afternoon).toBe(14)
});
