import { useState, useEffect, useContext } from 'react';
import Router from 'next/router';
import { magic } from '../../../lib/magic';
import { UserContext } from '../../../lib/context';
import { Input, Button } from '@chakra-ui/react';
import EmailForm from './form';

function Login(){
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useContext(UserContext);


  // Redirect to /dashboard if thde user is logged in

  async function handleLoginWithEmail(email) {
    try {

      // disable login button to prevent multiple emails from being triggered

      setDisabled(true); 

      // Trigger Magic link to be sent to user

      let didToken = await magic.auth.loginWithMagicLink({
        email,
        redirectURI: new URL('/dashboard', window.location.origin).href, // optional redirect back to your app after magic link is clicked
      });

      // Validate didToken with server

      const res = await fetch('/api/magic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
      });

      if (res.status === 200) {

        // Set the UserContext to the now logged in user

        let userMetadata = await magic.user.getMetadata();
        await setUser(userMetadata);
        Router.push('/dashboard');
      }
    } catch (error) {
      setDisabled(false); // re-enable login button - user may have requested to edit their email
    }
  }

  async function handleLoginWithSocial(provider) {
    await magic.oauth.loginWithRedirect({
      provider, // google, apple, etc
      redirectURI: new URL('/callback', window.location.origin).href, // required redirect to finish social login
    });
  }

  return (
    <div className='login'>
      <EmailForm disabled={disabled} onEmailSubmit={handleLoginWithEmail} />
    </div>
  );};


  export default Login