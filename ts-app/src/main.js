"use strict";
exports.__esModule = true;
require("./style.css");
var app = document.querySelector('#app');
app.innerHTML = "<h1>Hello World!</h1>";
// sum a + b
function sum(a, b) {
    return a + b;
}
console.log(sum(1, 2));
var getUsers = function (users) {
    console.log(users.map(function (user) { return user.name; }));
    return users.map(function (user) { return user.name; });
};
getUsers([{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]);
