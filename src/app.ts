export {}
console.log('Hello World');


function sum(a: number, b: number): number {
  return a + b;
}
console.log(sum(1, 2))

interface User {
  name: string;
  age: number;
}

const user1: User = {
  name: 'John',
  age: 18,
}
console.log(user1)


const myObj:{name: string, age: number} = { name: 'John', age: 30 };
console.log(myObj);