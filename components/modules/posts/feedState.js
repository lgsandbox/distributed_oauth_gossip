import React from 'react'

function FeedState() {
  return (
    <>
     {state.messages.map((message, index) => (
        <div key={index}>
            <Center>
            <Box
                maxW={'850px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
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
                    <h2 >message: {message.message}</h2>
                    <h3>User(email for now): {message.user} </h3>
                    <p>Date: {message.createdAt}</p>
                </Box>
            </Center>
        <Container height={50}/>
        </div>   
        ))}
    </>
  )
}

export default FeedState