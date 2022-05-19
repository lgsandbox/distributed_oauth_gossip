import { useContext } from 'react';
import { UserContext } from '../../../lib/context';
import { Center, VStack, Container, HStack } from '@chakra-ui/react';


const Profile = () => {
  const [user] = useContext(UserContext);

  return (
    <>
      <Center>
        <Container>
          {user?.loading ? (<div/>) : ( user?.issuer && (
              <>
              <VStack>
                <HStack>
                  <div>Email:</div>
                  <div>{user.email}</div>
                </HStack>
                <HStack>
                  <div>UserID:</div>
                  <div>{user.issuer}</div>
                </HStack>
                </VStack>
              </>
            ))}
        </Container>
      </Center>
    </>
  );};

export default Profile;