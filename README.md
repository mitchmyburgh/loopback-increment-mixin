# loopback-increment-mixin

Increments number properties of models by a specified number.

## NOTE
This mixin currently doesn't work for bulk inserted values, even though it will return an updated count the actual value will be unchanged.

## Usage

Inside your `./common/models/{modelname}.json` insert the following lines:
```json
"mixins": {
  "Increment": {
    "properties": ["count", "count2"]
  }
},
```

Then when updating a model the value you pass to the `count` and `count2` properties will increase (or decrease - negative numbers also work) the value the server has for `count` and `count2` for that instance.
