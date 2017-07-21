import './style.css';
import printMe from './print.js';
import map from'lodash/map'
function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML = 'Hello webpack';
  btn.innerHTML = 'Click me and check the console!';
  element.classList.add('hello');

  btn.onclick = printMe;

  map([1,2,3,4], item => {
    console.log(item)
  });
  element.appendChild(btn);
  return element;
}

document.body.appendChild(component());