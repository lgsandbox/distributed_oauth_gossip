import Gun from "gun/gun";
import { useReducer, useState, useEffect, useContext } from "react";
import {
  Box,
  Center,
  Container,
  VStack,
  Avatar,
  useColorModeValue,
  Textarea,
  Input,
  Spinner
} from '@chakra-ui/react';
import { UserContext } from "../../../lib/context";
import { magic } from "../../../lib/magic";


// initialize gun locally
const gun = Gun({
  peers: [
    'http://localhost:4000/gun'
  ]
})



// create the initial state to hold the messages
const initialState = {
  messages: []
}

// Create a reducer that will update the messages array
function reducer(state, message) {
  return {
    messages: [message, ...state.messages]
  }
}


export default function feed() {
  
  const [user] = useContext(UserContext);
    
  const [formState, setForm] = useState({
     message: ''
  })

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // initialize the reducer & state for holding the messages array

  const [state, dispatch] = useReducer(reducer, initialState)

  function onChange(e) {
    setForm({ ...formState, [e.target.name]: e.target.value  })
  }


// if i need this for functions and can't get around it with context userdata
// move to custom hook and use it in the components instead

  useEffect(() => {

    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn === true) {
        return setIsLoggedIn(true);
      } 
    });
  }, []);


  const messages = gun.get('testdb109')
  useEffect(() => {
    messages.map().once(m => {
      dispatch({
        id: m.id,
        user: m.user,
        message: m.message,
        createdAt: m.createdAt
      })
    })
  }, [messages])

  // everytime messages updates paint the data

// Math.round(Math.random() * 1000000) add id
  // set a new message in gun, update the local state to reset the form field
  function saveMessage() {
    const messages = gun.get('testdb109')
    messages.set({
      id: user?.issuer,
      user: user?.email,
      message: formState.message,

      createdAt: Date().toString()
    })
    setForm({

      message: ''
    })
  }

// second conditional getting hook error

  return (
<div>

        <Container height={50}/>
        {user?.loading ? (<Center><Spinner /></Center>) : ( user?.issuer && (
          <>
          <Center>
          <VStack>
          <div>Welcome {user?.issuer} </div>
          <Container height={50}/>
          <Textarea
            width={800}
            onChange={onChange}
            placeholder="Message"
            name="message"
            value={formState.message}
            />
      
            <button onClick={saveMessage}>Send Message</button>
            <Container height={50}/>
            </VStack>
            </Center>
          </>

          
          ))}


  { 
        state.messages.map((message, index) => (
   
        <div key={index}>
        <Center>
          <Box
            maxW={'800px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'md'}
            p={6}
            overflow={'hidden'}
            >
              <h4>UserID: {message.id}</h4>
              <h2 >message: {message.message}</h2>
              <h3>User(email for now): {message.user} </h3>
              <p>Date: {message.createdAt}</p>
            </Box>
          </Center>
          <Container height={50}/>
        </div>   
        ))}


    <div>
    </div>
    </div>
  )
}
