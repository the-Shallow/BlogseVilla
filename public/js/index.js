import '@babel/polyfill';
import '@editorjs/editorjs'
import { addBlog } from './addCode.js';
import { login, logout } from './login';
import { signup } from './signup';
import { editor } from './editor';

const codeForm = document.querySelector('.form-add-blog');
const signupForm = document.querySelector('.form--signup');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.btn-logout');

if (codeForm) {
  codeForm.addEventListener('submit',async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    // const content = document.getElementById('content').value;
    const res = await editor.save();
    console.log(res);
    const content = stringify(res);
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

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

const stringify = (data) => {
  const val = data.blocks.map(el =>  el.type + "-" + (el.data.text||el.data.url));
  return val;
}