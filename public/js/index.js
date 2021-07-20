import '@babel/polyfill';
import { addBlog } from './addCode.js';

const codeForm = document.querySelector('.form-add-blog');

if (codeForm) {
  codeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const content = document.getElementById('content').value;
    addBlog(name, email, title, description, content);
  });
}
