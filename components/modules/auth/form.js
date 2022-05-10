import { useState } from 'react';
import { Input, Button } from '@chakra-ui/react';

const EmailForm = ({ onEmailSubmit, disabled }) => {

  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onEmailSubmit(email);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 className='form-header'>Login</h3>
        <div className='input-wrapper'>
          <Input
            placeholder='Enter your email'
            size='sm'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
        </div>
        <div>
          <Button

            color='primary'
            size='sm'
            disabled={disabled}
            onClick={handleSubmit}
          >
            Log In / Sign Up
          </Button>
        </div>
      </form>
    </>
  );
};

export default EmailForm;