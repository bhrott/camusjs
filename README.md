# camusjs
A extensible random objects generator

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
