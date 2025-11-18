# Namaste Javascript

## Ep-01 : How Javascript Works

**Execution Context** : Everything in JS works inside th execution context. It looks like:

| Variable Environment(Memory)   |       Thread of Execution(Code) |
| :----------------------------- | ------------------------------: |
| Stores variables and functions | Executes the code synchronously |
| Key : Value                    |                            Code |
| a = 10                         |                            Code |
| fn{}                           |                            Code |

- ### **Javascript is a synchronous single-threaded language**

## Ep-02 : How JS Code is executed?

take example:

```
1 var n = 2;
2 function square(num){
3     var ans = num*num;
4     return ans;
5 }
6 var square2 = square(n);
7 var square4 = square(4);
```

- **Global Execution Context** (GEC) is created with Memory and Code component
- In phase 1: **Memory Creation phase**

  - Memory is allocated to all the variables and functions
  - For variables: undefined
  - For functions: code (copies the whole code in variable env)
  - n: undefined
  - square: {...code}
  - square2: undefined
  - square4: undefined

- In phase 2: **Code Execution phase**
  - All code is executed line-by-line and performs all calculations and functions
  - Line 1, Places the actual value of n in the memory
  - Skips the function code from line 2-5
  - At line 6, it reads the sum fn, and can't assign a value to it directly, like other vars

| Variable Environment(Memory) |       Thread of Execution(Code) |
| :--------------------------- | ------------------------------: |
| n: undefined                 | Executes the code synchronously |
| square: {... code}           |       Execution Context for sum |
| square2: undefined           |                            Code |
| square4: undefined           |                            Code |

- Inside the Execution context created for sum function in Code component:
  - Jump to line 2
  - It creates a new exceution context for that invoked function in the thread of execution and it will have its own variable memeory and thread of execution
  - Inside new execution context memory component, ans and num variables are added
  - Value of num inside EC-2 will be **passed from GEC**, i.e. num = 2
  - In its code component, it will calculate value for ans by **ans=num\*num** and assign it to ans, replacing undefined
  - At line 4, it sees return
  - Return means return the control back to the execution context from where the function was invoked
  - So it returns the control to line 6 (where fun was invoked)
  - Having **ans = 4** it will replace the undefined for square2 in EC-1
  - Now it has returned the control to the original function invokation code line, EC-2 will be removed from the EC-1
  - At line 7, it wil again create a new exceution context for square fn.
- Eventually, after whole program is run, the global execution context is also deleted

### Call Stack:

- At the bottom, it has the Global Execution Context, on top of which the other EC are created and pushed to stack
- _It maintains the order of execution of execution contexts_

## Ep-03 : Hoisting

Even before the code starts executing, memory is allocated to all the vars and fns

- This is why JS won't throw an error even if I try to use a var before it is being declared in the code
- For a function, it simply returns the function code for arrow functions and function value for other functions

## Ep-04 : Functions

Functions are added in the call stack on the top of GEC after they are invoked.

- Each function has its own execution context and memory + code component. \
  So even using same variable names in a function scope and in global scope won't throw an error because its scope will be limited to its EC and will finish as the control returns back to where the fun was invoked after the fun is completely executed.
- After executing, for a function, its:
  - EC is deleted,
  - memory is freed,
  - erased from call stack

## Ep-05 : Shortest JS Program

An empty js file can act as the shortest JS program. \
Even without any line of code -

- It creates the GEC and sets up the memory space as well.
- It creates a window object and a this pointer to it everytime.
- When a JS environment starts running:
  - It sets up the runtime (JS engine + environment features)
  - In Browser, it is:
    - V8 JavaScript engine (Chrome)
    - DOM + Web APIs (provided by browser)
  - The global object is created first and it becomes accessible everywhere
  - It stores global APIs, functions, and environment features
  - Then JS engine executes our script inside this global context.

### **var** vs **const / let**

---

