import { useContext } from 'react';
import { UserContext } from '../../../lib/context';
import { Center, VStack, Container } from '@chakra-ui/react';
import Loading from '../../elements/widgets/loading';

const Profile = () => {
  const [user] = useContext(UserContext);

  return (
    <>

    <Center>
      <Container>
      {user?.loading ? (<Loading />) : ( user?.issuer && (
          <>
          <VStack>
            <div>Email</div>
            <div className='profile-info'>{user.email}</div>
            <div>User Id</div>
            <div>{user.issuer}</div>
            </VStack>
          </>
        ))}
      </Container>
    </Center>

    </>
  );};

export default Profile;