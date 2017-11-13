var camusjs = require('../index')

test('generating 2 templates in loop dont modify original template', () => {
    const expected = [{ name: 'Jaspion' }, { name: 'Kamen Rider' }]

    const template = {
        name: {
            '*': 'option_value',
            property: 'name'
        }
    }

    const data = [{ name: 'Jaspion' }, { name: 'Kamen Rider' }]

    let result = []

    data.forEach(item => {
        result.push(camusjs.parse(template, item))
    })

    expect(JSON.stringify(expected)).toBe(JSON.stringify(result))
})
