import Navbar from "../components/elements/navigation/navbar";
import Profile from "../components/modules/auth/profile";
import UserFeed from "../components/modules/posts/userFeed";
import { VStack, Container } from "@chakra-ui/react";

export default function Dashboard() {

  return (

    <div>
      <Navbar/>
      <Container height ={50}/>
      <Profile/>
      <UserFeed/>
    </div>
  );
}