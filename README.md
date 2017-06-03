# camusjs
A extensible random objects generator

![camusjs](camusjs_logo.png?raw=true "camusjs")

## What is this?
You can translate templates into objects with full random objects.

This:

```js
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

```js
{
    "name": "Jordan Barnes",
    "age": 18
}
```

If you want some more complex:

```js
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

```js
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

First, install it: `npm install camusjs`

```js
var camusjs = require('camusjs')

var myTemplate = {
  "myProperty": {
    "*": "type of the generator"
  }
}

var generated = camusjs.parse(myTemplate)

// done
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

```js
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

```js
{
  "myRandomInt": {
    "*": "integer",
    "args": [
      { "min": 1, "max": 10 }
    ]
  }
}
```

### Nested Objects

If you want to generate nested objects, use the `object` template:

```js
{
    "name": {
        "*": "name"
    },
    "job": {
        "*": "object",
        "definition": {
            "title": {
                "*": "pickone",
                "args": [
                    ["developer", "qa", "manager"]
                ]
            }
        }
    }
}
```

It will generate some like this:

```js
{
	"name": "Andre Ortega",
	"job": {
		"title": "developer"
	}
}
```

### Array

If you want a collection of objects, use the `array` template:

```js
{
	"myArray": {
		"*": "array",
		"minLength": 2, // the minimum size of the array
		"maxLength": 6, // the maximum size of the array
		"types": [ // the types of content of the array
			{
				// if you have multimple types of templates in the array,
				// set the percentage of the template appear.
				"chanceToAppear": 90,
				"definition": { // you can use template here.
					"*": "object",
					"definition": {
						"myPropName": {
							"*": "name"
						}
					}
				}
			},
			{
				"chanceToAppear": 10,
				"definition": {
					"*": "integer"
				}
			}
		]
	}
}
```

In this sample, we generate an array with misc objects and numbers. The result must be some like this:

```js
{
	"myArray": [
		{
			"myPropName": "Georgie Patterson"
		},
		6303461331173376,
		{
			"myPropName": "Anne Jefferson"
		},
		{
			"myPropName": "Lucinda Jordan"
		}
	]
}
```

### Allowing NULLS

If you want to some template returns `null` in some case, use the `chanceToBeNull` modifier:

```js
{
	"id": {
		"*": "guid",
		"chanceToBeNull": 15 // in this case, 15% of the times, the id will returns null.
	}
}
```

All templates accept this modifier =).

### Using static values

You can use fixed informed values using the `option_value` and `options`:

```js
var template = {
	id: {
		"*": "option_value",
		property: 'myId'
	}
}

var generated = camusjs.parse(template, {
	myId: 'abc123'
})
```

## Advanced

### Adding new Parsers
You can create parsers and append them to the core. For this, create the following:

```js
var camusjs = require('camusjs')

var newParser = {
	"*": "my_name_of_generator",
	converter: function(template, options) {
		// return your value...
		return null
	}
}

camusjs.registerParser(newParser)
```

Now you can use:

```js
{
	"myProperty": {
		"*": "my_name_of_generator"
	}
}
```

### Adding new middlewares

Middlewares are parsers that runs BEFORE the registered parsers (`chanceToBeNull` is a middleware).

You can register new middlewares:

```js
var camusjs = require('camusjs')

var myMiddleware = {
	'#': 'name_of_my_middleware',
	isGlobal: true, // if must run before ALL transformers
	converter: function(template, options, result) {
		// do what you want here
		var newValue = {} // my new value
		var mustContinue = true //must execute the next middleware or stops here and return value

		result(newValue, mustContinue)
	}
}

camusjs.registerMiddleware(myMiddleware)
```

For localized middlewares, you can set `isGlobal` to false and add it manually to your parsers:

```js
var camusjs = require('camusjs')

var myMiddleware = {
	'#': 'name_of_my_middleware',
	isGlobal: false, // if must run before ALL transformers
	converter: function(template, options, result) {
		// do what you want here
		var newValue = {} // my new value
		var mustContinue = true //must execute the next middleware or stops here and return value

		result(newValue, mustContinue)
	}
}

camusjs.registerMiddleware(myMiddleware)

var newParser = {
	"*": "my_name_of_generator",
	middlewares: ['name_of_my_middleware'],
	converter: function(template, options) {
		// return your value...
		return null
	}
}

camusjs.registerParser(newParser)
```

## Changelog

### 1.1.0: First Release
