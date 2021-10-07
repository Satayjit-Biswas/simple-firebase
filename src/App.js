
import {getAuth, signInWithPopup, GoogleAuthProvider,GithubAuthProvider , signOut } from 'firebase/auth'
import './App.css';
import React, { useEffect, useState } from 'react';
import initializeAppAuthentication from './Firebase/Firebase.initialize';

const googleprovider = new GoogleAuthProvider();
const gitprovider = new GithubAuthProvider();

initializeAppAuthentication();
function App() {
  const [loginuser,setLoginuser] = useState({})
  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth , googleprovider)
    .then((result) => {
        const googleloginuser = result.user;
        const {displayName,email,photoURL} = googleloginuser ;
        const loginuserinfo = {
          name:displayName,
          email:email,
          url:photoURL
        };
        setLoginuser(loginuserinfo)
      })
      .catch(error => {
        console.log(error.message)
      })
  }
  const handleGitSignIn=() =>{
    const auth = getAuth();
  signInWithPopup(auth, gitprovider)
    .then((result) => {
      const gitloginuser = result.user;
      const {displayName,email,photoURL} = gitloginuser ;
      const loginuserinfo = {
        name:displayName,
        email:email,
        url:photoURL
      };
      setLoginuser(loginuserinfo)
    });
  }
  const logOut= ()=>{
    const auth = getAuth();
    signOut(auth).then(() =>{
      setLoginuser({})
    })
  }
  return (
    <div className="App">
      { !loginuser.name ?
        <div>
          <button onClick = { handleGoogleSignIn} >Google Sign in</button>
          <button onClick = { handleGitSignIn} >github Sign in</button>
        </div>
      :
      <button onClick = { logOut} >Log Out</button>
      }
      {loginuser.email && <div><h2>Welcome {loginuser.name}</h2>
      <img src={loginuser.url} alt="" />
      <h4>Email : {loginuser.email}</h4>
      </div>}
    </div>
  );
}

export default App;
