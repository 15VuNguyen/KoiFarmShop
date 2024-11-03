import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer";
import GioiThieuVeKoiViet from "../../GioiThieuVeKoiViet";
import CustomerChatButton from "../../Chat/CustomerChat";
export default function Gioithieuvekoivietpage() {
  return (
    <div>
      <Navbar />
      <GioiThieuVeKoiViet />
      <CustomerChatButton />
      <Footer />
    </div>
  );
}
