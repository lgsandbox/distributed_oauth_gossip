import Gun from "gun/gun";
import { useReducer, useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  VStack,
  HStack,
  useColorModeValue,
  Textarea,
  IconButton,
  Spinner,
  Spacer
} from '@chakra-ui/react';
import { CloseIcon, SettingsIcon } from '@chakra-ui/icons';
import { MdBuild , MdCall } from "react-icons/md"
import { UserContext } from "../../../lib/context";
import FeedSTate  from "./feedState.js"

const gun = Gun({
    peers: [
    'http://localhost:4000/gun',
    ]
})

const initialState = {
    messages: []
}

function reducer(state, message) {
    return {
    messages: [message, ...state.messages]
}}



export default function UserFeed() {

    const [user] = useContext(UserContext);
    
    const [formState, setForm] = useState({
        message: ''
    })

    const [state, dispatch] = useReducer(reducer, initialState)

    function onChange(e) {
    setForm({ ...formState, [e.target.name]: e.target.value })
    }

    const messages = gun.get('testdb109')
    useEffect(() => {
    messages.map().once(m => {
        dispatch({
        id: m.id,
        user: m.user,
        message: m.message,
        createdAt: m.createdAt
    })})
    }, [messages])


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
    })}

    return (
        <div>
        {user?.loading ? (<Center><Spinner /></Center>) : (
            <>
                <Center>
                <VStack>
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
        )}

    {state.messages.map((message, index) => (
        <div key={index}>
            <Center>
            <Box
                maxW={'850px'}
                w={'full'}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}
                >
                    <Flex>
                    <h4>UserID: {message.id}</h4>
                    <Spacer/>
                    <Button colorScheme='teal' variant='solid' >
                    <SettingsIcon/>
                    </Button>
                    </Flex>
                    <h3>User(email for now): {message.user} </h3>
                    <h2 >message: {message.message}</h2>
        
                    <p>Date: {message.createdAt}</p>
                </Box>
            </Center>
        <Container height={50}/>
        </div>   
        ))}
    </div>
    )}
