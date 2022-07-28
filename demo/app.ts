import style from './test.css' assert { type: 'css' };
import data from './test.json' assert { type: 'json' };

document.adoptedStyleSheets = [style];

const element = document.createElement('h1');
element.innerText = data.name as string;
element.classList.add('test-element');

document.body.appendChild(element);
