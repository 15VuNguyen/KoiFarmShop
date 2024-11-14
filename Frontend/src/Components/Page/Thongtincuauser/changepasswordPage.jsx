import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer";
import ChangePassword from "../../ChangePassword";
import { Container } from "react-bootstrap";
export default function Changepasswordpage() {
  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Navbar />
      <div style={{ paddingTop: "100px" }}>
        <Container style={{ paddingLeft: "200px", marginBottom: "50px" }}>
          <ChangePassword />
        </Container>
      </div>
      <Footer />
    </div>
  );
}
