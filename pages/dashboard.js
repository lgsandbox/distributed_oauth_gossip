import Navbar from "../components/elements/navigation/navbar";
import Profile from "../components/modules/auth/profile";
import { VStack, Container } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function Dashboard() {

  return (

    <div>
      <Navbar/>
      <Container height ={200}/>
      <Profile/>

    </div>
  );
}