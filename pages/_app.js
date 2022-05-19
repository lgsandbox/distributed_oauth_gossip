import { GlobalStyle } from "../styles/global.styles";
import { ChakraProvider } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { UserContext } from '../lib/context';
import Router from 'next/router';
import { magic } from '../lib/magic';

function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState();

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