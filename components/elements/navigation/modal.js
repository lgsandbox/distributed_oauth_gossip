import { useDisclosure } from '@chakra-ui/react'
import { useState, useEffect, useContext } from 'react'
import { Container, Button, Modal, ModalContent, ModalCloseButton, ModalBody, ModalFooter, ModalOverlay } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Login from '../../modules/auth/login';
import { magic } from '../../../lib/magic';
import { isCompositeType } from 'graphql';
import { UserContext } from '../../../lib/context';
import { Router } from 'next/router';





export default function BackdropModal() {

  // could refactor overlay into different files

    const OverlayOne = () => (
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
    )
      
const { isOpen, onOpen, onClose } = useDisclosure();
const [overlay, setOverlay] = useState(<OverlayOne />)

// can change this logout to use context which holds magic library 
// logout currently takes two clicks to work sometimes

function logout() {
  magic.user.logout();

}


    return (

    <>
        <Button 
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                  }}
                variant={'solid'}
                colorScheme={'teal'}
                size={'sm'}
              
                mr={4}
                leftIcon={<AddIcon />}>
                  Log In / Sign Up
        </Button> 


        <Modal size={'xl'} blockScrollOnMount={true} isCentered isOpen={isOpen} onClose={onClose}>
          {overlay}
          <ModalContent>
            <Container height={100}/>
            <ModalCloseButton />
            <ModalBody>
              <Login />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
    )
    
  }





