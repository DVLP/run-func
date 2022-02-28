# run-func
Run exported JavaScript functions directly from command line

# Installation globally

`npm i -g run-func`

## Usage from CLI

`run-func script.js functionName param1 param2`

# Installation locally

`npm i -S run-func`

## Usage in package.json

`"scripts": {
  "myFunc": "run-func script.js myFunc param1 param2"
}`

### With other node modules

```
"scripts": {
  "test": "run-func some-module myFunc \"string as parameter\""
},
"dependencies": {
  "some-module": "1.0.0"
}
```

# 4GB node flag

`run-func-mem` instead of `run-func`
