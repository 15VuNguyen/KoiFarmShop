import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer";
import GioiThieuVeKoiF1 from "../../GioitThieuVeKoiF1";
import CustomerChatButton from "../../Chat/CustomerChat";
export default function Gioithieuvekoif1page() {
  return (
    <div>
      <Navbar />
      <div>
        <GioiThieuVeKoiF1 />
      </div>
      <CustomerChatButton />
      <Footer />
    </div>
  );
}
