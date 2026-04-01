1️⃣ What is the difference between var, let, and const?
ans: In JavaScript, let and const are block-scoped and have a Temporal Dead Zone, so accessing them before declaration causes a ReferenceError, unlike var which is function-scoped and hoisted as undefined. const allows mutating objects/arrays but not reassignment. In loops, var shares the same binding, so async callbacks print the same value, while let creates a new binding per iteration. Nested var respects function scope, e.g., inner variables don’t affect outer ones.

2️⃣ What is the spread operator (...)?
ans:The spread operator ... in JavaScript expands an array or object into individual elements or properties. It’s used to copy or merge arrays/objects, e.g., [...arr1, 4] or {...obj1, c:3}, and to pass array elements as function arguments like Math.max(...nums). Note that it creates a shallow copy, so nested objects are still referenced.

3️⃣ What is the difference between map(), filter(), and forEach()?
ans: map(), filter(), and forEach() are array methods in JavaScript. map() transforms each element and returns a new array, filter() returns a new array with elements that pass a condition, and forEach() executes a function on each element but returns nothing. Use map or filter when you need a new array, and forEach for side effects like logging.

4️⃣ What is an arrow function?
ans: An arrow function is a shorter syntax for writing functions in JavaScript using =>. It doesn’t have its own this, making it useful for callbacks. Example: const add = (a, b) => a + b; returns the sum of a and b.

5️⃣ What are template literals?
ans: Template literals are backtick () strings that allow embedding variables or expressions using ${...}and support multiline text. For example, `Hello, ${name}dynamically inserts name` without concatenation.