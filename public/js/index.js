import '@babel/polyfill';
import { addBlog } from './addCode.js';

const codeForm = document.querySelector('.form-add-blog');
console.log(codeForm);
console.log(addBlog);

if (codeForm) {
  codeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Hiiii');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const content = document.getElementById('content').value;
    addBlog(name, email, title, description, content);
  });
}
