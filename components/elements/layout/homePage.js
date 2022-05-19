import GlobalFeed from "../../modules/posts/globalFeed";
import Navbar from "../navigation/navbar";

export default function HomePageLayout() {
  return (
    <>
      <Navbar/>
      <GlobalFeed />
    </>
  )
}
