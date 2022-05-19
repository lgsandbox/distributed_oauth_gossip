import Gun from "gun/gun";
import { useReducer, useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  VStack,
  useColorModeValue,
  Textarea,
  IconButton,
  Spinner
} from '@chakra-ui/react';
import { UserContext } from "../../../lib/context";

// initialize gun locally
const gun = Gun({
  peers: [
    'http://localhost:4000/gun',
   
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


export default function GlobalFeed() {
  
  const [user] = useContext(UserContext);

  const [state, dispatch] = useReducer(reducer, initialState)

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

  return (
<div>
    <Container height={50}/>
        {user?.loading ? (<Center><Spinner /></Center>) : (
          <>
          <Center>
            <VStack>
              <div>Welcome {user?.email} </div>
              <Container height={50}/>
            </VStack>
          </Center>
          </>
          )}
  
  {state.messages.map((message, index) => (
        <div key={index}>
          <Center>
            <Box
              maxW={'800px'}
              w={'full'}
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
    </div>
  )
}
