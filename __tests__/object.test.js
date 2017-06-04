var camusjs = require('../index')

test('object: nested parser', () => {
	var template = {
		name: {
			'*': 'name'
		},
		pet: {
			'*': 'object',
			chanceToBeNull: 0,
			definition: {
				name: {
					'*': 'name'
				},
				age: {
					'*': 'integer',
					params: {
						min: 1,
						max: 5
					}
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

test('object: ignore all and parse', () => {
	var template = {
		suit: 'spades',
		value: 11
	}

	var generated = camusjs.parse(template)
	expect(JSON.stringify(generated)).toBe(JSON.stringify(template))
});

test('only nested object have parser', () => {
	var template = {
		request: {
			method: 'GET',
			url: {
				"*": "string_replace",
				value: 'http://api/product/%ID%(/.*)?',
				searchFor: '%ID%',
				replaceWith: {
					"*": "guid"
				}
			}
		}
	}

	var generated = camusjs.parse(template)
	expect(typeof template.request.url).toBe('string')
});

test('nested object in natural array', () => {
	var template = {
		store: {
			country: "Brazil",
			itens: [
				{
					"*": "first"
				}
			]
		}
	}

	var generated = camusjs.parse(template)
	expect(template.store.itens.length).toBe(1)
});
