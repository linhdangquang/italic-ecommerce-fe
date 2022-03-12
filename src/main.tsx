import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

type User = {
  name: string;
  status: string;
  age: number;
};
const user: User = {
  name: 'Vite',
  status: '💪',
  age: 1.5,
};
function UserInfo({ name, status, age }: User) {
  return (
    <div className="mx-auto bg-rose-300">
      <p>{name}</p>
      <p>{status}</p>
      <p>{age}</p>
    </div>
  );
}

ReactDOM.render(
  <div>
    <UserInfo name={user.name} status={user.status} age={user.age} />
  </div>,
  document.querySelector('#root')
);
