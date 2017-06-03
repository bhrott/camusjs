var camusjs = require('./index')

var generated = camusjs.parse({
	name: {
		'*': 'full_name'
	},
	pet: {
		'*': 'object',
		chanceToBeNull: 5,
		definition: {
			name: {
				'*': 'full_name'
			},
			age: {
				'*': 'int',
				min: 1,
				max: 5
			}
		}
	}
})

console.log(JSON.stringify(generated, null, 4))
