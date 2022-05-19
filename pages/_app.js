import { GlobalStyle } from "../styles/global.styles";
import { ChakraProvider } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { UserContext } from '../lib/context';
import Router from 'next/router';
import { magic } from '../lib/magic';

function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState();

  // If isLoggedIn is true, set the UserContext with user data
  // Otherwise, redirect to /login and set UserContext to { user: null }
  // this puts auth in the global state and allows us to protect routes
  // dynamically anywhere in our application with magic

  useEffect(() => {
    setUser({ loading: true });
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        magic.user.getMetadata().then((userData) => setUser(userData));
      } else {
        Router.push('/');
        setUser({ user: null });
      }
    });
  }, []);

  return (

    <UserContext.Provider value={[user, setUser]}>
        <ChakraProvider>
          <Component {...pageProps} />
          <GlobalStyle/>
        </ChakraProvider>
      </UserContext.Provider>
      

  )
} 

export default MyApp