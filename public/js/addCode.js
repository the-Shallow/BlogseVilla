/* eslint-disable */
import axios from 'axios';

export const addBlog = async (name, email, title, description, content) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/blog',
      data: {
        name,
        email,
        title,
        description,
        content,
      },
    });

    if (res.data.status === 'success') {
      console.log('Logged in Successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    console.log(err);
  }
};
