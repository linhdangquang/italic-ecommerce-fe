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