| var                                         | const/let                                                                                                                      |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| var is older                                | const/let introduced in ES6                                                                                                    |
| polluted the global namespace               | not hoisted in same messy way and not polluting global object                                                                  |
| mistakenly shows up in global window object | stored inside Declarative Environment Record                                                                                   |
| **function-scoped**, not block-scoped       | block-scoped live in lexical environment                                                                                       |
| automatically attached to the global object | create global variables, but not global properties - Means they ARE accessible everywhere but they DO NOT appear inside window |
| hoisted and accessible anywhere             | hoisted, but can't be used before initializing the value                                                                       |

## Ep-06

### **undefined** vs **not defined**

---

- undefined is a special keyword acts like a placeholder
- used to say - This variable exists, but no value has been assigned to it
- represents absence of a value
- undefined doesn't mean empty - it takes up its own memory
- needed because :
  - placeholder for variables that don't have a value yet
  - functions in JS must return something, if it is not, undefined is used
    ```
    function foo() {}
    foo(); // returns undefined
    ```
- avoid assigning undefined to a variable because won't be able to differentiate whether the value of that var never existed, or was it explicitly assigned as undefined
- it is a global property that cannot be overwritten

- not defined just means the var was never declared/created, but are trying to access it

## Ep-07 : Lexical environment and scope chain

**Lexical env** : Local memory + lexical env of parent

- In each function memory space, a reference to lexical en of parent also exists
- A function can have access to its own local memory and the lexical env of its parent (and consequently parent of parent)

**Scope Chain** : Chain of all lexical environments in hierarchical order

## Ep-08 : let & const and Temporal Dead Zone

**Temporal Dead Zone**:

- The period between when a variable is declared (in memory), and when its initialized with value
- This prevents bugs caused by accidentally using variables before they are ready
- Trying to access a variable inside TDZ gives _ReferenceError_
  ```
  console.log(a);
  let a = 2;
  ```
- Till the time control doesn't reach line 2, "a" is present in the memory, but is not initialized, hence it is in TDZ.

let and const :

- Not attached to window object
- Hoisted, but not accessible unless initialized
- present in TDZ meanwhile till initialization
- let can be initialized and declred separately
- const is more strict than let in the sense that it has to be initialized as soon as it is declared
- var can be declared/initialized anywhere
- var is function-scoped, can't access a var declared inside a function, outside its scope

| ReferenceError                                               | SyntaxError                                                         | TypeError                               |
| ------------------------------------------------------------ | ------------------------------------------------------------------- | --------------------------------------- |
| Trying to find a value which is not present in current scope | Redeclaration of let or const variables or not initializing a const | Assigning value to const variable again |

## Ep-09 : Block Scope & Shadowing

**Block** is used where we want to group multiple statements in JS. \
**Block Scope** defines what variables and functions can be accessed inside that block.

- _let_ & _const_ are block-scoped - Can't be accessed outside the block
- _var_ is in global scope

**Scopes** -

- Global : _var_ exists here
- Block : _let_ and _const_
- Script : _global let_ and _const_ (outside the block and outside all functions)
- Function : var is function scoped. variables inside function execution context

**Shadowing** -

- var with same name inside and outside a block are overwritten by the one that comes later, as they are in global scope
- let and const are shadowed but they retain their value in global scope, and have the block value in block scope.

**Illegal Shadowing** -

- let can't be shadowed using var
- let can be shadowed using let
- but var can be shadowed by let - because it doesn't cross the function scope or boundary

## Ep-10 : Closures

**Closure** : function + its lexical environment

- When a function returns an inner function
- Closure is created when inner function remembers variables from its outer function even after outer one has finished executing
- A function forms a closure with the scope where it is declared,
not with the scope where it is invoked.
- Uses of closures:
  - async programming
  - callbacks
  - event handlers
  - private variables
  - React hooks
  - currying
  - memoization
  - functional programming
  - Module design pattern
  - functions like once
  - setTimeouts
  - Iterators
## Ep-10 : Closures

## Ep-10 : Closures
## Ep-10 : Closures


## Ep-13 : First Class and Anonymous functions

#### **Function Statement or Declaration**

Creating a function in this way is a function statement

