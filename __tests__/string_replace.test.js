var camusjs = require('../index')

test('replacing url', () => {
	var template = {
		url: {
			"*": "string_replace",
			value: 'http://api/autenticacao/%CPF%(/.*)?',
			searchFor: '%CPF%',
			replaceWith: {
				"*": "option_value",
				property: "cpf"
			}
		}
	}

	var generated = camusjs.parse(template, {
		cpf: '00011122244'
	})

	expect(generated.url).toBe('http://api/autenticacao/00011122244(/.*)?')
});
