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
})

test('full request object with options', () => {
	var template = {
		"priority": 1,
		"request": {
			"method": "POST",
			"urlPathPattern": {
				"*": "string_replace",
				"value": "/api/auth/%CPF%(/.*)?",
				"searchFor": "%CPF%",
				"replaceWith": {
					"*": "option_value",
					"property": "cpf"
				}
			}
		},
		"response": {
			"status": 200,
			"headers": {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json"
			},
			"jsonBody": {
				"access_token": {
					"*": "option_value",
					"property": "access_token_auth_cpf"
				},
				"hash": {
					"*": "option_value",
					"property": "hash_cpf"
				},
				"nomeCliente": {
					"*": "option_value",
					"property": "primeiro_nome"
				},
				"statusIdentificacao": "20",
				"token_type": "Bearer"
			}
		}
	}

	var generated = camusjs.parse(template, {
		cpf: '00011122233',
		access_token_auth_cpf: 'abc123',
		hash_cpf: 'qweasd',
		primeiro_nome: 'ben-hur'
	})

	var expected = {
		"priority": 1,
		"request": {
			"method": "POST",
			"urlPathPattern": "/api/auth/00011122233(/.*)?"
		},
		"response": {
			"status": 200,
			"headers": {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json"
			},
			"jsonBody": {
				"access_token": "abc123",
				"hash": "qweasd",
				"nomeCliente": "ben-hur",
				"statusIdentificacao": "20",
				"token_type": "Bearer"
			}
		}
	}

	expect(JSON.stringify(generated)).toBe(JSON.stringify(expected))
})


test('null wont result in exception', () => {
	var template = {
		store: {
			country: null,
			itens: [
				{
					"*": "first"
				}
			]
		}
	}

	var generated = camusjs.parse(template)
	expect(template.store.itens.length).toBe(1)
})