```
function a(){
    console.log("This is fun statement");
}
//can be hoisted
a();
```

#### **Function Expression**

Assigning a function to a variable, where the function acts like a value

```
var b = function(){
    console.log("Function Expression");
}
//hoisting will throw an error
b();
```

| Function Statement                 | Function Expression                                                                                |
| ---------------------------------- | -------------------------------------------------------------------------------------------------- |
| Normal function with a name        | Assigning a function to a variable                                                                 |
| fun a() {}                         | var b = fun(){}                                                                                    |
| Called by a();                     | Called by b();                                                                                     |
| Hoisting supported                 | Hoisting throws error                                                                              |
| fun code is stored in memory of EC | only var value is stored as undefined in memory of EC                                              |
| Hoisting will work expectedly      | Hoisting like b(); will say typeError (doesn't know b stores a function bcoz b is undefined still) |

#### **Anonymous Function**

- Functions without a name
- Can be created when functions are to be used as values assigned to variables

```
var a = function (){
    console.log("Anonymous");
}
```

#### **Named Function Expression**

When named function is assigned to variable

```
var a = function b(){
    console.log("named function expression");
}
```

- variable 'a' can be called like this: `a();`
- function 'b' cannot be called like : `b();`
- because its not present in memory of EC, will throw ReferenceError

#### First Class Functions

- Ability of functions to be used like values
- (either to pass to another function or to be returned from another function)
- Also called **First Class Citizens**
- Passing functions inside other functions as arguments

```
var b = function (fcf){  //passing fn as parameter to another fn b
    console.log(fcf);
}

function xyz(){  //FCF
    console.log("First Class Function");
}

b(xyz); //Calling a fn with fn as argument
```

- We can also return a function from a fn

```
var b = function (param){
    return function xyz(){

    }
}
console.log(b());
```

#### Ep-14 : Callback Functions

- JS is a synchronous single-threaded language
- Passing a function to another function -> passed fn is callback fn

```
setTimeout(function(){
console.log("timer");
}, 3000);

function x(a){
    console.log("x");
    a();
}

x(function y(){
    console.log("y");
}); //pass y inside x
```

- setTimeout is registered
- stored at a separate place, with a timer of 3s attached to it
- Meanwhile, program will remain executing
- x is called
- Prints: 
    - x
    - y
    - timer (after 3s)
- 

Blocking the main thread - Any operation blocking the call stack \
To avoid it, use async operations (like setTimeout) for heavy, time taking tasks 

In the example, it gets out of the call stack and then after the timer expires, it appears again in the call stack and resumes program


#### Event Listeners
- Event listeners can also invoke closures with scope.
- Event listeners consume a lot of memory which can potentially slow down the website therefore it is good practice to remove if it is not used.
- Garbage Collection - need to remove event listeners as they form a lot of closures with the variables in kexical scope, and thus making it heavy

## Ep-15 : Event Loop

1. Firstly, a **Global Execution Context (GEC)** is created.
2. The GEC is pushed into the **Call Stack**.
3. The code runs line-by-line inside the GEC.
4. A new **Execution Context** is created when a function is **invoked**.
5. The function’s Execution Context a() EC is **pushed into the Call Stack**.
6. The function’s code executes **line-by-line inside its own EC**.
7. Data is printed to the console (if any).
8. The function finishes executing (reaches the end of the function).
9. The function’s Execution Context is **popped out of the Call Stack**.
10. The remaining global code (after the function call) **resumes execution**.
11. The last line of the global code executes.
12. The **GEC is popped out of call stack**
---
Call Stack executes whatever is pushed to it **immediately** - doesn't wait for anything.

*But what if we need to wait for something??*

Not possible - call stack executes everything immediately - no waiting (it doesn't have a timer)
 

#### Browser - Superpowers
- Browser -> JS Engine -> call Stack 

Browser contains -
- Local Storage
- JS Engine
- Timer
- url
- fetch - communication to servers
- DOM APIs
- Console
- UI
- Bluetooth
- Geolocation
- etc ...


