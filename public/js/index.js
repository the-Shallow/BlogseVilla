import '@babel/polyfill';
import { addBlog } from './addCode.js';
import { signup } from './signup';

const codeForm = document.querySelector('.form-add-blog');
const signupForm = document.querySelector('.form--signup');

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

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    console.log(name, email, password, passwordConfirm);
    signup(name, email, password, passwordConfirm);
  });
}
