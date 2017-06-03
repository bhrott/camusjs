# camusjs
A extensible random objects generator

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

You can build a json with templates. Any property of your json you want to generate is a template.

The templates has the following format:

```js
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
				// if you have multimple tipes of templates in the array,
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
