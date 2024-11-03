import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer";
import GioiThieuVeKoiNhat from "../../GioiThieuVeKoiNhat";
import CustomerChatButton from "../../Chat/CustomerChat";
export default function Gioithieuvekoinhatpage() {
  return (
    <div>
      <Navbar />
      <GioiThieuVeKoiNhat />
      <CustomerChatButton />
      <Footer />
    </div>
  );
}
