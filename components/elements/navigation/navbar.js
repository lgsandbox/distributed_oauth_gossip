import {
    Box,
    Spinner,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
  } from '@chakra-ui/react';
  import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
  import { useState, useEffect, Suspense, useTransition } from 'react';
  import BackdropModal from './modal';
  import { magic } from '../../../lib/magic';
  import Loading from '../widgets/loading';


  function Navbar() {
  
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(false);
    const home = '/';
    const dash = '/dashboard';
    const logout = () => {
      magic.user.logout();
      window.location.reload(false);

    } 
    
    // on render grab login boolean from magic and set state
    // why did i do this? change this to use context?
    // no need to use magic library directly when its already in

    useEffect(() => {
      setUser({ loading: true });
      magic.user.isLoggedIn().then((isLoggedIn) => {
        if (isLoggedIn === true) {
          return setIsLoggedIn(true);
          
        } 
      });
    }, []);

    return (
      <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={3} alignItems={'center'}>

              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                <Link href={home}>/dogama</Link>
              </HStack>
              {isLoggedIn ? <Link href={dash}>dashboard</Link> : null}
            </HStack>
            <Flex alignItems={'center'}>

             
      
            {isLoggedIn ? (
                          <Button    
                        
                          variant={'solid'}
                          colorScheme={'teal'}
                          size={'sm'}   
                          mr={4}
                          onClick={logout}>Disconnect
                          </Button> 
                      ) : <BackdropModal/>}


              <Menu >
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}        
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>Connect Wallet +</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Box>
      </>
    );
  }



  export default Navbar;