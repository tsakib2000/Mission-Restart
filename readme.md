# JavaScript - কিছু দরকারি প্রশ্নের উত্তর

---

## ১. `null` আর `undefined` এর পার্থক্য কী?

এই দুইটা জিনিস অনেকে গুলিয়ে ফেলেন, কিন্তু আসলে এদের মধ্যে বেশ পার্থক্য আছে।

`undefined` হলো যখন কোনো variable declare করা হয়েছে কিন্তু এখনো কোনো মান দেওয়া হয়নি। JavaScript নিজেই এটা set করে দেয়।

```js
let name;
console.log(name); // undefined — কোনো মান দেইনি
```

আর `null` হলো আমরা নিজেরা ইচ্ছা করে বলছি "এখানে কিছু নেই"। মানে এটা developer এর দেওয়া একটা ইচ্ছাকৃত খালি মান।

```js
let name = null;
console.log(name); // null — আমি নিজেই বলেছি কিছু নেই
```

একটা মজার বিষয় হলো `typeof null` করলে `"object"` আসে, যেটা আসলে JavaScript এর পুরনো একটা bug। আর `typeof undefined` করলে স্বাভাবিকভাবেই `"undefined"` আসে।

সহজ করে বললে — `undefined` মানে "এখনো কিছু হয়নি", আর `null` মানে "আমি জানি এখানে কিছু নেই।"

---

## ২. `map()` কী কাজে লাগে? `forEach()` এর সাথে পার্থক্য কোথায়?

`map()` মূলত ব্যবহার হয় যখন একটা array এর প্রতিটা element নিয়ে কিছু একটা করে **নতুন একটা array বানাতে চাই।**

```js
const numbers = [1, 2, 3];
const result = numbers.map(n => n * 2);
console.log(result); // [2, 4, 6]
```

এখানে `numbers` array টা আগের মতোই আছে, কিন্তু `result` এ নতুন array চলে এসেছে।

`forEach()` ও একইভাবে loop করে, কিন্তু এটা কিছুই return করে না। মানে নতুন array পাওয়ার কোনো উপায় নেই এটা দিয়ে।

```js
const numbers = [1, 2, 3];
numbers.forEach(n => console.log(n * 2)); // শুধু print হয়, নতুন array নেই
```

তাহলে কোনটা কখন ব্যবহার করব?

নতুন array দরকার হলে `map()`, আর শুধু কিছু একটা করতে চাইলে (যেমন DOM update বা console log) সেক্ষেত্রে `forEach()` ঠিকঠাক।

---

## ৩. `==` আর `===` এর পার্থক্য কী?

`==` দিয়ে compare করলে JavaScript আগে দুইটা value এর type এক করার চেষ্টা করে, তারপর তুলনা করে। এটাকে বলে type coercion।

```js
console.log(5 == "5");   // true, কারণ JS string কে number বানিয়ে নিয়েছে
console.log(0 == false); // true
```

কিন্তু `===` একদম কড়া। মান আর type দুইটাই হুবহু মিলতে হবে, নাহলে false।

```js
console.log(5 === "5");   // false, type আলাদা
console.log(0 === false); // false
console.log(5 === 5);     // true
```

বেশিরভাগ ক্ষেত্রে `==` ব্যবহার করলে unexpected result আসতে পারে। তাই সবসময় `===` ব্যবহার করাটাই ভালো অভ্যাস।

---

## ৪. API fetch করতে `async/await` কেন দরকার?

JavaScript একটাই thread এ কাজ করে। তো যখন আমরা API call করি, সেটা সময় নেয় — নেটওয়ার্ক slow হতে পারে, server দেরি করতে পারে। এই সময়ে যদি JavaScript বসে থাকে তাহলে পুরো page freeze হয়ে যাবে।

এই সমস্যার জন্যই আসে asynchronous programming। আগে এটা `.then()` দিয়ে করতে হতো —

```js
fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

কাজ হয়, কিন্তু অনেক `.then()` chain হলে পড়তে কষ্ট হয়।

`async/await` এটাকে অনেক সহজ করে দিয়েছে —

```js
const getProducts = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
```

`await` মানে "এই line এর কাজ শেষ না হওয়া পর্যন্ত পরের line এ যাবো না।" এতে করে কোড দেখতে সাধারণ synchronous কোড এর মতো লাগে, কিন্তু আসলে সব ঠিকঠাক asynchronously কাজ করে।

`try/catch` দিয়ে error handle করাটাও অনেক সুবিধাজনক হয়।

---

## ৫. JavaScript এ Scope বলতে কী বোঝায়?

Scope মানে সহজ ভাষায় — কোনো variable টা কোথায় কোথায় চেনা যাবে।

### Global Scope

কোনো function বা block এর বাইরে যা declare করা হয়, সেটা global। যেকোনো জায়গা থেকে access করা যায়।

```js
const city = "Dhaka";

function show() {
  console.log(city); // কাজ করবে
}

show();
console.log(city); // এটাও কাজ করবে
```

### Function Scope

কোনো function এর ভেতরে declare করা variable বাইরে থেকে দেখা যায় না।

```js
function greet() {
  const msg = "হ্যালো!";
  console.log(msg); // ঠিক আছে
}

greet();
console.log(msg); // Error! এটা function এর বাইরে নেই
```

### Block Scope

`if`, `for`, `while` এসবের `{}` এর ভেতরে `let` বা `const` দিয়ে declare করলে সেটা শুধু সেই block এর মধ্যেই থাকে।

```js
if (true) {
  let score = 100;
  console.log(score); // ঠিক আছে
}

console.log(score); // Error! block শেষ হয়ে গেছে
```

একটা কথা মনে রাখা দরকার — `var` দিয়ে declare করলে block scope কাজ করে না, function scope কাজ করে। এই কারণে `var` এখন আর তেমন ব্যবহার করা হয় না। `let` আর `const` ব্যবহার করাই এখনকার standard।