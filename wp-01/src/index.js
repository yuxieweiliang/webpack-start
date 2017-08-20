import './style.css';
import './main1';
import './main2';
import printMe from './print.js';

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = 'Hello webpack';
  btn.innerHTML = 'Click me and check the console!';
  element.classList.add('hello');

  btn.onclick = printMe;
  _.map([1, 2, '3', '4', '5', '6' ], item => console.log(item));
  element.appendChild(btn);
  return element;
}

document.body.appendChild(component());