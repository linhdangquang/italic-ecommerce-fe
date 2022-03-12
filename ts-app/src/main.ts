import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = `<h1>Hello World!</h1>`

// sum a + b
function sum(a: number, b: number): number {
  return a + b
}

console.log(sum(1, 2))
// const name: string = 'John';
// const age: number = 30;
// const status: boolean = true;
// const myObj: object = {};
// const myArr: number[] = [1, 2, 3];
// const stringArr: string[] = ['a', 'b', 'c'];
// const objectArr: object[] = [{}, {}];

type User = {
  name: string,
  age: number,
}

const getUsers = <T extends User>(users: T[]) => {
  console.log(users.map(user => user.name))
  return users.map(user => user.name)
}

getUsers([{name: 'John', age: 30}, {name: 'Jane', age: 25}])