import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer";
import NguonGocCuaIKoi from "../../Nguongoccuaikoi";
import CustomerChatButton from "../../Chat/CustomerChat";
export default function NguongoccuaikoiPage() {
  return (
    <div>
      <Navbar />
    <div style={{ backgroundColor: "#470101" }}>
        <NguonGocCuaIKoi />
      </div>
      <CustomerChatButton />
      <Footer />
    </div>
  );
}
