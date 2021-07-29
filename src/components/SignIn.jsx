import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../assets/variable.css';
import auth from '../services/auth.service';
// import { Redirect } from 'react-router'
// async function loginUser(credentials) {
//   return fetch('http://localhost:8083/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   })
//     .then(data => data.json())
// }

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  // const [login, setlogin] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await auth({
        user: {
          username,
          password
        }
      });
    console.log('token',token)
    // loginUser({
    //   user: {
    //     username,
    //     password
    //   }
    // });
    setToken(token);
    // setlogin(true);
  }

  // if(login) return <Redirect to='/'/>;
  // else 
  return (
    <div className="login-wrapper">
      <h1>App Platform</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">LOGIN</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};