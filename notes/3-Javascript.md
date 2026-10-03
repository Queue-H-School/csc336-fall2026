# Intro to JavaScript

\- server-side runtime programming language  
\- web browser acts as a runtime environment (built-in interpreter)  
\- loosely typed :(  
\- console program is kept in RAM  
`console.log(str)` prints a string (echo)  
`document.querySelector("h1")` returns the first matching object in HTML doc  
`document.querySelectorAll("h1)` returns a NodeList of all matching objects in document

## Types
<u>Primitive Types</u>  
\- number (integer or float)  
\- boolean  
\- string

<u>Other Types</u>  
\- arrays  
\- objects

<u>Variables</u>  
\- create (local): `let foo = value`  
\- create (local final): `const bar = value`  
\- can initialize without value (undefined)

## Iterating
\- incremented while loop is also possible, of course

**Classic for loop**  
\- my fave
```js
let arr = ["item0", "item1", "item2", "item3"];
for (int x = 0; x < arr.length; x++) {
	console.log(arr[x]);
}
```

**For of loop**  
\- JS equivalent of Java for each
```js
let arr = ["item0", "item1", "item2", "item3"];
for (let item of arr) {
	console.log(item);
}
```

**forEach() call**  
\- JS equivalent of Java lambdas  
\- calls the function once per element
```js
let arr = ["item0", "item1", "item2", "item3"];
arr.forEach(item => console.log(item));

// indexed version
arr.forEach((item, x) => console.log("arr[" + x + "] = " + element));
```

**map() call**  
\- similar to forEach(), but builds a new array
```js
let arr = ["item0", "item1", "item2", "item3"];
let newArr = arr.map(item => item + "!")
```

## Functions

### Common Syntax
**Normal**
```js
function addExclamation(str) {
	return str + "!";
}
```

**Stored in var**
```js
let addExclamation = function(str) {
	return str + "!";
}
```

**Arrow assignment**  
\- what is after arrow gets returned
```js
let addExclamation = (str) => str + "!";
```

### Sort() Overload
\- JS equivalent of Java compareTo()

**Extended**
```js
let arr = [1, 2, 2, 4, 9]
arr.sort = function(a, b) {
	if (a > b) {
		return 1;
	}
	if (a < b) {
		return -1;
	}
	return 0;
}
```

**Condensed**
```js
let arr = [1, 2, 2, 4, 9]
arr.sort((a, b) => a - b);
```

### Event Listeners
\- the browser calls the function  
\- callbacks can get kinda messy if you're not careful

**Named function passed into addEventListener**  
\- can also store it in a var and pass it the same way
```js
let interactiveElement = someFunction(param);
function doAction() {
	console.log("action");
}
interactiveElement.addEventListener(param, doAction);
```

**Pass function anonymously**  
\- browser always passes in an event, we just don't use it here
```js
let interactiveElement = someFunction(param);
interactiveElement.addEventListener(param, event => console.log("action"));

interactiveElement.addEventListener(param, event => {
	// use braces for multiple lines;
	console.log("action");
});
```
## Classes
