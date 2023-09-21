import React, { useState, useEffect } from 'react';
import Gallery from "./pages/Gallery"
import Login from './pages/Login';
import {onAuthStateChanged, signOut} from 'firebase/auth'
import { auth } from './firebase';


function App() {
  const [authUser, setAuthUser] = useState(null);

  // const signUserOut = () => {
  //   if (authUser) {
  //     signOut(auth).then(() => {
  //       console.log("user signed out");
  //     }).catch((error) => {
  //       console.log(error);
  //     })
  //   }
  // }

  // signUserOut();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user)
      }
    })

    return () => {
      listen();
    }
  }, []);
  return (
    <>
    {authUser ? <Gallery/> : <Login />}
    </>
  );
}

export default App;
