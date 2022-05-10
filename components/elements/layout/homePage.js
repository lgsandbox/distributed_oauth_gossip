import Feed from "../../modules/posts/feed";
import Navbar from "../navigation/navbar";

export default function HomePageLayout() {
  return (
    <>
      <Navbar/>
      <Feed />
    </>
  )
}
