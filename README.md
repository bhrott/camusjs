# camusjs
A extensible random objects generator

## What is this?
You can translate templates into objects with full random objects.

This:

```json
{
	"name": {
		"*": "name"
	},
	"age": {
		"*": "integer",
		"args": [
			{
				"min": 12,
				"max": 40
			}
		]
	}
}
```

Will generate some like this:

```json
{
  "name": "Jordan Barnes",
  "age": 18
}
```

If you want some more complex:

```json
{
  "name": {
    "*": "name"
  },
  "pets": {
    "*": "array",
    "minLength": 1,
    "maxLength": 3,
    "types": [
      {
				"chanceToAppear": 80,
				"definition": {
					"*": "object",
					"definition": {
						"name": {
							"*": "first"
						},
						"type": "Dog"
					}
				}
			},
			{
				"chanceToAppear": 20,
				"definition": {
					"*": "object",
					"definition": {
						"name": {
							"*": "first"
						},
						"type": "Cat"
					}
				}
			}
    ]
  }
}
```

It will generate a person, with a name and 1 to 3 pets. Each pet has a name and type. Dogs has 80% of chance to appear. Cats, 20%.

The result is some like this:

```json
{
    "name": "Alvin Ramsey",
    "pets": [
        {
            "name": "Jane",
            "type": "Dog"
        },
        {
            "name": "Harry",
            "type": "Dog"
        },
        {
            "name": "Ina",
            "type": "Cat"
        }
    ]
}
```

## How can i use this?

You can build a json with templates. Any property of your json you want to generate is a template.

The templates has the following format:

```json
{
  "myProperty": {
    "*": "type of the generator"
  }
}
```

### ChanceJS

![chancejs](http://chancejs.com/logo.png)

You can use any **CHANCE JS**([VIEW HERE](http://chancejs.com/)) method to generate values.

Let me show you a sample: The method [guid](http://chancejs.com/#guid):

```js
chance.guid();
// 'f0d8368d-85e2-54fb-73c4-2d60374295e3'
```

You can add to your templates using:

```json
{
  "id": {
    "*": "guid"
  }
}
```

And that's it!

If the function you want to call has arguments:

```js
chance.integer({min: 1, max: 10});
// -7
```

```json
{
  "myRandomInt": {
    "*": "integer",
    "args": [
      { "min": 1, "max": 10 }
    ]
  }
}
```
