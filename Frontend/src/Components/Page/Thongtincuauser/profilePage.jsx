import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer";
import Profile from "../../Profile";

export default function Profilepage() {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "50px" }}>
        <Profile />
      </div>
      <Footer />
    </div>
  );
}
